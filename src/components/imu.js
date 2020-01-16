import React from 'react';

class IMU extends React.Component {

  render() {
    const yaw = this.props.yaw.toFixed(2);
    const pitch = this.props.pitch.toFixed(2);
    const roll = this.props.roll.toFixed(2);

    return ( React.createElement('div', {class:'flex_row'}, [
      React.createElement('div', {class:'flex_col'}, [
        React.createElement('div', null, 'Yaw:'),
        React.createElement('div', null, 'Pitch:'),
        React.createElement('div', null, 'Roll:'),
      ]),
      React.createElement('div', {class:'flex_col'}, [
        React.createElement('div', null, yaw),
        React.createElement('div', null, pitch),
        React.createElement('div', null, roll),
      ]),
    ]));
  }
}

export default IMU;
