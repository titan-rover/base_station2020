import React, { Component } from "react";

class IPCameraStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // position: this.props.position,
      // rotation: this.props.rotation,
      position: { x: -500, y: 0, z: 0 },
      rotation: { x: -Math.PI/2, y: 0, z: Math.PI/2 }
    };

  //   setInterval(() => {
  //     let rotation = { ...this.state.rotation };
  //     rotation.y++;
  //     this.setState({ rotation: rotation });
  //   }, 1000);
  }

  componentDidMount() {
    this.tick = Tick(() => {
      let position = { ...this.state.position };
      let rotation = { ...this.state.rotation };
      this.setState({ position: position, rotation: rotation });
    });
  }

  render() {
    return (
      <div>
        <OBJModel
          enableZoom={true}
          width={500}
          height={500}
          texPath=""
          src="./RoverModel2020.stl.obj"
          position={this.props.position}
          rotation={this.props.rotation}
        />
      </div>
    );
  }
}

export default IPCameraStream;
