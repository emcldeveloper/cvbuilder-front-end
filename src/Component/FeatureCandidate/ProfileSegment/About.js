import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = ({ candidate }) => {
  const careerText = candidate?.career?.career;
  const objectiveText = candidate?.objective?.objective;

  return (
    <Container className="border  mb-4">
      <Row>
        <Col>
          <h5 className="text-primary fw-bold mb-3">About</h5>
          {careerText ? (
            <p style={{ wordWrap: "break-word" }}>{careerText}</p>
          ) : (
            <p className="text-muted">No career information provided.</p>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h6 className="text-primary fw-bold">Career Objectives</h6>
          {objectiveText ? (
            <p>{objectiveText}</p>
          ) : (
            <p className="text-muted">No career objective provided.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default About;
