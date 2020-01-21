import React from 'react';

function Compass () {
    return ( React.createElement('p', { className: "Compass" }, `Direction: \t`,this.props.direction));
}

export default Compass;
