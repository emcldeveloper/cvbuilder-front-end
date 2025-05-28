import React from 'react';
import { Row, Container, Spinner, Alert } from 'react-bootstrap';
import FeatureCandidate from './FeatureCandidate';
import useFeaturedJobSeekers from '../../hooks/Candidate/FeaturedJobSeeker';

const FeaturedCandidateList = () => {
  const { jobSeekers, loading, error } = useFeaturedJobSeekers();

  return (
    <Container>
      <h4 className="text-center" style={{ color: '#2E58A6', marginTop: '2%' }}>
        Featured Candidate
      </h4>
      <br />

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      <Row>
        {jobSeekers.slice(0, 9).map((candidate) => (
          <FeatureCandidate key={candidate.id} candidate={candidate} />
        ))}
      </Row>

      <h4 className="text-center" style={{ color: '#2E58A6' }}>
        Browse All
      </h4>
    </Container>
  );
};

export default FeaturedCandidateList;
