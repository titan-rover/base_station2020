import React from 'react';

class GPS extends React.Component {

  render() {
    const latitude = "Latitude: " + this.props.latitude;
    const longitude = "Longitude: " + this.props.longitude;

    return (
      React.createElement('div', {class:'flex_row'}, [
        React.createElement('p', {key:0}),
        React.createElement('div', {class:'flex_col'}, [
          React.createElement('div', null, 'Latitude:'),
          React.createElement('div', null, 'Longitude:'),
        ]),
        React.createElement('div', {class:'flex_col'}, [
          React.createElement('div', null, this.props.latitude),
          React.createElement('div', null, this.props.longitude),
        ]),
      ])
    );
  }
}

export default GPS;
