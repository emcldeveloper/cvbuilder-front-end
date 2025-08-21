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
  ClipboardCheck,
  CheckCircleFill,
  LightningFill,

} from 'react-bootstrap-icons';
import { colors } from '@mui/material';
import ConsentFormModal from '../../Forms/JobSeeker/ConsertForm';
import { completeprofile, primarydata } from '../../../Api/Jobseeker/JobSeekerProfileApi';


const LeftSideBar = () => {
  const [profileCompletion, setcomplete] = useState('');
 const [dataprimary, setprimarydata] = useState([]);
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
  console.log("check primary data is available", dataprimary);

  return (
    <div className="d-flex flex-column gap-2">

      <Card className="shadow-sm">
 
        {/* Cover image */}

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  height: '80px',
                  objectFit: 'cover',
                  width: '100%',
                  backgroundImage: `url(https://ekazi.co.tz/${dataprimary?.[0]?.background_picture || '/comp.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                  // https://ekazi.co.tz
                  // http://127.0.0.1:8000
                }}
              />

          {/* Profile image */}

          <div style={{ position: 'absolute', bottom: '-30px', left: '16px' }}>
            <div
              style={{
                width: '80px', // Slightly larger than the image
                height: '80px',
                borderRadius: '50%',
                border: '3px solid #28a745', // Green ring
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Available for Job"
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  backgroundImage: `url(https://ekazi.co.tz/${dataprimary?.[0]?.picture || '/zuu2.png'})`,
                
                
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>



          {/* Edit profile button - moved below cover image */}
          <button
            style={{
              position: 'absolute',
              bottom: '8px', // Adjust this value to position vertically
              right: '16px', // Adjust this value to position horizontally
              borderRadius: '4px',
              padding: '4px 8px',
              backgroundColor: '#0d6efd',
              border: 'none',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onClick={() => window.location.href = '/jobseeker/profile-preview'}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
            Edit Profile
          </button>

          {/* Inline style tag for animation */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
                70% { box-shadow: 0 0 0 8px rgba(40, 167, 69, 0); }
                100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
              }
              `
          }} />
        </div>
        <Card.Body className="text-center mt-2">
          <h5 className="fw-bold mb-1"> {dataprimary?.[0]?.first_name}  {dataprimary?.[0]?.last_name}</h5>
          <p className="text-muted small mb-1">  {dataprimary?.[0]?.latest_position?.position?.position_name || " "}</p>
          {/* Status: Available for Work */}
          {/* <Button
            variant="outline-success"
            className="w-100 mb-2 fw-semibold py-1"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
            onClick={() => setShowAvailabilityModal(true)}
          >
            <Badge bg="success" className="me-2" pill>•</Badge>
            Status: Available for Work
          </Button> */}

          {/* Profile Completion */}
          <div className="text-start mb-2">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <ProgressBar now={profileCompletion} variant="success" className="mb-2" style={{ height: '5px' }} />
          </div>

          {/* Upgrade Button */}
          {/* <Button
            className="w-100 mb-2 text-white fw-semibold py-0"
            style={{
              background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)',
              fontSize: '0.75rem', 
              height: '28px', 
              lineHeight: '1.2' 
            }}
            onClick={() => setShowModalPay(true)}
          >
            <RocketFill className="me-1" size={12} /> 
            Upgrade to Premium
          </Button> */}

          {/* Dashboard Section */}
          <h6 className="border-top pt-2 text-start fw-semibold " onClick={() => navigate('/jobseeker/dashboard')}>

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
                title: "My Correspondend",
                icon: <PersonFill className="me-2" />,
                items: [
                  { name: "Inbox", path: "/jobseeker/employer-correspondence", count: 10 },
                  { name: "Sent", path: "/jobseeker/employer-correspondence", count: 4 },

                  { name: "Consent Form", onClick: () => setShowConsentModal(true) }
                ]
              },
              {
                key: "2",
                title: "My Application",
                icon: <BriefcaseFill className="me-2" />,
                items: [
                  { name: "My Application", path: "/jobseeker/My-application", count: 8 },
                  { name: "History", path: "/jobseeker/history", count: 2 },
                  { name: "Saved Jobs", path: "/jobseeker/saved-jobs", count: 20 },
                  { name: "Job Match", path: "/jobseeker/job-match", count: 3 },
                ]
              },
              // {
              //   key: "3",
              //   title: "My Job Search",
              //   icon: <Search className="me-2" />,
              //   items: [
              //     { name: "Saved Searches", path: "/jobseeker/saved-searches", count: 7 },
              //     { name: "Recent Searches", path: "/jobseeker/recent-searches", count: 12 }
              //   ]
              // },
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