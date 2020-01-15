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
        rotation: { x: 0, y: 0, z: 0 },
        position: { x: 0, y: 0, z: 0 },
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
      }
    };

    this.connectRosBridge("ws://localhost:9090");
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

    if (this.gps_listener) {
      this.gps_listener.subscribe(m => {
        console.log(m);
        this.setState({
          latitude: m.roverLat,
          longitude: m.roverLon
        });
      });
    }

    if (this.imu_listener) {
      this.imu_listener.subscribe(m => {
        let x = Math.cos(m.yaw) * Math.cos(m.pitch);
        let y = Math.sin(m.yaw) * Math.cos(m.pitch);
        let z = Math.sin(m.pitch);
        // console.log(m);
        console.log(x, y, z);
        this.setState({
          imu: {
            rotation: {
              x: x,
              y: y,
              z: z
            }
          }
        });
      });
    }

    if (this.mobility_listener) {
      this.mobility_listener.subscribe(m => {
        let prevDataA = [...this.state.roboclaw.a.amps];
        let prevDataB = [...this.state.roboclaw.b.amps];
        if (prevDataA.length >= 5) {
          prevDataA.shift();
        }

        prevDataA.push([new Date().getTime(), m.current_draw]);

        if (prevDataB.length >= 5) {
          prevDataB.shift();
        }

        prevDataB.push([new Date().getTime(), Math.max(m.current_draw - 5, 0)]);

        if (m.current_draw > 70) {
          toast.warn("CURRENT DRAW HIGH!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: this.HIGH_CURRENT_ID
          });
        }

        this.setState({
          roboclaw: {
            a: { amps: prevDataA },
            b: { amps: prevDataB }
          }
        });
      });
    }

    if (this.ultrasonic_listener) {
      this.ultrasonic_listener.subscribe(m => {
        this.setState({
          distance: m.max_distance
        });
      });
    }
  }

  createPublishers() {
    try {
      this.gps_publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: "/gnss",
        messageType: "gnss/gps"
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
        name: "/antenna",
        messageType: "fake_sensor_test/antenna",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      this.gps_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/gnss",
        messageType: "fake_sensor_test/gps",
        throttle_rate: this.THROTTLE_RATE,
        queue_length: this.QUEUE_LENGTH
      });

      console.log(this.gps_listener);

      this.imu_listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/imu",
        messageType: "fake_sensor_test/imu",
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
        name: "/ultrasonic",
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
        <Row>
          <Col>
            <IMU
              position={{ x: -40, y: -25, z: -35 }}
              rotation={{ x: 0, y: 0, z: 0 }}
            />
          </Col>
          <Col>
            <MapTile currentPosition={this.state.gps.currentPosition} />
          </Col>
          <Col>
            <Compass heading={this.state.imu.heading} />
          </Col>
          <Col>
            <UltraSonicSensor distance={this.state.ultrasonic.distance} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <GPS />
          </Col>
        </Row>
        <Row className="mt-2">
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
        </Row>
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
