import React from 'react';
import { Container, Row } from 'react-bootstrap';
import JobCard from './JobCard';

const FeaturedJobs = () => {
  const jobs = [
    {
      title: 'Floor Manager – Restaurant',
      vacancies: 1,
      company: 'Exact Manpower Consulting Ltd',
      type: 'Full Time',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Fri, 30 May 2025',
      industry: 'Hospitality',
      views: 25,
      likes: 0,
      logo: 'https://ekazi.co.tz/uploads/060805212930610b8585690db_emcl logo.png',
      link: '/jobs/1'
    },
    {
      title: 'Sales Executive',
      vacancies: 1,
      company: 'Exact Manpower Consulting Ltd',
      type: 'Permanent',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Sat, 17 May 2025',
      industry: 'Automotive',
      views: 85,
      likes: 0,
      logo: 'https://ekazi.co.tz/uploads/060805212930610b8585690db_emcl logo.png',
      link: '/job/show/sales-executive-2-job-in-dar-es-salaam-Tanzania/MTEwNjc='
    },
    {
      title: 'Accountant Executive',
      vacancies: 1,
      company: 'Exact Manpower Consulting Ltd',
      type: 'Full Time',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Sat, 24 May 2025',
      industry: 'Agriculture',
      views: 110,
      likes: 0,
      logo: 'https://ekazi.co.tz/uploads/060805212930610b8585690db_emcl logo.png',
      link: '/job/show/accountant-executive-job-in-dar-es-salaam-Tanzania/MTEwMzk='
    },
    // Add more jobs as needed...
  ];

  return (
    <Container>
      <h4 className="text-center" style={{ color: '#2E58A6', marginTop: '2%' }}>
        All Jobs
      </h4>

      <br />
      <Row>
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
           
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedJobs;
