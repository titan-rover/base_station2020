import React from 'react';
import ROSLIB from 'roslib';

class GPS_Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number : 0,
      inputs : [{latitude:null,longitude:null},],
    };


  }

  //Add another form to the input 'window'
  addInput = () => {
    let temp_inputs = this.state.inputs;
    temp_inputs.push({latitude:null,longitude:null});
    this.setState({
      number : this.state.number + 1,
      inputs : temp_inputs,
    });
  }

  //Publishes a ros message on the gps topic with destination coordinates
  handleSubmit() {
    console.log('Submit Latitude: '+this.state.inputs[0].latitude)
    let message = new ROSLIB.Message({
      destLat: this.state.inputs[0].latitude,
      destLon: this.state.inputs[0].longitude
    })

    this.props.topic.publish(message);
  }

  handleLatChange(event, index){
    let temp_inputs = this.state.inputs;
    temp_inputs[index].latitude = event.target.value;
    this.setState({
      inputs : temp_inputs
    });
  }

  handleLonChange(event, index) {
    let temp_inputs = this.state.inputs;
    temp_inputs[index].longitude = event.target.value;
    this.setState({
      inputs : temp_inputs
    });
  }

  renderFields(index) {
    let latitude = '';
    let longitude = '';
    if(this.state.inputs[index].latitude)
      latitude = this.state.inputs[index].latitude;
    if(this.state.inputs[index].longitude)
      latitude = this.state.inputs[index].longitude;


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
        React.createElement('div', {/*onSubmit: (e) => this.handleSubmit(e)*/}, [
          input_elements,
          React.createElement('button', {type:'button', onClick:() => this.addInput()}, '+'),
          //React.createElement('input', {type:'submit', value:'Send'})
          React.createElement('button', {type:'button', onClick:() => this.handleSubmit()}, 'Send')
        ]),
      ])
    );
  }
}

export default GPS_Input;
