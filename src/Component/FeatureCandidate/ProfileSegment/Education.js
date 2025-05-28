import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Education = ({ candidate }) => {
  if (!candidate || !candidate.educations || candidate.educations.length === 0) {
    return <p>No education data available.</p>;
  }

  // Get the highest-level education (you can customize this logic)
  const higherEducation = candidate.educations.reduce((prev, curr) => {
    return curr.level?.id > (prev.level?.id || 0) ? curr : prev;
  }, {});

  return (
    <Container className="bg-white" style={{ padding: "5%" }}>
      <p className="fw-bold text-primary" style={{ fontSize: "18px" }}>
        Education
      </p>
      <hr />
      <Row>
        <Col md={1}>
          <Image
            src="/img/education.png"
            height={45}
            alt="Education Icon"
            rounded
          />
        </Col>
        <Col md={11}>
          <p className="fw-bold text-primary" style={{ fontSize: "18px" }}>
            {higherEducation.college?.college_name || "College/University Name"}
          </p>
          <p className="text-primary">
            {(higherEducation.course?.course_name || "Course Name").toUpperCase()}
            <br />
            <span style={{ color: "#707070" }}>
              {/* These fields are not in your current API; replace with real ones if available */}
              {higherEducation.started
                ? new Date(higherEducation.started).getFullYear()
                : "Start Year"}{" "}
              -{" "}
              {higherEducation.ended
                ? new Date(higherEducation.ended).getFullYear()
                : "End Year"}
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Education;
