import React, { useState } from 'react';
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


const LeftSideBar = () => {
  const [profileCompletion] = useState(75);
  const [showModalPay, setShowModalPay] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  // Inside your component:
  const navigate = useNavigate();


  return (
    <div className="d-flex flex-column gap-3">
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
                src="/zuu.JPEG"
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

        <Card.Body className="text-center mt-4">
          <h5 className="fw-bold mb-1">Halidi Maneno</h5>
          <p className="text-muted small mb-1">Machine Learning Engineering</p>
          <p className="text-muted small">Exactmanpower Consult LTD</p>
          {/* Status: Available for Work */}
          <Button
            variant="outline-success"
            className="w-100 mb-3 fw-semibold py-1"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
            onClick={() => setShowAvailabilityModal(true)}
          >
            <Badge bg="success" className="me-2" pill>•</Badge>
            Status: Available for Work
          </Button>

          {/* Profile Completion */}
          <div className="text-start mb-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <ProgressBar now={profileCompletion} variant="success" className="mb-2" style={{ height: '5px' }} />
          </div>

          {/* Upgrade Button */}
          <Button
            className="w-100 mb-3 text-white fw-semibold py-1"
            style={{
              background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)',
              fontSize: '0.9rem'
            }}
            onClick={() => setShowModalPay(true)}
          >
            <RocketFill className="me-1" /> Upgrade to Premium
          </Button>

          {/* Dashboard Section */}
          <h6 className="border-top pt-2 text-start fw-semibold small" onClick={() => navigate('/jobseeker/dashboard')}>

            <BarChartFill className="me-2" /> Dashboard
          </h6>


          <div
            className="p-3 mb-3  text-dark rounded-lg shadow-sm cursor-pointer hover:bg-warning-dark transition-colors
             border border-2 border-danger"  style={{ color: '#D36314' }}
            onClick={() => setShowConsentModal(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ClipboardCheck className="me-3 text-lg text-danger" />
                <div>
                  <span className="font-bold">CONSENT FORM</span>
                  <p className="text-sm mt-1">Click to authorize your background verification</p>
                </div>
              </div>
              <span className="text-xs bg-danger text-white px-2 py-1 rounded-full animate-pulse">
                ACTION REQUIRED
              </span>
            </div>
          </div>
          <ConsentFormModal
            show={showConsentModal}
            onClose={() => setShowConsentModal(false)}
          />
          {/* Accordions */}

          <Accordion flush className=" pt-2 text-start mb-2">
            {[
              {
                key: "0",
                title: "Resume Manager",
                icon: <FileEarmarkTextFill className="me-2" />,
                items: [
                  { name: "Build Cv", path: "/jobseeker/sample-selection" },
                  { name: "My Resume", path: "/jobseeker/my-resume", count: 5 },
                  { name: "My subscription", path: "/jobseeker/my-resume", count: 5 },
                  { name: "create cover letter", path: "/jobseeker/my-resume" }
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
                  { name: "Consert Form", path: "/jobseeker/conser-form" }
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
                  // { name: "Apply Letter", path: "/jobseeker/apply-letter", count: 7 },
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
              <Accordion.Item eventKey={section.key} key={section.key} className="border-0">
                <Accordion.Header className="small  border-top py-2">
                  {section.icon}{section.title}
                </Accordion.Header>
                <Accordion.Body className="py-1 ">
                  <ListGroup variant="flush">
                    {section.items.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        className="small py-1 px-0 border-0 d-flex justify-content-between align-items-center"
                        action
                        onClick={() => navigate(item.path)}
                      >

                        <span className="text-decoration-none cursor-pointer">{item.name}</span>
                        {item.count !== undefined && (
                          <span className="badge bg-secondary rounded-pill ms-2">
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