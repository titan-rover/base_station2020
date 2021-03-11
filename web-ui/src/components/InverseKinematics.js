import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InverseKinematics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          autonomousCoordinates: ["input"],
          lat: [0],
          lon: [0],
          degreesLat: [0],
          degreesLon: [0],
          minsLat: [0],
          minsLon: [0],
          secsLat: [0],
          secsLon: [0],
          convertedDegreesLat: [0],
          convertedDegreesLon: [0],
          convertedMinsLat: [0],
          convertedMinsLon: [0],
          convertedSecsLat: [0],
          convertedSecsLon: [0],
          gpsArraySize: 1,
        };
    }


    render() {
        const { lat, lon, degreesLat, degreesLon, minsLat, minsLon, secsLat, secsLon } = this.state;
        return (
            <Card className="text-center">
                <Card.Header>Inverse Kinematics</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Row style={{ justifyContent: 'space-around' }}>
                                {this.state.autonomousCoordinates.map((input, index) => (
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col> Manually Set Arm Coordinates
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Latitude</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={lat[index]}
                                                            onChange={(event) => { this.convertLatToDMS(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Degrees</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={degreesLat[index]}
                                                            onChange={(event) => { this.convertDegreesToLat(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Minutes</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={minsLat[index]}
                                                            onChange={(event) => { this.convertMinutesToLat(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Seconds</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={secsLat[index]}
                                                            onChange={(event) => { this.convertSecondsToLat(event, index); }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col> Current Arm Coordinates
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Longitude</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={lon[index]}
                                                            onChange={(event) => { this.convertLonToDMS(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Degrees</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={degreesLon[index]}
                                                            onChange={(event) => { this.convertDegreesToLon(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Minutes</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={minsLon[index]}
                                                            onChange={(event) => { this.convertMinutesToLon(event, index); }}
                                                        />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Seconds</span>
                                                        </div>
                                                        <Form.Control type="input"
                                                            value={secsLon[index]}
                                                            onChange={(event) => { this.convertSecondsToLon(event, index); }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form>
                    <Button type="button" variant="primary" onClick={this.addAutonomousCoordinates}>
                        Add
                    </Button>

                    <Button type="button" variant="primary" onClick={this.removeAutonomousCoordinates}>
                        Remove
                    </Button>

                    <Button type="submit" variant="primary" onClick={this.submitGPSInputs}>
                        Submit
                    </Button>
                    
                </Card.Body>
            </Card>
        );
    }
}

export default InverseKinematics;