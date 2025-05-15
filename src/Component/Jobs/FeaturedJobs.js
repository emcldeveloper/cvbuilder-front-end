import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Alert, Button } from 'react-bootstrap';
import { getJobs } from '../../Api/Job/FeactureJob';
import JobCard from './JobCard';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 10;

  const fetchJobs = async (currentPage) => {
    try {
      setLoading(true);

      const response = await getJobs(currentPage, perPage);

      // Extract job list from response
      const newJobs = response || [];

      // Map jobs to expected props for JobCard
      const mappedJobs = newJobs.map((job) => ({
        title: job.job_position?.position_name || 'N/A',
        vacancies: job.quantity || 1,
        company: job.client?.client_name || 'Exact Manpower Consulting Ltd',
        type: job.job_type?.type_name || 'N/A',
        location: [job.region?.region_name, job.country?.name].filter(Boolean).join(', ') || 'N/A',
        deadline: job.dead_line ? new Date(job.dead_line).toDateString() : 'N/A',
        industry: job.industry?.industry_name || job.job_category?.industry_name || 'N/A',
        views: job.statistic?.job_views || 0,
        likes: job.statistic?.job_likes || 0,
        logo: job.logo || (job.client?.logo ? `https://ekazi.co.tz/${job.client.logo}` : null),
        link: `/jobs/${job.id}`
      }));

      setJobs((prevJobs) => [...prevJobs, ...mappedJobs]);

      // Check if more pages exist
      const totalPages = response?.total_pages || 1;
      setHasMore(currentPage < totalPages);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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

      {!loading && hasMore && (
        <div className="text-center my-4">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </Container>
  );
};

export default FeaturedJobs;
