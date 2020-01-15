import React, { Component } from "react";
import { Tick, OBJModel } from "react-3d-viewer";

class IMU extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: { x: -40, y: -25, z: -35 },
      // position: { x: 0, y: -0, z: -0 },
      rotation: { x: 0, y: 0, z: 0 }
    };

    // setInterval(() => {
    //   let rotation = { ...this.state.rotation };
    //   rotation.y++;
    //   this.setState({ rotation: rotation });
    // }, 1000);
  }

  componentDidMount() {
    this.tick = Tick(() => {
      let rotation = { ...this.state.rotation };
      rotation.y += 0.005;
      this.setState({ rotation: rotation });
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
          src="./rover-model.obj"
          position={this.state.position}
          rotation={this.state.rotation}
        />
      </div>
    );
  }
}

export default IMU;
