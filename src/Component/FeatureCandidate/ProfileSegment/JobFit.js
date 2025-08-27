import React, { useState } from "react";
import { Container, Row, Col, Button  ,Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';


const JobFit = ({ candidate }) => {
    const applicant_tag = candidate?.applicant?.applicant_tags|| [];
    console.log("tag one",applicant_tag);
   

    if (applicant_tag.length === 0) {
        return (
            <Container className="border p-4 bg-white rounded mb-1">
                <p className="text-muted">No job you may fit  available.</p>
            </Container>
        );
    }

    return (
        <Container className="border p-4 bg-white rounded mb-1">
            <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
                Job You May Fit
            </p>
            <hr />

               <Row className="g-0">
                      {/* First group tags by industry */}
                      {Object.entries(
                        applicant_tag.reduce((acc, tag) => {
                          if (!acc[tag.industry.industry_name]) {
                            acc[tag.industry.industry_name] = [];
                          }
                          acc[tag.industry.industry_name].push(tag);
                          return acc;
                        }, {})
                      ).map(([industryName, tags], index) => (
                        <Col md={12} key={index}>
                          <Card className="border-0">
                            <Card.Body className="p-1">
                              <div className="d-flex flex-column flex-md-row align-items-start">
                                <div className="me-md-2" style={{ minWidth: '150px' }}>
                                  <h6 className="fw-bold mb-0">{industryName}</h6>
                                </div>
                                <div className="flex-grow-1">
                                  <Row className="g-0">
                                    {tags.map((tag, index) => (
                                      <Col xs="auto" key={index}>
                                        <div className="personality-tag p-0 px-1">
                                          {tag.tag_name} 
                                        </div>
                                      </Col>
                                    ))}
                                  </Row>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
        </Container>
    );
};

export default JobFit;