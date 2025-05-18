import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import MainLayout1 from '../../layouts/MainLayout1';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../Component/Pages/PageHeader';
import { Helmet } from 'react-helmet';
import JobDetails from '../../Component/Jobs/JobDetails';

const JobPreview = () => {
  // Ensure the page scrolls to the top when it's loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { state } = useLocation();
  const { job } = state;

  // Inline styles for the sticky effect
  const stickyStyle = {
    position: "sticky",
    top: "80px", // Adjust this value based on your header height (80px is an example)
    zIndex: 10,
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for visual clarity
    paddingTop: "20px", // Optional padding for visual spacing
  };

  return (
    <MainLayout1>
      <Helmet>
        <meta property="og:title" content={job?.job_position?.position_name || 'Job Opportunity'} />
        <meta property="og:description" content={`Apply now at ${job?.client?.client_name}`} />
        <meta property="og:image" content={`https://ekazi.co.tz/${job?.client?.logo}`} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={job?.job_position?.position_name} />
        <meta name="twitter:description" content={`Apply now at ${job?.client?.client_name}`} />
        <meta name="twitter:image" content={`https://ekazi.co.tz/${job?.client?.logo}`} />
      </Helmet>

      <PageHeader title={job?.job_position?.position_name || 'Untitled Job'} />

      {/* Main Content Section */}
      <Container className="mt-1">
        <Row>
          <Col md={9}>
            {/* Apply stickyStyle directly to the JobDetails wrapper */}
            <div style={stickyStyle}>
              <JobDetails job={job} />
            </div>
          </Col>

          {/* Right Ad Column */}
          <Col md={3}>
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', height: 600, backgroundColor: '#f1f1f1', textAlign: 'center' }}>
                  Google Ad Space
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default JobPreview;
