import React from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import FeaturedEmployers from './FeaturedEmployers';
import useEmployer from '../../hooks/Employer/useEmployer';

const FeaturedEmployerList = () => {
  const { jobCompanies, loading, error } = useEmployer(1, 20); // Using the hook with default page size of 20

  return (
    <Container>
  

      {error && <Alert variant="danger">{error}</Alert>} {/* Show error message if failed to fetch */}

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
        
          <FeaturedEmployers jobCompanies={jobCompanies} />
        </Row>
      )}
    </Container>
  );
};

export default FeaturedEmployerList;
