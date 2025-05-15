import React from 'react';
import { Container, Row, Spinner, Alert, Button } from 'react-bootstrap';
import useJobs from '../../hooks/Jobs/useJobs'; // ✅ Make sure the path is correct
import JobCard from './JobCard';

const FeaturedJobs = () => {
  const {
    jobs,
    loading,
    error,
    hasMore,
    loadMore,
    loadingMore, // Track the "Load More" loading state
  } = useJobs(); // ✅ Use the custom hook

  return (
    <Container>
      <h4 className="text-center" style={{ color: '#2E58A6', marginTop: '2%' }}>
        All Jobs
      </h4>
      <br />

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </Row>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {/* Show Load More button only if not currently loading more */}
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

      {/* Show a message if there are no more jobs */}
      {!loading && !hasMore && (
        <div className="text-center my-4">
          <Alert variant="info">No more jobs to load.</Alert>
        </div>
      )}
    </Container>
  );
};

export default FeaturedJobs;
