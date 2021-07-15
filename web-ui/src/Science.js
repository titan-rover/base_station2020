import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import MyNavbar from './components/Navbar';

// emptyContents() {

// }

class Science extends Component {
    render() {
        return (
            <Container>
                <MyNavbar />
                <Container>
                    <Row>
                        <Col>
                            <div style={{ border: "1px solid green", height: "720px", width: "1280px" }}> Stream
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col><div>
                            <Button variant="danger">Stop Stream</Button>{' '}
                            <Button variant="primary">Protein Extraction</Button>{' '}
                            <Button variant="secondary">Fluorescence Microscopy</Button>{' '}</div></Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default Science;
