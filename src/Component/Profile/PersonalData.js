import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
const PersonalData= ()=>{
 return (
    <Row className="justify-content-center mb-3">
    <Col>
        <Card className="shadow-sm">
            <Card.Body className="p-4">
                <h5 className="card-title text-primary">Personal Data</h5>
                {/* Add personal data content here */}
            </Card.Body>
        </Card>
    </Col>
</Row>
 )
}
export default PersonalData;