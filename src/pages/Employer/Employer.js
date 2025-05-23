import React, { useState, useEffect } from "react";
import MainLayout1 from "../../layouts/MainLayout1";
import PageHeader from "../../Component/Pages/PageHeader";
import { Row, Col, Container } from "react-bootstrap";
import EmployerFilter from "../../Component/Employer/EmployerFilter";
import AllEmployerList from "../../Component/Employer/AllEmployerList";
import useEmployer from "../../hooks/Employer/useEmployer";
import AdPlaceholder from "../../Component/Ads/Vertical/AdPlaceholder";

const Employer = () => {
  const [filters, setFilters] = useState({
    industry: '',
    country: '',
    region: '',
    character: ''
  });

  const [page, setPage] = useState(1);
  const perPage = 10;

  const { employers, fetchEmployers, hasMore, loading } = useEmployer();

  // Function to handle the filter change
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value, // Dynamically update the correct filter
    }));
  };

  useEffect(() => {
    setPage(1);
    fetchEmployers({ page: 1, perPage, filters, reset: true });
  }, [filters]);

  useEffect(() => {
    if (page > 1) {
      fetchEmployers({ page, perPage, filters });
    }
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <MainLayout1>
      <PageHeader title="Employers" />
      <Container className="my-4">
        <Row>
          <Col
            xs={12}
            md={3}
            className="mb-3"
            style={{ position: "sticky", top: "180px", alignSelf: "flex-start" }}
          >
            {/* Pass the handleFilterChange function as onChange */}
            <EmployerFilter 
              filters={filters} 
              onChange={handleFilterChange} 
            />
          </Col>

          <Col xs={12} md={6}>
            <AllEmployerList
              filters={filters} // Passing filters here
              page={page}        // Passing page number here
              perPage={perPage}  // Passing items per page here
            />
          </Col>

          <Col
            xs={12}
            md={3}
            className="mb-3"
            style={{ position: "sticky", top: "180px", alignSelf: "flex-start" }}
          >
            <AdPlaceholder />
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default Employer;
