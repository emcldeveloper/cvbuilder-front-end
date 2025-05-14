// src/components/Employee/FeaturedCandidateList.js

import React from 'react';
import { Row,Container } from 'react-bootstrap';
import FeatureCandidate from './FeatureCandidate';

const FeaturedCandidateList = () => {
  const candidates = [
    {
      id: 'MjgzNDA=',
      name: 'Jesca Ngowi',
      image: 'https://ekazi.co.tz/uploads/picture/202505030539486815ac246d250_20250430_184341.jpg',
      position: 'No Position Records',
      location: 'Dar Es Salaam',
      availability: 'Available for Job Vacancies',
      views: 67,
      likes: 0,
    },
    {
      id: 'MjgzNDE=',
      name: 'David Mushi',
      image: 'https://ekazi.co.tz/uploads/picture/sample-candidate.jpg',
      position: 'Software Engineer',
      location: 'Arusha',
      availability: 'Looking for Full-Time',
      views: 45,
      likes: 12,
    },
    {
      id: 'MjgzNDI=',
      name: 'Grace John',
      image: 'https://ekazi.co.tz/uploads/picture/sample2.jpg',
      position: 'HR Specialist',
      location: 'Dodoma',
      availability: 'Available Immediately',
      views: 88,
      likes: 22,
    }
  ];

  return (
    
     <Container>
          <h4 className="text-center" style={{ color: '#2E58A6', marginTop: '2%' }}>
            Featured Candidate
          </h4>
          <br />
          <Row>
           {candidates.map(candidate => (
            <FeatureCandidate key={candidate.id} candidate={candidate} />
            ))}
          </Row>
         
          <h4 className="text-center" style={{ color: '#2E58A6'}}>
           Browse All
          </h4>
          
        </Container>
  );
};

export default FeaturedCandidateList;
