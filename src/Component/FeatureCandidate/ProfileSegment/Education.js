import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Education = ({ candidate }) => {
  if (!candidate.applicant?.educations || candidate.applicant.educations.length === 0) {
    return (
      <Container className="border p-4 bg-white rounded mb-4">
        <p className="text-muted">No education data available.</p>
      </Container>
    );
  }

  // Select the highest level of education based on level.id
  const higherEducation = candidate.applicant.educations.reduce((prev, curr) => {
    return curr.level?.id > (prev.level?.id || 0) ? curr : prev;
  }, {});

  const styles = {
    sectionTitle: {
      fontSize: "18px",
    },
    dateText: {
      color: "#707070",
    },
  };

  return (
    <Container className="border py-4 bg-white rounded mb-4">
      {/* Section Header */}
      <p className="fw-bold text-primary mb-3" style={styles.sectionTitle}>
        Education
      </p>
      <hr />

      {/* Education Content */}
      <Row className="align-items-center">
        <Col md={1} className="text-center">
          <Image
            src="/img/education.png"
            alt="Education Icon"
            height={45}
            rounded
          />
        </Col>
        <Col md={11}>
          <p className="fw-bold text-primary mb-1" style={styles.sectionTitle}>
            {higherEducation.college?.college_name || "College/University Name"}
          </p>
          <p className="text-primary mb-0">
            {(higherEducation.course?.course_name || "Course Name").toUpperCase()}
          </p>
          <p className="mb-0" style={styles.dateText}>
            {higherEducation.started
              ? new Date(higherEducation.started).getFullYear()
              : "Start Year"}{" "}
            -{" "}
            {higherEducation.ended
              ? new Date(higherEducation.ended).getFullYear()
              : "End Year"}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Education;
