import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { FaStar, FaEye, FaThumbsUp } from 'react-icons/fa';

const FeatureCandidate = ({ candidate }) => {
  return (
    <Col md={4} className="mb-4">
      <Card className="h-100 shadow-sm border-0 rounded-lg hover-shadow">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={4} className="text-center">
              <Image
                src={candidate.image}
                alt={candidate.name}
                roundedCircle
                fluid
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className="hover-scale"
              />
            </Col>
            <Col xs={8}>
              <h6 className="text-primary fw-bold text-capitalize mb-1" style={{ fontSize: '16px' }}>
                {candidate.name}
              </h6>
              <div className="text-muted" style={{ fontSize: '14px' }}>
                {candidate.position || 'No Position Records'}
              </div>
              <div className="text-secondary" style={{ fontSize: '13px' }}>
                {candidate.location}
              </div>
              <div className="text-success" style={{ fontSize: '13px' }}>
                {candidate.availability}
              </div>
            </Col>
          </Row>

          <hr className="my-3" />

          <Row className="text-center">
            <Col xs={6} className="mb-2">
              <a href={`/candidate-featured?cfi=${candidate.id}`} className="btn btn-outline-primary btn-sm w-100">
                View Profile
              </a>
            </Col>
            <Col xs={6} className="mb-2">
              <a href={`/get_featured_candidate/${candidate.id}`} className="btn btn-primary btn-sm w-100">
                Hire Me
              </a>
            </Col>

            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaStar className="me-1 text-warning" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {candidate.score || 'N/A'}
              </small>
            </Col>
            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaEye className="me-1 text-secondary" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {candidate.views}
              </small>
            </Col>
            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaThumbsUp className="me-1 text-secondary" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {candidate.likes}
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FeatureCandidate;
