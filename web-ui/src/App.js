// React imports
import React, { Component } from "react";

// Bootstrap imports
import "./darkly-bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom components
import IMU from "./components/IMU";
import MapTile from "./components/MapTile";
import Compass from "./components/Compass";
import UltraSonicSensor from "./components/UltrasonicSensor";
import GPS from "./components/GPS";
import AntennaSignal from "./components/AntennaSignal";
import MobilityCurrentDraw from "./components/MobilityCurrentDraw";
import ROSLIB from "roslib";

class App extends Component {
  THROTTLE_RATE = 1000;
  QUEUE_LENGTH = 1;

  POOR_SIGNAL_ID = "poor-signal-id";
  HIGH_CURRENT_ID = "high-current-id";

  constructor(props) {
    super(props);
    console.log("CONSTRUCTOR CALLED");

    this.state = {
      imu: {
        rotation: { x: -Math.PI/2, y: 0, z: Math.PI/2 },
        position: { x: 0, y: -60, z: 40 },
        heading: null
      },
      gps: {
        currentPosition: [null, null]
      },
      antenna: {
        decibels: []
      },
      ultrasonic: {
        distance: null
      },
      roboclaw: {
        a: {
          amps: []
        },
        b: {
          amps: []
        }
      },
      mobility: {
        amps: []
      }
    };

    this.connectRosBridge("ws://192.168.1.100:9090");
    // this.connectRosBridge("ws://192.168.1.103:9090");
    // this.connectRosBridge("ws://localhost:9090");
    this.createListeners();
    this.createPublishers();
    this.registerCallbacks();
  }

  registerCallbacks() {
    // Register ros callbacks
    this.ros.on("connection", () => {
      this.setState({
        status: "Connected"
      });
    });
    this.ros.on("error", error => {
      this.setState({
        status: "Error"
      });
    });
    this.ros.on("closed", () => {
      this.setState({
        status: "Closed"
      });
    });

    // Register listener callbacks
    if (this.antenna_listener) {
      this.antenna_listener.subscribe(m => {
        let prevData = [...this.state.antenna.decibels];
        if (prevData.length >= 5) {
          prevData.shift();
        }
        if (m.signal_strength < 10) {
          toast.error("SIGNAL STRENGTH CRITICAL!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: this.POOR_SIGNAL_ID
          });
        }
        prevData.push([new Date().getTime(), m.signal_strength]);
        this.setState({
          antenna: {
            decibels: prevData
          }
        });
      });
    }

    if (this.rovergps_listener) {
      this.rovergps_listener.subscribe(m => {
        console.log(m);
        this.setState({
          latitude: m.roverLat,
          longitude: m.roverLon
        });
      });
    }

    if (this.imu_listener) {
      this.imu_listener.subscribe(m => {
        // let x = Math.cos(m.yaw) * Math.cos(m.pitch);
        // let y = Math.sin(m.yaw) * Math.cos(m.pitch);
        // let z = Math.sin(m.pitch);
        let x = m.orientation.x;
        let y = m.orientation.y;
        let z = m.orientation.z;
        let w = m.orientation.w;

        let roll = null;
        let pitch = null;
        let yaw = null;

        // Roll
        let sinr_cosp = 2 * (w * x + y * z);
        let cosr_cosp = 1 - 2 * (x * x + y * y);
        roll = Math.atan2(sinr_cosp, cosr_cosp);

        // Pitch
        let sinp = 2 * (w * y - z * x);
        if (Math.abs(sinp) >= 1)
          if (sinp >= 0)
            pitch = Math.PI/2; // use 90 degrees if out of range
          else
            pitch = -Math.PI/2;
        else
          pitch = Math.asin(sinp);

        // Yaw
        let siny_cosp = 2 * (w * z + x * y);
        let cosy_cosp = 1 - 2 * (y * y + z * z);
        yaw = Math.atan2(siny_cosp, cosy_cosp);

        console.log("Yaw: " + yaw);
        console.log("Pitch: " + pitch);
        console.log("Roll: " + roll);

        // console.log(m);
        // console.log(x, y, z);
        this.setState({
          imu: {
            rotation: {
              x: -roll - Math.PI/2,
              y: -pitch,
              z: yaw + Math.PI/2
              // x: x - Math.PI/2,
              // y: y,
              //z: z + Math.PI/2
            },
            position: this.state.imu.position
          }
        });
      });
    }

