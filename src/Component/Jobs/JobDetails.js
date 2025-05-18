import React,{useEffect} from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import {
  FaEye, FaUsers, FaBriefcase, FaMoneyBill, FaCalendar,
  FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin
} from 'react-icons/fa';

const JobDetails = ({job}) => {
    const isExpired = job?.dead_line ? new Date(job.dead_line) < new Date() : false;
   // Construct share content
    const shareTitle = `Job Opening: ${job?.job_position?.position_name ?? 'Untitled Job'} at ${job?.client?.client_name ?? ''}`;
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
  
  return (
 
   
         <div>
            <Card className="mb-4">
              <Card.Body>

                {/* Top Info Section */}
                <Row className="text-center mb-3">
                  <Col md={2}>
                    <div className="d-flex flex-column align-items-center">
                      <FaEye size={24} color="#D36314" />
                      <div style={{ fontSize: 16, marginTop: 4 }}>Views</div>
                      <div>{job.statistic?.job_views ?? 0}</div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex flex-column align-items-center">
                      <FaUsers size={24} color="#D36314" />
                      <div style={{ fontSize: 16, marginTop: 4 }}>Applicants</div>
                      <div>{job.applied_count ?? 0}</div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex flex-column align-items-center">
                      <FaBriefcase size={24} color="#D36314" />
                      <div style={{ fontSize: 16, marginTop: 4 }}>Job Type</div>
                      <div>{job.job_type?.type_name ?? 'N/A'}</div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex flex-column align-items-center">
                      <FaMoneyBill size={24} color="#D36314" />
                      <div style={{ fontSize: 16, marginTop: 4 }}>Salary</div>
                      <div>{job.entry_salary || job.exit_salary ? `${job.entry_salary ?? 0} - ${job.exit_salary}` : 'Negotiable'}</div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex flex-column align-items-center">
                      <FaCalendar size={24} color="#D36314" />
                      <div style={{ fontSize: 16, marginTop: 4 }}>Deadline</div>
                      <div>{job.dead_line ? (isExpired ? <span style={{ color: 'red' }}>Expired</span> : new Date(job.dead_line).toDateString()) : 'Not specified'}</div>
                    </div>
                  </Col>
                </Row>

                <hr />

                {/* Header */}
                <Row className="my-3">
                  <Col md={3}>
                    <img
                     src={`https://ekazi.co.tz/${job.client?.logo}` || 'default-logo.png'}
                      alt={job.client?.client_name || 'Company Logo'}
                      style={{ maxWidth: 120, maxHeight: 75 }}
                    />
                  </Col>
                  <Col md={7}>
                    <h6><b>{job.job_position?.position_name || 'Untitled'}</b></h6>
                    <p>{job.client?.client_name}</p>
                  </Col>
                  {/* <Col md={2}>
                    <Button style={{ borderRadius: '30px' }} className="bg-orange text-white">
                      {job.job_type?.type_name ?? 'N/A'}
                    </Button>
                  </Col> */}
                </Row>

                <hr />
                <h6><b>Reporting Structure</b></h6>
                <Row><Col md={3}><b>Report To:</b></Col><Col md={9}>{job.job_report_to?.report_to || 'N/A'}</Col></Row>
                <Row><Col md={3}><b>Supervision:</b></Col><Col md={9}>{job.job_report_to?.supervises || 'N/A'}</Col></Row>
                <Row><Col md={3}><b>Interacts With:</b></Col><Col md={9}>{job.job_report_to?.interacts_with || 'N/A'}</Col></Row>

                <hr />
                <h6><b>Job Requirements</b></h6>
                <Row>
                  <Col md={3}><b>Education:</b></Col>
                  <Col md={9}>
                    {(job.job_education || []).map((edu, i) => (
                      <span key={i}>
                        {i > 0 ? ', ' : ''}
                        {edu.education_level?.education_level} - {edu.major?.name}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row><Col md={3}><b>Job Level:</b></Col><Col md={9}>{job.position_level?.position_name || 'N/A'}</Col></Row>
                <Row><Col md={3}><b>Gender:</b></Col><Col md={9}>{job.job_gender?.gender_name || 'N/A'}</Col></Row>
                <Row><Col md={3}><b>Age:</b></Col><Col md={9}>{job.applicant_min_age || job.applicant_max_age ? `${job.applicant_min_age} - ${job.applicant_max_age} Years` : 'Not specified'}</Col></Row>
                <Row><Col md={3}><b>Experience:</b></Col><Col md={9}>{job.years_experience || 'N/A'}</Col></Row>
                <Row><Col md={3}><b>Abilities:</b></Col><Col md={9}>N/A</Col></Row> {/* Assuming no "abilities" array */}
                <Row><Col md={3}><b>Culture:</b></Col><Col md={9}>{(job.job_culture || []).map(c => c.culture?.culture_name).join(', ')}</Col></Row>
                <Row><Col md={3}><b>Knowledge:</b></Col><Col md={9}>{(job.job_knowledge || []).map(k => k.knowledge?.knowledge_name).filter(Boolean).join(', ')}</Col></Row>
                <Row><Col md={3}><b>Personality:</b></Col><Col md={9}>{(job.job_personality || []).map(p => p.personality?.personality_name).join(', ')}</Col></Row>
                <Row><Col md={3}><b>Languages:</b></Col><Col md={9}>{(job.job_language || []).map(l => l.language?.language_name).join(', ')}</Col></Row>

                <hr />
                <h6><b>Main Duties</b></h6>
                <div dangerouslySetInnerHTML={{ __html: job.job_duties?.main_duties || 'N/A' }} />

                <hr />
                <h6><b>Other Requirements</b></h6>
                <div dangerouslySetInnerHTML={{ __html: job.job_other_requirement?.other_requirement || 'N/A' }} />

                <hr />
                <p>
                  <b>Location:</b> {job.job_addresses?.[0]?.sub_location || 'N/A'}, {job.job_addresses?.[0]?.region?.region_name || ''}<br />
                  <b>Country:</b> {job.job_addresses?.[0]?.region?.country?.name || 'N/A'}<br />
                  <b>Industry:</b> {job.industry?.industry_name || 'N/A'}<br />
                  <b>Company:</b> {job.client?.client_name || 'N/A'}
                </p>

                {/* Social Icons */}
               <Row className="mt-4 justify-content-center text-center">
        <Col xs="auto">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            <FaFacebook size={30} color="#3b5998" />
          </a>
        </Col>
        <Col xs="auto">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
          >
            <FaTwitter size={30} color="#1DA1F2" />
          </a>
        </Col>
        <Col xs="auto">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <FaWhatsapp size={30} color="#25D366" />
          </a>
        </Col>
        <Col xs="auto">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
          >
            <FaLinkedin size={30} color="#0077b5" />
          </a>
        </Col>
      </Row>

                <div className="text-center mt-4">
                  <Button variant="primary" size="lg" onClick={() => alert('Apply functionality here')}>
                    Apply Now
                  </Button>
                </div>

              </Card.Body>
            </Card>
         </div>

 
  );
};

export default JobDetails;
