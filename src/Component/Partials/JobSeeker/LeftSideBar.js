import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, ProgressBar, Accordion, Image, ListGroup, Badge, Modal, } from 'react-bootstrap';
import {
  PencilFill,
  RocketFill,
  BarChartFill,
  FileEarmarkTextFill,
  BriefcaseFill,
  PersonFill,
  Search,
  BookFill,
  PeopleFill, InfoCircleFill,
  ClipboardCheck

} from 'react-bootstrap-icons';
import { colors } from '@mui/material';
import ConsentFormModal from '../../Forms/JobSeeker/ConsertForm';
import { completeprofile, primarydata } from '../../../Api/Jobseeker/JobSeekerProfileApi';


const LeftSideBar = () => {
  const [profileCompletion, setcomplete] = useState('');
   const [dataprimary, setprimarydata] = useState('');
  const [showModalPay, setShowModalPay] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  // Inside your component:
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const applicant_id = localStorage.getItem("applicantId");

  useEffect(() => {
    const fetchCompleteProfile = async () => {
      try {
        setLoading(true);
        const data = await completeprofile(applicant_id)
    
        console.log("complete data is ", data);
        // setcomplete(data);
        setcomplete(Math.round(data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompleteProfile();
  }, []); // Re-fetch when page or perPage changes
  
  useEffect(() => {
    const fetchprimarydata = async () => {
      try {
        setLoading(true);
        const data = await primarydata(applicant_id)
    
        console.log("primary data ", data);
        setprimarydata(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchprimarydata();
  }, []); // Re-fetch when page or perPage changes
  console.log("check primary data is available",dataprimary);

  return (
    <div className="d-flex flex-column gap-2">
   
      <Card className="shadow-sm">
        {/* Cover image */}
        
        <div className="position-relative">
          <Card.Img
            variant="top"
            src="/comp.jpg"
            className="object-fit-cover"
            style={{ height: '80px', objectFit: 'cover' }}
          />

          {/* Profile image */}
          <div className="position-absolute" style={{ bottom: '-30px', left: '16px' }}>
            <div className="position-relative">
              <Image
                src="/zuu2.png"
                roundedCircle
                className="border border-3 border-white shadow"
                style={{ width: '72px', height: '72px', objectFit: 'cover' }}
              />
              <Button
                variant="primary"
                size="sm"
                className="position-absolute bottom-0 end-0 rounded-circle p-1"
                onClick={() => window.location.href = '/jobseeker/profile-preview'}
              >
                <PencilFill size={12} />
              </Button>
            </div>
          </div>
        </div>

        <Card.Body className="text-center mt-2">
          <h5 className="fw-bold mb-1">Halidi Maneno</h5>
          <p className="text-muted small mb-1">Machine Learning Engineering(latest position)</p>
          {/* <p className="text-muted small mb-2">Exactmanpower Consult LTD</p> */}
          {/* Status: Available for Work */}
          <Button
            variant="outline-success"
            className="w-100 mb-2 fw-semibold py-1"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
            onClick={() => setShowAvailabilityModal(true)}
          >
            <Badge bg="success" className="me-2" pill>•</Badge>
            Status: Available for Work
          </Button>

          {/* Profile Completion */}
          <div className="text-start mb-2">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <ProgressBar now={profileCompletion} variant="success" className="mb-2" style={{ height: '5px' }} />
          </div>

          {/* Upgrade Button */}
          <Button
            className="w-100 mb-2 text-white fw-semibold py-1"
            style={{
              background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)',
              fontSize: '0.875r 2vw ,1rem'
            }}
            onClick={() => setShowModalPay(true)}
          >
            <RocketFill className="me-2" /> Upgrade to Premium
          </Button>

          {/* Dashboard Section */}
          <h6 className="border-top pt-2 text-start fw-semibold small" onClick={() => navigate('/jobseeker/dashboard')}>

            <BarChartFill className="me-2" /> Dashboard
          </h6>


      
          <ConsentFormModal
            show={showConsentModal}
            onClose={() => setShowConsentModal(false)}
          />
          {/* Accordions */}

          <Accordion flush className="text-start mb-1" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {[
              {
                key: "0",
                title: "Cv Manager",
                icon: <FileEarmarkTextFill className="me-2" />,
                items: [
                  { name: "Build Cv", path: "/jobseeker/sample-selection" },
                  { name: "My Cv", path: "/jobseeker/my-resume", count: 5 },
                  { name: "My subscription", path: "/jobseeker/my-resume", count: 5 },
                  { name: "create cover letter", path: "/jobseeker/cover-letter" }
                ]
              },
              {
                key: "1",
                title: "My Account",
                icon: <PersonFill className="me-2" />,
                items: [
                  { name: "My Profile", path: "/jobseeker/profile-preview" },
                  { name: "Account Settings", path: "/jobseeker/account-settings" },
                  { name: "Change Password", path: "/jobseeker/change-password" },
                  { name: "Privacy Policy", path: "/jobseeker/Privacy-policy" },
                  { name: "Consent Form", onClick: () => setShowConsentModal(true) }
                ]
              },
              {
                key: "2",
                title: "My Application",
                icon: <BriefcaseFill className="me-2" />,
                items: [
                  { name: "My Application", path: "/jobseeker/My-application", count: 8 },
                  { name: "Employer Correspondence", path: "/jobseeker/employer-correspondence", count: 2 },
                  { name: "History", path: "/jobseeker/history", count: 2 },
                  { name: "Saved Jobs", path: "/jobseeker/saved-jobs", count: 20 },
                  { name: "Job Match", path: "/jobseeker/job-match", count: 3 },
                ]
              },
              {
                key: "3",
                title: "My Job Search",
                icon: <Search className="me-2" />,
                items: [
                  { name: "Saved Searches", path: "/jobseeker/saved-searches", count: 7 },
                  { name: "Recent Searches", path: "/jobseeker/recent-searches", count: 12 }
                ]
              },
              {
                key: "4",
                title: "Resources",
                icon: <BookFill className="me-2" />,
                items: [
                  { name: "Resume Tips", path: "/jobseeker/resume-tips" },
                  { name: "Interview Tips", path: "/jobseeker/interview-tips" }
                ]
              },
            ].map(section => (
              <Accordion.Item
                eventKey={section.key}
                key={section.key}
                className="border-0"
              >
                <Accordion.Header className="small py-0   border-top px-0" style={{ fontSize: '0.8rem' }} >
                  <div className="d-flex align-items-center">
                    {/* {section.icon} */}
                    {React.cloneElement(section.icon, { size: 14 })}
                    <span>{section.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="py-1 px-0">
                  <ListGroup variant="flush">
                    {section.items.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        className="small py-1 px-0 border-0 d-flex justify-content-between align-items-center"
                        action
                        onClick={item.onClick || (() => navigate(item.path))}
                      >
                        <span className="text-decoration-none cursor-pointer">{item.name}</span>
                        {item.count !== undefined && (
                          <span className="badge bg-secondary rounded-pill" style={{ fontSize: '0.65rem' }}>
                            {item.count}
                          </span>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
      <Modal show={showAvailabilityModal} onHide={() => setShowAvailabilityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Your Profile Public</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <PeopleFill className="text-primary" size={48} />
          </div>
          <p>To make your profile visible to employers and appear in search results, you need a Premium account.</p>

          <div className="alert alert-info small">
            <InfoCircleFill className="me-2" />
            Premium members get:
            <ul className="mt-2 mb-0">
              <li>Profile visibility to top employers</li>
              <li>Higher ranking in search results</li>
              <li>Access to exclusive job opportunities</li>
              <li>Priority application processing</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvailabilityModal(false)}>
            Not Now
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowAvailabilityModal(false);
              setShowModalPay(true);
            }}
            style={{
              background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)',
              border: 'none'
            }}
          >
            Upgrade to Premium
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeftSideBar;