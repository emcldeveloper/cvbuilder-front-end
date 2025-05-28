import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaBuilding, FaClock, FaFileAlt, FaSearch } from 'react-icons/fa';
import {
  BsArrowRight,
  BsFileEarmarkText,
  BsBriefcase,
  BsClock,
  BsSearch,
  BsBuilding
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useJobs from '../../../../hooks/Jobs/useJobs';
import { formatDistanceToNow } from 'date-fns';
import JobDetailModal from '../../../../Component/Jobs/JobDetailModel/JobModelDetail';

const JobSeekerStatistic = () => {

 const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const {
    jobs,
    loading,
    error,
    hasMore,
    loadMore,
    loadingMore, // Track the "Load More" loading state
  } = useJobs(page); // Use the custom hook, passing the current page
  console.log('job zote hapa', jobs)
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  return (
    <div className="w-100">
      <Card className="mb-4 shadow-smy">
        <Card.Body>
          {/* Statistic Cards */}
          <Row className="mb-3 g-2">
            {/* Resume */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-primary fw-bold mb-0">5</h5>
                      <small className="text-muted">Resume</small>
                    </div>
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                      <BsFileEarmarkText size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Applications */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-success fw-bold mb-0">12</h5>
                      <small className="text-muted">Applications</small>
                    </div>
                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-2">
                      <BsBriefcase size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Jobs */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-info fw-bold mb-0">8</h5>
                      <small className="text-muted">Saved Jobs</small>
                    </div>
                    <div className="bg-info bg-opacity-10 text-info rounded-circle p-2">
                      <BsBuilding size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Search */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-warning fw-bold mb-0">3</h5>
                      <small className="text-muted">Saved Search</small>
                    </div>
                    <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                      <BsClock size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recommended Jobs */}
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h5 className="fw-bold mb-0">Recommended jobs for you</h5>
            </Col>
            <Col className="text-end">
              <a href="/jobs" className="text-decoration-none text-primary d-flex align-items-center justify-content-end"
                onClick={() => navigate('/jobs')}
              >
                View all jobs <BsArrowRight className="ms-2" />
              </a>
            </Col>
          </Row>

          {/* Job Listings */}
          {jobs.slice(0, 8).map((job) => (
            <Card key={job.id} className="mb-3 shadow-smy job-item"
            onClick={() => handleJobClick(job)}
            style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <div className="bg-light rounded overflow-hidden" style={{ width: '100%', height: '100%' }}>
                      <img
                        src={job.client?.logo ? `https://ekazi.co.tz/${job.client.logo}` : '/default-logo.png'}
                        alt={job.client?.name || 'Company Logo'}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.target.src = '/default-logo.png';
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-1"> {job.job_position?.position_name || 'Untitled'}</h6>
                    <div className="text-muted d-flex align-items-center mb-1">
                      <FaBuilding className="me-2" />  {job.client?.client_name || 'N/A'}
                    </div>
                    <div className="text-muted mb-1">{job.job_addresses?.[0]?.region?.region_name || ''},  {job.job_addresses?.[0]?.region?.country?.name || 'N/A'}</div>


                    <small className="text-muted">
                      Posted: {job.created_at ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true }) : 'Not specified'}
                    </small>

                    {/* <p>{job.created_at ? new Date(job.created_at).toDateString() : 'Not specified'}</p> */}

                  </Col>
                </Row>

              </Card.Body>
            </Card>
            //   <JobDetailModal 
            //   job={selectedJob} 
            //   show={showModal} 
            //   onHide={() => setShowModal(false)} 
            // />
            
          ))}
        </Card.Body>
      </Card>
      <JobDetailModal 
        job={selectedJob} 
        show={showModal} 
       
        onHide={() => setShowModal(false)} 
      />
      
      <style>{`
    
        .job-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default JobSeekerStatistic;
