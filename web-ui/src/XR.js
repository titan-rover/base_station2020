import 'aframe'
import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import MyNavbar from './components/Navbar';

//import css
import "./css/XR.css";

//a-sky test image
import image_360_beach from './images/360_beach.jpeg';


class XR extends Component {
  render() {
    return (
      <Container fluid={true} className="pt-2">
        <MyNavbar />

        <Container className="xr-container">
            <a-scene embedded>
              <a-assets>
                <img id="beach-test" src={image_360_beach} />
              </a-assets>

              <a-box
                position="-1 0.5 -3"
                rotation="0 45 0"
                color="#4CC3D9" />
              <a-sphere
                position="0 1.25 -5"
                radius="1.25"
                color="#EF2D5E" />
              <a-cylinder
                position="1 0.75 -3"
                radius="0.5"
                height="1.5"
                color="#FFC65D" />
              <a-plane
                position="0 0 -4"
                rotation="-90 0 0"
                width="4"
                height="4"
                color="#7BC8A4" />
              <a-dodecahedron
                color="#FF926B"
                radius="5"
                position="0 -1 -30"></a-dodecahedron>
              <a-sky radius="10" src="#beach-test"></a-sky>
            </a-scene>
        </Container>

      </Container >
    );
  }
}

export default XR;