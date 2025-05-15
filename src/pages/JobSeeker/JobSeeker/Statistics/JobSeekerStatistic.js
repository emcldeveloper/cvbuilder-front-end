import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
// import { BsArrowRight } from 'react-icons/bs';
import { FaBuilding, FaClock, FaFileAlt, FaSearch } from 'react-icons/fa';
import { 
  BsArrowRight, 
  BsFileEarmarkText, 
  BsBriefcase, 
  BsClock, 
  BsSearch,
  BsBuilding
} from 'react-icons/bs';

const JobSeekerStatistic = () => {
  return (
    <div className="w-100">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          {/* Statistic Cards */}
          <Row className="mb-3 g-2">
            {/* Resume */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-primary fw-bold mb-0">5</h5>
                      <small className="text-muted">Resume</small>
                    </div>
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                      <BsFileEarmarkText size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Applications */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-success fw-bold mb-0">12</h5>
                      <small className="text-muted">Applications</small>
                    </div>
                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-2">
                      <BsBriefcase size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Jobs */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-info fw-bold mb-0">8</h5>
                      <small className="text-muted">Saved Jobs</small>
                    </div>
                    <div className="bg-info bg-opacity-10 text-info rounded-circle p-2">
                      <BsBuilding size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Search */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-warning fw-bold mb-0">3</h5>
                      <small className="text-muted">Saved Search</small>
                    </div>
                    <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                      <BsClock size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recommended Jobs */}
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h5 className="fw-bold mb-0">Recommended jobs for you</h5>
            </Col>
            <Col className="text-end">
              <a href="/jobs" className="text-decoration-none text-primary d-flex align-items-center justify-content-end">
                View all jobs <BsArrowRight className="ms-2" />
              </a>
            </Col>
          </Row>

          {/* Job Listings */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <div className="bg-light rounded overflow-hidden" style={{ width: '64px', height: '64px' }}>
                      <img
                        src="/job.jpg"
                        alt="Company Logo"
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-1">Senior Frontend Developer</h6>
                    <div className="text-muted d-flex align-items-center mb-1">
                      <FaBuilding className="me-2" /> TechCorp Inc.
                    </div>
                    <div className="text-muted mb-1">Dar Es Salaam, Tanzania</div>
                    <small className="text-muted">Posted: 2 days ago</small>
                  </Col>
                </Row>
                
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobSeekerStatistic;
