import React from 'react';

class GPS extends React.Component {

  render() {
    return (
      React.createElement('div', {class:'flex_row'}, [
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
