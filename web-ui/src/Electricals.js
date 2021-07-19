// This is meant to be the standalone page for electrical team's needs on the UI
//-Gabe M

//import react components
import React, { Component } from 'react';
import ReactRadialGauge from './components/Gauges';

// // Bootstrap imports
import "bootswatch/dist/darkly/bootstrap.min.css";
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Container from 'react-bootstrap/esm/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import ui components
import InverseKinematics from "./components/InverseKinematics";
import MyNavbar from './components/Navbar';
import MobilityCurrentDraw from "./components/MobilityCurrentDraw";

//import ROS
import ROSLIB from "roslib";

//import css
import "./css/XR.css";


class Electricals extends Component {

    constructor(props) {
        super(props);
        console.log("CONSTRUCTOR CALLED");

        // in react, both this.props and this.state represent the rendered values (i.e what's currently on the screen)
        this.state = {
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

        /* this.connectRosBridge(url) is a top level function call that passes the url to the connectRosBridge(url) functions
        inside of all the custom react imports we imported at the top. */
        //this.connectRosBridge("ws://192.168.1.100:9090");

        this.connectRosBridge("ws://localhost:9090");
        // this.connectRosBridge("wss://controls.titanrover.com:9443");


        /* These lines instantiate listeners, publishers, and callback registrations for all the react modules we imported */
        this.createListeners();
        this.registerCallbacks();
    }

    registerCallbacks() {
        //Register ros callbacks
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

        // Current Draw message handler
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

                // if (m.current_draw > 70) {
                //     toast.warn("CURRENT DRAW HIGH!", {
                //         position: toast.POSITION.BOTTOM_RIGHT,
                //         toastId: this.HIGH_CURRENT_ID
                //     });
                // }

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
    }

    // Creates ROS Topic objects for Listeners
    // Similar to Publishers, but includes throttle rate and queque for the incoming messages
    createListeners() {
        try {
            this.mobility_listener = new ROSLIB.Topic({
                ros: this.ros,
                name: "/mobility",
                messageType: "fake_sensor_test/mobility",
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

    // Creates a ROS Node and connects to a ROS server via a url/IP
    connectRosBridge(url) {
        try {
            // ROS Node
            this.ros = new ROSLIB.Ros({
                url: url
            });
        } catch (e) {
            //Fail to create ROS Node
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
                <MyNavbar />
                <Container>
                    <Row className="mt-2">
                        <Col>
                            <Container align="center">
                                <ReactRadialGauge
                                    width={500}
                                    height={500}
                                    animationDuration={150}
                                    animationRule={'linear'}
                                    units='AMPS'
                                    title='Motor 1'
                                    value={this.state.mobility.amps}
                                    minValue={0}
                                    maxValue={100}
                                    majorTicks={['0', '15', '30', '45', '60', '75']}
                                    minorTicks={5}
                                ></ReactRadialGauge>
                                <ReactRadialGauge
                                    width={500}
                                    height={500}
                                    units='MPH'
                                    title='Motor 1'
                                    value={0}
                                    minValue={0}
                                    maxValue={100}
                                    majorTicks={['0', '5', '15', '20', '25', '30', '35', '40', '45', '50']}
                                    minorTicks={2}
                                ></ReactRadialGauge>
                            </Container>

                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <MobilityCurrentDraw
                                current_draw={this.state.mobility.amps}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <InverseKinematics />
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default Electricals;