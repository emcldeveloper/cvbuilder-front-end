import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Language = ({ candidate }) => {
  const languages = candidate?.language_abilities || [];  // Extract language abilities

  // Debugging: Log the languages to check the structure
  console.log('Languages:', languages);

  if (languages.length === 0) {
    return <p>No languages available</p>;
  }

  return (
    <Container className="bg-white" style={{ padding: "5%", height: "150px", fontSize: "14px", lineHeight: 1.3, overflow: "hidden" }}>
      <p className="font-weight-bold text-blue" style={{ fontSize: "18px" }}>
        Language
      </p>
      <hr />
      <Row>
        {languages.map((ability) => (
          <Col key={ability.id} md={2} className="mb-2">
            <Button
              className="border bg-white text-secondary"
              style={{
                borderWidth: 2,
                paddingTop: "7%",
                paddingBottom: "7%",
                paddingLeft: "20%",
                paddingRight: "20%",
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
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
