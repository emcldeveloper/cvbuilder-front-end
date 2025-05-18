import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container, Button, Spinner, Alert } from "react-bootstrap";
import useJobs from '../../hooks/Jobs/useJobs'; // Ensure the path is correct
import "../../css/Jobs/SideBarListJobs.css"; // Import your CSS file

const SideBarListJobs = ({ setSelectedJob, setActiveJob, activeJob }) => {
  const [page, setPage] = useState(1);
  const {
    jobs,
    loading,
    error,
    hasMore,
    loadMore,
    loadingMore, // Track the "Load More" loading state
  } = useJobs(page); // Use the custom hook, passing the current page

  const handleJobClick = (job) => {
    setActiveJob(job); // Set the clicked job as active for highlighting
    setSelectedJob(job);  // Set the clicked job as selected to pass to parent component
  };

  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Handle loading and error states
  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs. Please try again later.</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          {/* Wrapper Card for job listings */}
          <Card className="p-3" style={{ minHeight: '600px' }}> {/* Increased height of card */}
            <Card.Body>
              <h5 className="mb-3">{jobs.total} Jobs Found.</h5>
              <hr className="full-width" />

              {/* Scrollable container for job list */}
              <div
                style={{
                  maxHeight: '400px', // Keep this value for scrollable container
                  overflowY: 'auto',
                  marginBottom: '10px',
                  paddingRight: '10px',
                }}
              >
                {/* Mapping through the job list */}
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-item mb-3 ${activeJob?.id === job.id ? "active" : ""}`} // Add active class for selected job
                    onClick={() => handleJobClick(job)} // Handle job click
                  >
                    <Row className="d-flex align-items-center">
                      {/* Job Image */}
                      <Col xs={3}>
                        <img
                          src={`https://ekazi.co.tz/${job.client.logo}` || 'default-image-url.jpg'} // Use default image if no logo available
                          alt={job.title}
                          style={{
                            width: '100%',  // Set width to 100% of the column
                            height: '100px', // Set fixed height to keep logos consistent
                            objectFit: 'contain', // Maintain aspect ratio
                            objectPosition: 'center', // Center the image
                          }}
                        />
                      </Col>

                      {/* Job Details */}
                      <Col xs={9}>
                        <p className="job-position">
                          {capitalizeWords(job.job_position.position_name || 'Position not provided')}
                        </p>
                        <p className="job-company">{capitalizeWords(job.client.client_name || 'No company name')}</p>
                        
                        {/* Displaying job location and country */}
                        <p className="job-location">
                          {capitalizeWords(job.job_addresses[0]?.sub_location || 'Address not provided')}, 
                          {capitalizeWords(job.job_addresses[0]?.region?.region_name || 'Location not provided')}, 
                          {capitalizeWords(job.job_addresses[0]?.region?.country?.name || 'Country not provided')}
                        </p>
                        <p className="job-posted">{new Date(job.publish_date).toLocaleDateString()}</p>
                      </Col>
                    </Row>
                    <hr className="full-width" />
                  </div>
                ))}

                {/* Show loading spinner when more jobs are being fetched */}
                {loading && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {/* Show Load More button if there are more jobs to load */}
                {!loading && hasMore && !loadingMore && (
                  <div className="text-center my-4">
                    <Button onClick={loadMore}>Load More</Button>
                  </div>
                )}

                {/* Show the spinner when loading more jobs */}
                {loadingMore && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {/* Show a message if no more jobs are available */}
                {!loading && !hasMore && (
                  <div className="text-center my-4">
                    <Alert variant="info">No more jobs to load.</Alert>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarListJobs;
