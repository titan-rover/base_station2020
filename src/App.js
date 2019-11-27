import React from 'react';
//import logo from './logo.svg';
import './App.css';

import AntennaSignal from './components/antenna.js';
//import Compass from './components/compass.js';
import CurrentDraw from './components/currentdraw.js';
import GPS from './components/gps.js';
import UltrasonicSensor from './components/ultrasonic.js';
import IMU from './components/imu.js';
import GPS_Input from './components/gps_input.js';
import ROSLIB from 'roslib'

//import random from 'random';

//TODO: Looking to the page refreshing breaking the publishers
//Reference: https://github.com/RobotWebTools/rosbridge_suite/issues/138

class App extends React.Component {
  //member variables
  ros = null;

  //create ros listeners
  antenna_listener = null;
  gps_listener = null;
  imu_listener = null;
  mobility_listener = null;
  ultrasonic_listener = null;

  gps_publisher = null;


  constructor(props) {
    super(props);
    this.state = {
      status : '',
      latitude: 0,
      longitude: 0,
      amperage: 0,
      distance: 0,
      decibels: 0,
      yaw: 0,
      pitch: 0,
      roll: 0,
      //direction: 0,
    };

    //setInterval(this.changeState, 1000);
    
    //If ROS starts successfully, register event handlers
    if(this.startRos())
      this.handleRegister();
  }

  //Returns true after creating ROS object, Listeners, and Publishers
  startRos = () => {

    //try to create the ros object
    try {
      this.ros = new ROSLIB.Ros({
        url : 'ws://localhost:9090'  //connect to the local host to test on my machine
      });
    }
    catch(e){
      //Fail to create ROS object
      this.setState({
          status : 'Error',
      });
      console.log('Error: Failed to create ros object');
      return false;
    }

    //create ROS listeners
    this.antenna_listener = new ROSLIB.Topic({
      ros : this.ros,
      name : '/antenna',
      messageType : "fake_sensor_test/antenna",
    });

    this.gps_listener = new ROSLIB.Topic({
      ros : this.ros,
      name : '/gnss',
      messageType : "fake_sensor_test/gps",
    });

    this.imu_listener = new ROSLIB.Topic({
      ros : this.ros,
      name : '/imu',
      messageType : "fake_sensor_test/imu",
    });

    this.mobility_listener = new ROSLIB.Topic({
      ros : this.ros,
      name : '/mobility',
      messageType : "fake_sensor_test/mobility",
    });

    this.ultrasonic_listener = new ROSLIB.Topic({
      ros : this.ros,
      name : '/ultrasonic',
      messageType : "fake_sensor_test/ultrasonic",
    });

    //Create ROS publishers
    this.gps_publisher = new ROSLIB.Topic({
      ros : this.ros,
      name : '/gnss',
      messageType : "fake_sensor_test/gps",
    });

    return true;
  }

  //Register all event handlers
  handleRegister = () => {

    //
    this.ros.on('connection', () => {
      this.setState({
          status : 'Connected',
      });
    });
    this.ros.on('error', (error) => {
      this.setState({
          status : 'Error',
      });
    });
    this.ros.on('closed', () => {
      this.setState({
          status : 'Closed',
      });
    });

    //Listener Subscribe Handlers
    if (this.antenna_listener) this.antenna_listener.subscribe((m) => {
      this.setState({
          decibels : m.signal_strength,
      });
    });

    if (this.gps_listener) this.gps_listener.subscribe((m) => {
      this.setState({
          latitude : m.roverLat,
          longitude : m.roverLon,
      });
    });

    if (this.imu_listener) this.imu_listener.subscribe((m) => {
      this.setState({
          yaw : m.yaw,
          pitch : m.pitch,
          roll : m.roll,
      });
    });

    if (this.mobility_listener) this.mobility_listener.subscribe((m) => {
      this.setState({
          amperage : m.current_draw,
      });
    });

    if (this.ultrasonic_listener) this.ultrasonic_listener.subscribe((m) => {
      this.setState({
          distance : m.max_distance,
      });
    });
  }

  // changeState = () => {
  //   let lat = 1 - random.int(0,2);
  //   let lon = 1 - random.int(0,2);
  //   let amp = 1 - random.int(0,2);
  //   let dis = 1 - random.int(0,2);
  //   let dec = 1 - random.int(0,2);//dec means decibels
  //   let dir = 1 - random.int(0,2);
  //   this.setState({
  //     latitude: (this.state.latitude + lat),
  //     longitude: (this.state.longitude + lon),
  //     amperage: (this.state.amperage + amp),
  //     distance: (this.state.distance + dis),
  //     decibels: (this.state.decibels + dec),
  //     direction: (this.state.direction + dir),
  //   });
  // }

  render() {
    const status = "Connection Status: " + this.state.status;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    const amps = this.state.amperage;
    const distance = this.state.distance;
    const decibels = this.state.decibels;
    //const direc = this.state.direction;
    const yaw = this.state.yaw;
    const pitch = this.state.pitch;
    const roll = this.state.roll;

    return (
      React.createElement('div', {class:'flex_grid'}, [
        React.createElement('div', {class:'col'}, [
          React.createElement('h2', {key:'data'}, 'Data Display'),
          React.createElement('div', {class:'flex_row', key:0}, status),
          React.createElement(GPS, { key:1, latitude, longitude }),
          React.createElement(CurrentDraw, { key:2, amps }),
          React.createElement(UltrasonicSensor, { key:3, distance }),
          React.createElement(AntennaSignal, {key:4, decibels}),
          React.createElement(IMU, { key:5, yaw, pitch, roll }),
        ]),
        React.createElement('div', {class:'col'}, [
          React.createElement(GPS_Input, {topic:this.gps_publisher})
        ]),
      ])
    );
  }

}

export default App;
