import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Culture = ({ candidate }) => {
  const cultures = candidate?.applicant?.applicant_cultures || [];
  console.log("culture how many",cultures);

  if (cultures.length === 0) {
    return (
      <Container className="border p-4 bg-white rounded mb-1">
        <p className="text-muted">No culture  available.</p>
      </Container>
    );
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
        Work Compatibility Profile
      </p>
      <hr />

      <Row className="g-2">
  {cultures?.map((item, index) => (
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
        {item.culture.culture_name}
      </div>
    </Col>
  ))}
</Row>



    </Container>
  );
};

export default Culture;
