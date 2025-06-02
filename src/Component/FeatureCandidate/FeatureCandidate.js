import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { FaStar, FaEye, FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toTitleCase from '../../utils/toTitleCase';

const FeatureCandidate = ({ candidate }) => {
  const navigate = useNavigate();

  const defaultImage = 'https://ekazi.co.tz/uploads/picture/sample-candidate.jpg';

  // Handling name (first_name, middle_name, last_name)
  const rawNameParts = [
    candidate?.applicant?.first_name,
    candidate?.applicant?.middle_name,
    candidate?.applicant?.last_name,
  ];

  const name = rawNameParts
    .map(part => part?.trim()) // trim whitespace
    .filter(part => part && part !== '0') // remove null/undefined/"0"
    .join(' ') || 'No Name';

  // Handling position (position_name)
  const position = candidate?.applicant?.positions?.[0]?.position?.position_name?.trim() || 'No Position Records';

  // Handling location (sub_location, region_name, country_name)
  const locationParts = [
    candidate?.applicant?.address?.sub_location,
    candidate?.applicant?.address?.region?.region_name,
    candidate?.applicant?.address?.region?.country?.name,
  ];

  const location = locationParts
    .filter(Boolean) // removes undefined/null/empty values
    .map(part => part.trim())
    .join(', ') || 'Location not specified';

  // Handling availability (available field)
  const availability = candidate?.applicant?.available === '0' ? 'Available for Job Vacancies' : 'Not Currently Available';

  // Handling image URL (if picture exists)
  const image = candidate?.applicant?.picture
    ? `https://ekazi.co.tz/${candidate?.applicant?.picture.trim()}`
    : defaultImage; // Fallback to default image

  // Handling engagement metrics (views and likes)
  const views = candidate?.applicant?.featured_views?.length || 0;
  const likes = candidate?.applicant?.likes || 0;

  // Example score logic: basic engagement metric
  const score = views + likes > 0 ? ((likes / (views + likes)) * 5).toFixed(1) : 'N/A';

  const handleViewProfile = () => {
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(`/job-seeker-profile/${slug}`, {
      state: { candidate },
    });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100 shadow-sm border-0 rounded-lg hover-shadow">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={4} className="text-center">
              <Image
                src={image}
                alt={name}
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
              <h6
                className="text-primary fw-bold text-capitalize mb-1 text-truncate"
                style={{ fontSize: '16px', maxWidth: '100%' }}
              >
                {toTitleCase(name)}
              </h6>
              <div className="text-muted text-truncate" style={{ fontSize: '14px' }}>
                {toTitleCase(position)}
              </div>
              <div className="text-secondary text-truncate" style={{ fontSize: '13px' }}>
                {toTitleCase(location)}
              </div>
              <div className="text-success text-truncate" style={{ fontSize: '13px' }}>
                {availability}
              </div>
            </Col>
          </Row>

          <hr className="my-3" />

          <Row className="text-center">
            <Col xs={6} className="mb-2">
              <button onClick={handleViewProfile} className="btn btn-outline-primary btn-sm w-100">
                View Profile
              </button>
            </Col>
            <Col xs={6} className="mb-2">
              <a href={`/get_featured_candidate/${candidate?.id}`} className="btn btn-primary btn-sm w-100">
                Hire Me
              </a>
            </Col>

            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaStar className="me-1 text-warning" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {score}
              </small>
            </Col>
            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaEye className="me-1 text-secondary" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {views}
              </small>
            </Col>
            <Col xs={4} className="mt-2 d-flex align-items-center justify-content-center">
              <FaThumbsUp className="me-1 text-secondary" style={{ fontSize: '14px' }} />
              <small className="text-muted" style={{ fontSize: '12px' }}>
                {likes}
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FeatureCandidate;
