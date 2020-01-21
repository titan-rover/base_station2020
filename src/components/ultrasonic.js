import React from 'react';

function UltrasonicSensor(props) {

  const distance = props.distance.toFixed(2);

  return (
    React.createElement('div', {class:'flex_row'}, `Distance (feet): `, distance)
  );
}

export default UltrasonicSensor;
