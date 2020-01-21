import React from 'react';

class CurrentDraw extends React.Component {
  render() {
    const CurrentAmp = "Current Draw (Amps): " + this.props.amps;
    return (React.createElement('div', {class:'flex_row'}, CurrentAmp));
  }
}

export default CurrentDraw;
