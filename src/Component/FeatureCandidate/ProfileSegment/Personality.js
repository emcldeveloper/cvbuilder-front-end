import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Personality = ({ candidate }) => {
  const personalities = candidate?.applicant?.applicant_personalities || [];
  console.log("personality how many",personalities);

  if (personalities.length === 0) {
    return (
      <Container className="border p-4 bg-white rounded mb-1">
        <p className="text-muted">No personalities  available.</p>
      </Container>
    );
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
        Personality Traits
      </p>
      <hr />

      <Row className="g-2">
  {personalities?.map((item, index) => (
    <Col xs="auto" key={index}>
      <div
        className="p-2 text-center shadow-sm"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          minWidth: "100px",
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }}
      >
        {item.personality.personality_name}
      </div>
    </Col>
  ))}
</Row>



    </Container>
  );
};

export default Personality;
