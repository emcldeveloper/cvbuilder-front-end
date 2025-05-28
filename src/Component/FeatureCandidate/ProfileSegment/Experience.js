import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Experience = ({ candidate }) => {
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffInMonths = (end - start) / (1000 * 3600 * 24 * 30);
    const years = Math.floor(diffInMonths / 12);
    const months = Math.round(diffInMonths % 12);
    return `${years} yrs - ${months} mos`;
  };

  const employers = candidate?.applicant?.employers || [];

  if (!employers.length) {
    return (
      <Container className="border p-4 bg-white rounded mb-4">
        <p className="text-muted">No experience data available.</p>
      </Container>
    );
  }

  return (
    <Container className="border p-4 bg-white rounded mb-4">
      <p className="fw-bold text-primary mb-3" style={{ fontSize: '18px' }}>
        Experience{' '}
        <span className="text-secondary">
          {candidate.applicant.experiencePeriod || ''}
        </span>
      </p>
      <hr />

      {employers.map((employerRecord) => (
        <Row key={employerRecord.id} className="mb-4">
          <Col md={1} className="text-center">
            <Image
              src="/images/company.png"
              alt="Company"
              style={{ height: '55px', width: '55px' }}
              rounded
              fluid
            />
          </Col>
          <Col md={11}>
            <h6 className="fw-bold mb-1">
              {employerRecord.employer?.employer_name || 'Unknown Company'}
            </h6>
            <p className="text-muted mb-2" style={{ fontSize: '14px' }}>
              {employerRecord.employer?.sub_location}, {employerRecord.employer?.region?.region_name},{' '}
              {employerRecord.employer?.region?.country?.name}
            </p>

            {employerRecord.positions.map((position) => (
              <div key={position.id} className="mb-3">
                <h6 className="text-primary">{position.position_name}</h6>
                <p className="mb-1">
                  {position.industry?.industry_name} Industry
                </p>
                <p className="mb-1 text-secondary" style={{ fontSize: '14px' }}>
                  {new Date(position.start_date).toLocaleDateString('en-GB')} -{' '}
                  {position.end_date
                    ? new Date(position.end_date).toLocaleDateString('en-GB')
                    : 'Present'}{' '}
                  · {position.duration || calculateDuration(position.start_date, position.end_date)}
                </p>

                <div className="text-muted" style={{ fontSize: '14px' }}>
                  <strong>Responsibility:</strong>
                  <p>{position.responsibility || 'N/A'}</p>

                  <strong>Reason for Leaving:</strong>
                  <p>{position.remark || 'N/A'}</p>

                  {position.salaryRange &&
                    candidate.salaryVisibleStatus?.status && (
                      <p>
                        <strong>Salary: </strong>
                        {position.salaryRange.name}
                      </p>
                    )}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Experience;
