import React from "react";
import {
    Container, Badge, Card, Button, Modal, Form, Row, Col,
    Spinner, Alert, Image ,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { Plus, Pencil } from 'react-bootstrap-icons';

const Education = ({ candidate }) => {
  if (!candidate.applicant?.educations || candidate.applicant.educations.length === 0) {
    return (
      <Container className="border p-4 bg-white rounded mb-1">
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
   const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

  return (
    <Container className="border py-4 bg-white rounded mb-1">
      {/* Section Header */}
      <p className="fw-bold text-primary mb-3" style={styles.sectionTitle}>
        Education
      </p>
      <hr />

      {/* Education Content */}
      {/* <Row className="align-items-center">
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
      </Row> */}
       <div className="education-list">
                               
                                      <div   className="education-item mb-1 p-1  ">
                                          <div className="d-flex">
                                              {/* Education Icon */}
      
                                              <div className="me-3 mt-1">
                                                  <FontAwesomeIcon
                                                      icon={faGraduationCap}
                                                      className="text-primary"
                                                      style={{ fontSize: '1.75rem' }}
                                                  />
      
                                              </div>
      
                                              {/* Education Details */}
                                              <div className="flex-grow-1">
                                                  <div className="d-flex justify-content-between align-items-start">
                                                      <h6 className="fw-bold mb-1">
                                                          {higherEducation.level?.education_level} in {higherEducation.course?.course_name}
                                                      </h6>
      
                                                  </div>
                                                  {higherEducation.major?.name && (
                                                      <p className="mb-1">
                                                          <Badge bg="light" text="dark" className="fw-normal">
                                                              Major: {higherEducation.major.name}
                                                          </Badge>
                                                      </p>
                                                  )}
                                                  <p className="mb-1 text-dark">
                                                      {higherEducation.college?.college_name}
                                                  </p>
      
                                                  <p className="text-muted small mb-1">
                                                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                                      {formatDate( higherEducation.started)} - {formatDate(higherEducation.ended)}
                                                  </p>
      
                                                  {/* {education.attachment && (
                                                      <div className="mt-2">
                                                          <a
                                                              href={education.attachment}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="text-decoration-none"
                                                              title={getFileNameFromUrl(education.attachment)}
                                                          >
                                                              <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                              {getFileNameFromUrl(education.attachment)}
                                                          </a>
                                                      </div>
                                                  )} */}
                                              </div>
                                          </div>
                                      </div>
                             
                          </div>
    </Container>
  );
};

export default Education;
