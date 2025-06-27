import React from 'react';
import { Card, Row, Col, Image, Button, Container } from 'react-bootstrap';

const FeaturedEmployers = ({ jobCompanies }) => {
  const employers = [...jobCompanies, ...jobCompanies]; // Duplicate for seamless scroll

  return (
    <Container className="mt-3 bg-white py-1">
      <Row className="justify-content-center">
        <Col md={12}>
          <h4 className="text-center fw-bold mb-3" style={{ color: '#2E58A6', fontSize: '20px' }}>
            Employers
          </h4>

          <div className="position-relative overflow-hidden w-100">
            <div className="d-flex employer-scroll">
              {employers.map((employer, idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-center align-items-center px-2"
                  style={{ flex: '0 0 auto', width: '130px' }}
                >
                  <Card className="border-0 shadow-sm" style={{ height: 'auto' }}>
                    <Card.Body className="text-center py-2 px-2" style={{ lineHeight: 1 }}>
                      <a href={`/featured/employer/details/${employer.id}`}>
                        <Image
                          src={employer.logo ? `https://ekazi.co.tz/${employer.logo}` : '/img/default.png'}
                          alt={employer.client_name}
                          roundedCircle
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain',
                            backgroundColor: 'white',
                          }}
                        />
                      </a>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button
              href="/employer/find"
              style={{ backgroundColor: '#D36314', borderColor: '#D36314' }}
              className="px-4 py-1"
            >
              Browse All
            </Button>
          </div>
        </Col>
      </Row>

      {/* Inline keyframes for scroll */}
      <style>{`
        .employer-scroll {
          animation: scroll-left 40s linear infinite;
          display: flex;
          white-space: nowrap;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Container>
  );
};

export default FeaturedEmployers;
