import React from 'react';
import ROSLIB from 'roslib';

class GPS_Input extends React.Component {

  constructor(props) {
    super(props);

    //Set starting state
    // number : represents number a fieldsets to display, start with 0 for one fieldset corresponding to index of arrays
    // destLan and destLon : Arrays of destination coordinates to be sent over ROS, start as null (empty fields)
    this.state = {
      number : 0,
      destLat : [null],
      destLon : [null],
    };


  }

  //Add another null/empty fieldset to the gps input "window"
  addInput = () => {
    let tempLat = this.state.destLat;
    let tempLon = this.state.destLon;

    tempLat.push(null);
    tempLon.push(null);

    this.setState({
      number : this.state.number + 1,
      destLat : tempLat,
      destLon : tempLon,
    });
  }

  //Publishes a ros message on the gps topic with destination coordinates
  handleSubmit() {
    //Create message
    let message = new ROSLIB.Message({
      destLat: this.state.destLat,
      destLon: this.state.destLon,
    })

    this.props.topic.publish(message);
  }

  //Sets value for the corresponding latitude textbox
  handleLatChange(event, index){
    let tempLat = this.state.destLat;
    tempLat[index] = event.target.value;
    this.setState({
      destLat : tempLat
    });
  }

  //Sets value for the corresponding longitude textbox
  handleLonChange(event, index) {
    let tempLon = this.state.destLon;
    tempLon[index] = event.target.value;
    this.setState({
      destLon : tempLon
    });
  }

  //Sets up and returns one set of latitude and longitude input fields
  renderFields(index) {
    let latitude = '';
    let longitude = '';

    //If input is not null set the text
    if(this.state.destLat[index])
      latitude = this.state.destLat[index];
    if(this.state.destLon[index])
      longitude = this.state.destLon[index];


    return (
      React.createElement('fieldset', null, [
        React.createElement('legend', {key:'L'+index}, 'Coordinates '+index),
        React.createElement('label', null, [
          "Latitude: ",
          React.createElement('input', {value : latitude, onChange: (e) => this.handleLatChange(e, index) }),
        ]),
        React.createElement('br', null),
        React.createElement('label', null, [
          'Longitude: ',
          React.createElement('input', {value : longitude, onChange: (e) => this.handleLonChange(e, index) }),
        ])
      ])
    );
  }

  //Returns an array of field sets based on the number of sets specified
  renderInputs() {
    let array = [];

    for (let i=0; i<=this.state.number; i++){
      array.push(this.renderFields(i))
    }

    return array;
  }

  render() {
    const input_elements = this.renderInputs();

    return (
      React.createElement('div', null, [
        React.createElement('h2', {key:'GPS_Input'}, "GPS Input"),
        React.createElement('div', null, [
          input_elements,
          React.createElement('button', {type:'button', onClick:() => this.addInput()}, '+'),
          React.createElement('button', {type:'button', onClick:() => this.handleSubmit()}, 'Send')
        ]),
      ])
    );
  }
}

export default GPS_Input;
