import React from 'react';

function AntennaSignal(props){

  const decibels = props.decibels.toFixed(2);

  return (
    React.createElement('div', {class:'flex_row'}, `Antenna Signal (Decibels): `, decibels)
  );
}

export default AntennaSignal;
