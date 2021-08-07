import 'aframe'
import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import MyNavbar from './components/Navbar';

//import css
import "./css/XR.css";

//a-sky test image
import image_360_beach from './images/360_beach.jpeg';
import rover_2020 from './rover_2020.gltf';


class XR extends Component {
  render() {
    return (
      <Container fluid={true} className="pt-2">
        <MyNavbar />

        <Container className="xr-container">
          <a-scene embedded>
            <a-assets>
              <img id="beach-test" src={image_360_beach} />
              <a-asset-item id="rover-model" src={rover_2020}></a-asset-item>
            </a-assets>

            <a-curvedimage
              color="#7BC8A4"
              position="0 1.5 -0.5"
              width="5"
              height="1.25" 
              radius="2"
              theta-length="90"
              rotation="0 45 0"
            >
            </a-curvedimage>

            <a-curvedimage
              color="#7BC800"
              position="0 1.5 -0.5"
              width="5"
              height="1.25" 
              radius="2"
              theta-length="90"
              rotation="0 135 0"
            >
            </a-curvedimage>

            <a-curvedimage
              color="#7BF000"
              position="0 1.5 -0.5"
              width="5"
              height="1.25"
              radius="2"
              theta-length="90"
              rotation="0 225 0"
            >
            </a-curvedimage>

            <a-curvedimage
              color="#5BC040"
              position="0 1.5 -0.5"
              width="5"
              height="1.25" 
              radius="2"
              theta-length="90"
              rotation="0 315 0"
            >
            </a-curvedimage>

            <a-gltf-model src="#rover-model" scale="0.02 0.02 0.02" position="-0.75 -0.5 -2.5"></a-gltf-model>

            <a-sky radius="10" src="#beach-test"></a-sky>
          </a-scene>
        </Container>

      </Container >
    );
  }
}

export default XR;