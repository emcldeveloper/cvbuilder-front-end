import React from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import AllEmployerCard from './AllEmployerCard';
import useEmployer from '../../hooks/Employer/useEmployer';

const AllEmployerList = ({ filters, page, perPage }) => {
  // Pass filters, page, and perPage to the useEmployer hook
  const { jobCompanies, loading, error } = useEmployer(page, perPage, filters);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error message if failed to fetch */}

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <AllEmployerCard jobCompanies={jobCompanies} />
        </Row>
      )}
    </Container>
  );
};

export default AllEmployerList;
