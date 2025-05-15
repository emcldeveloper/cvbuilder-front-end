import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaEye, FaHeart } from 'react-icons/fa';

const JobCard = ({ job }) => {
  return (
    <Col md={4} className="mb-2">
      <Card style={{ height: '85%', width: '104%' }}>
        <Card.Body>
          {/* Top Row: Logo and Job Type Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <img
              src={`https://ekazi.co.tz/${job.client?.logo}`|| 'default-logo.png'} // Fallback image if no logo
              alt={job.client?.client_name}
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
             {job.job_type?.type_name || 'N/A'}
            </Button>
          </div>

          {/* Job Title and Company */}
          <div className="mb-2">
            <h6 style={{ color: '#D36314', fontSize: '13px' }}>
              <b style={{ fontSize: '15px' }}>
                {job.job_position?.position_name || 'N/A'} ({job.quantity})
              </b>
            </h6>
            <h5 style={{ color: '#2E58A6', fontSize: '13px' }}>
              {job.client?.client_name || 'N/A'}
            </h5>
          </div>

          {/* Job Details */}
          <div style={{ fontSize: '13px' }}>
            Job Type: {job.job_type?.type_name || 'N/A'}
            <br />
              <span>Location: {job.region?.region_name || 'N/A'}</span>
            <br />
             <b style={{ color: '#2E58A6' }}>Deadline:</b> {job.dead_line || 'N/A'}
            <br />
            Industry: {job.industry?.industry_name || 'N/A'}
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
              <small>{job.statistic?.job_views || 0}</small>
            </Col>
            <Col>
              <FaHeart
                style={{ color: '#D36314', display: 'block', margin: '0 auto' }}
                title="Please Sign In"
              />
                <small>{job.statistic?.job_likes || 0}</small>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default JobCard;
