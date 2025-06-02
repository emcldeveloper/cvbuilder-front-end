import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Language = ({ candidate }) => {
  const languages = candidate?.applicant?.language_abilities || [];

  if (languages.length === 0) {
    return (
      <Container className="border p-4 bg-white rounded mb-4">
        <p className="text-muted">No languages available.</p>
      </Container>
    );
  }

  return (
    <Container className="border p-4 bg-white rounded mb-4">
      <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
        Language
      </p>
      <hr />
      <Row>
        {languages.map((ability) => (
          <Col key={ability.id} xs={6} sm={4} md={3} lg={2} className="mb-3">
            <Button
              variant="light"
              className="w-100 text-secondary border"
              style={{
                borderWidth: 2,
                fontSize: "14px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {ability.language?.language_name || "No Record"}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Language;
