import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Software from "../../../pages/software";

const SoftwareandTools = ({ candidate }) => {
    const softwares = candidate?.applicant?.applicant_softwares || [];
    const tools = candidate?.applicant?.applicant_tools || [];
    console.log("personality how many", softwares);

    if (softwares.length === 0) {
        return (
            <Container className="border p-4 bg-white rounded mb-1">
                <p className="text-muted">No software  available.</p>
            </Container>
        );
    }

    return (
        <Container className="border p-4 bg-white rounded mb-1">
            <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
                Software & Tools
            </p>
            <hr />
            <Col md={12} className="mt-3">
                <Row className="g-2">
                    {softwares?.map((item, index) => (
                        <Col xs="auto" key={index}>
                            <div
                                className="software-tag p-1"
                                onClick={() => console.log('Edit software')} // Add your edit handle
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    minWidth: "100px",
                                    backgroundColor: "#f8f9fa",
                                    cursor: "pointer",
                                }}
                            >
                                {item.software.software_name}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col md={12} className="mt-3">
                <Row className="g-2">
                    {tools?.map((item, index) => (
                        <Col xs="auto" key={index}>
                            <div
                                className="software-tag p-1"
                                onClick={() => console.log('Edit software')} // Add your edit handler
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    minWidth: "100px",
                                    backgroundColor: "#f8f9fa",
                                    cursor: "pointer",
                                }}
                            >
                                {item.tool?.tool_name}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>



        </Container>
    );
};

export default SoftwareandTools;
