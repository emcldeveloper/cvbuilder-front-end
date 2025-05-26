import React, { useState } from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllEmployerCard = ({ jobCompanies, loadMoreClients, hasMoreClients }) => {
  const [loading, setLoading] = useState(false);

  const renderLocation = (client) => {
    const locationParts = [];

    if (client.client_location?.sub_location && client.client_location.sub_location !== '1') {
      locationParts.push(client.client_location.sub_location);
    }
    if (client.client_location?.region?.region_name) {
      locationParts.push(client.client_location.region.region_name);
    }
    if (client.client_location?.region?.country?.name) {
      locationParts.push(client.client_location.region.country.name);
    }

    return locationParts.join(', ') || 'Location not available';
  };

  const handleLoadMore = async () => {
    setLoading(true);
    await loadMoreClients();
    setLoading(false);
  };

  return (
    <Container className="py-4">
      <Row>
        {jobCompanies.map((client) => (
          <Col key={client.id} xs={12} className="mb-4">
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body>
                <Row className="align-items-center g-3">
                  {/* Logo */}
                  <Col xs={3} md={2} className="text-center">
                    <Link to={`/employer/details`} state={{ client }}>
                      <img
                        src={client.logo ? `https://ekazi.co.tz/${client.logo}` : '/img/default.png'}
                        alt={client.client_name}
                        className="img-fluid border rounded"
                        style={{
                          height: '70px',
                          width: '70px', // Consistent width for all screen sizes
                          objectFit: 'contain', // Ensure logo is contained within box without distortion
                        }}
                      />
                    </Link>
                  </Col>

                  {/* Info */}
                  <Col xs={6} md={8}>
                    <h6 className="mb-1 text-primary text-truncate" style={{ maxWidth: '100%' }}>
                      {client.client_name}
                    </h6>
                    <p className="mb-1 text-muted small">
                      {client.industry?.industry_name || 'Industry not available'}
                    </p>
                    <p className="mb-0 text-muted small">{renderLocation(client)}</p>
                  </Col>

                  {/* View Profile */}
                  <Col xs={3} md={2} className="text-end">
                    <Link
                      to={`/employer/details`}
                      state={{ client }}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      <div className="text-center mt-4">
        {hasMoreClients ? (
          <Button
            onClick={handleLoadMore}
            variant="primary"
            size="md"
            disabled={loading}
            className="px-4 shadow"
          >
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin me-2"></i> Loading...
              </>
            ) : (
              'Load More Employers'
            )}
          </Button>
        ) : (
          <Button variant="secondary" size="md" disabled className="px-4">
            No More Employers
          </Button>
        )}
      </div>
    </Container>
  );
};

export default AllEmployerCard;
