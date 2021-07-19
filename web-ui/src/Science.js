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
                <MyNavbar/>
                <Row>
                    <Col>
                    <div style={{border: "1px solid green", height: "500px", width: "500px"}}> Stream
                        </div>
                        </Col>
                    <Col>
                        <div style={{border: "1px solid green", height: "400px", width: "540px"}}>
                            Modified Image
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col><div>
                        <Button variant="danger">Stop Stream</Button>{' '}
                        <Button variant="primary">Protein Extraction</Button>{' '}
                        <Button variant="secondary">Fluorescence Microscopy</Button>{' '}</div></Col>
                </Row>
            </Container>
        );
    }
}

export default Science;