    if (this.mobility_listener) {
      this.mobility_listener.subscribe(m => {
        let prevDataA = [...this.state.roboclaw.a.amps];
        let prevDataB = [...this.state.roboclaw.b.amps];
        let prevDataC = [...this.state.mobility.amps];
        if (prevDataA.length >= 5) {
          prevDataA.shift();
        }

        prevDataA.push([new Date().getTime(), m.current_draw]);

        if (prevDataB.length >= 5) {
          prevDataB.shift();
        }

        prevDataB.push([new Date().getTime(), Math.max(m.current_draw - 5, 0)]);

        if (prevDataC.length >= 5) {
          prevDataC.shift();
        }

        prevDataC.push(m.current_draw);

        if (m.current_draw > 70) {
          toast.warn("CURRENT DRAW HIGH!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: this.HIGH_CURRENT_ID
          });
        }

        this.setState({
    //       roboclaw: {
    //         a: { amps: prevDataA },
    //         b: { amps: prevDataB }
    //       }
          mobility: {
            amps: prevDataC
          }
        });
      });
    }

    if (this.ultrasonic_listener) {
      this.ultrasonic_listener.subscribe(m => {
        this.setState({
          distance: [m.max_distance]
        });
      });
    }
  }

  createPublishers() {
    try {
      this.gps_publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: "/gps_list",
        messageType: "mobility/points"
      });
    } catch (e) {
      //Fail to create ROS object
      this.setState({
        status: "Error"
      });
      console.log("Error: Failed to create ros publisher");
    }
  }

  createListeners() {
    try {
      this.antenna_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/rover_db",
        messageType: "fake_sensor_test/antenna",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      this.rovergps_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/rover_gnss",
        messageType: "telemetry/gps",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      this.basegps_listener = new ROSLIB.Topic({
        ros: this.ros,
        //name: "/rover_gnss",
        //messageType: "telemetry/gps",
        throttle_rate: 10,
        queue_length: this.QUEUE_LENGTH
      });

      // console.log(this.rovergps_listener);

      this.imu_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/imu",
        messageType: "sensor_msgs/Imu",
        // messageType: "sensor_msgs/Imu",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      this.mobility_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/mobility",
        messageType: "fake_sensor_test/mobility",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      this.ultrasonic_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/range",
        messageType: "fake_sensor_test/ultrasonic",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });
    } catch (e) {
      //Fail to create ROS object
      this.setState({
        status: "Error"
      });
      console.log("Error: Failed to create ros listener");
    }
  }

  connectRosBridge(url) {
    try {
      this.ros = new ROSLIB.Ros({
        url: url //connect to the local host to test on my machine
      });
    } catch (e) {
      //Fail to create ROS object
      this.setState({
        status: "Error"
      });
      console.log("Error: Failed to create ros object");
      return false;
    }
  }

  render() {
    return (
      <Container fluid={true} className="pt-2">
        <Row className="mt-2">
          <Col>
            <IMU
              position={this.state.imu.position}
              rotation={this.state.imu.rotation}
            />
          </Col>
          <Col>
            <AntennaSignal decibels={this.state.antenna.decibels} />
          </Col>
          <Col>
            <MobilityCurrentDraw
              current_draw={this.state.mobility.amps}
            />
          </Col>
          {/* <Col>
            <MapTile currentPosition={this.state.gps.currentPosition} />
          </Col>
          <Col>
            <Compass heading={this.state.imu.heading} />
          </Col>
          <Col> */}
          <Col>
            <UltraSonicSensor max_distance={this.state.ultrasonic.distance} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <GPS />
          </Col>
        </Row>
        {/* <Row className="mt-2">
          <Col>
            <AntennaSignal decibels={this.state.antenna.decibels} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <MobilityCurrentDraw
              ampsA={this.state.roboclaw.a.amps}
              ampsB={this.state.roboclaw.b.amps}
            />
          </Col>
        </Row> */}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
