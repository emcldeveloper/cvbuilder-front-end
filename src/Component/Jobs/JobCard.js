import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaEye, FaHeart } from 'react-icons/fa';

const JobCard = ({ job }) => {
  return (
    <Col md={4} className="mb-4" style={{ marginTop: '-27px' }}>
      <Card style={{ height: '85%', width: '104%' }}>
        <Card.Body>
          {/* Top Row: Logo and Job Type Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <img
              src={job.logo}
              alt={job.company}
              style={{ maxWidth: '120px', maxHeight: '75px' }}
            />
            <Button
              className="text-white"
              style={{
                backgroundColor: '#D36314',
                border: 'none',
                borderRadius: '30px',
                width: 'auto',
              }}
            >
              {job.type}
            </Button>
          </div>

          {/* Job Title and Company */}
          <div className="mb-2">
            <h6 style={{ color: '#D36314', fontSize: '13px' }}>
              <b style={{ fontSize: '15px' }}>
                {job.title} ({job.vacancies})
              </b>
            </h6>
            <h5 style={{ color: '#2E58A6', fontSize: '13px' }}>
              {job.company}
            </h5>
          </div>

          {/* Job Details */}
          <div style={{ fontSize: '13px' }}>
            Job Type: {job.type}
            <br />
            <span>Location: {job.location}</span>
            <br />
            <b style={{ color: '#2E58A6' }}>Deadline:</b> {job.deadline}
            <br />
            Industry: {job.industry}
          </div>
        </Card.Body>

        {/* Footer: Show, Views, Likes */}
        <Card.Footer className="bg-white">
          <Row className="text-center">
            <Col>
              <a
                href={job.link}
                style={{ color: '#2E58A6', textDecoration: 'none', display: 'block' }}
              >
                Show
              </a>
            </Col>
            <Col>
              <FaEye style={{ color: '#D36314', display: 'block', margin: '0 auto' }} />
              <small>{job.views}</small>
            </Col>
            <Col>
              <FaHeart
                style={{ color: '#D36314', display: 'block', margin: '0 auto' }}
                title="Please Sign In"
              />
              <small>{job.likes}</small>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default JobCard;
