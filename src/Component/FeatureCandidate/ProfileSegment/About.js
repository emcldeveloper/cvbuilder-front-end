import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = ({ candidate }) => {
  const careerText = candidate?.applicant?.career?.career;
  const objectiveText = candidate?.applicant?.objective?.objective;

  const styles = {
    paragraph: {
      wordWrap: "break-word",
      whiteSpace: "pre-wrap", // maintains line breaks and spacing
    },
  };

  return (
    <Container className="border py-4 mb-4 bg-white ">
      {/* About Section */}
      <Row className="mb-4">
        <Col>
          <h5 className="text-primary fw-bold mb-3">About</h5>
          {careerText ? (
            <p style={styles.paragraph}>{careerText}</p>
          ) : (
            <p className="text-muted">No career information provided.</p>
          )}
        </Col>
      </Row>

      {/* Career Objectives Section */}
      <Row>
        <Col>
          <h6 className="text-primary fw-bold mb-2">Career Objectives</h6>
          {objectiveText ? (
            <p style={styles.paragraph}>{objectiveText}</p>
          ) : (
            <p className="text-muted">No career objective provided.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default About;
