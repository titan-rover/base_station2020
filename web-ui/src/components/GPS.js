import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class GPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autonomousCoordinates: ["input", "input", "input", "input"]
    };
  }

  addAutonomousCoodrinate = () => {
    this.setState({
      autonomousCoordinates: [...this.state.autonomousCoordinates, "input"]
    });
  };

  render() {
    return (
      <Card className="text-center">
        <Card.Header>Autonomous GPS Coordinates</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Row>
                {this.state.autonomousCoordinates.map(input => (
                  <Col>
                    <Form.Control type="text" placeholder="lat, long" />
                  </Col>
                ))}
                <Button
                  variant="primary"
                  onClick={this.addAutonomousCoodrinate}
                >
                  +
                </Button>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default GPS;
