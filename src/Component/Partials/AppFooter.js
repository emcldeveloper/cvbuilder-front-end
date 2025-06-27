import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsFacebook, BsLinkedin, BsTwitter, BsRssFill, BsMap } from 'react-icons/bs';

import SubFooter from './SubFooter';
import ContactModal from '../Pages/ContactModal';
import MapModal from '../Pages/MapModal';

const AppFooter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  return (
    <footer className="bg-white text-dark py-4 mt-4 border-top">
      <Container fluid>
        <SubFooter />

        <Row xs={2} sm={2} md={4} className="g-3 mt-2">
          {/* Logo & Social Links */}
          <Col>
            <img
              src="/logo.png"
              alt="eKazi Logo"
              style={{ maxWidth: '120px', marginBottom: '10px' }}
            />
            <p className="mb-2 text-muted">
              © {currentYear}.
              <a href="#" className="text-primary ms-1">
                eKazi.co.tz
              </a>
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-primary" title="Facebook">
                <BsFacebook size={20} />
              </a>
              <a href="#" className="text-primary" title="LinkedIn">
                <BsLinkedin size={20} />
              </a>
              <a href="#" className="text-primary" title="Twitter">
                <BsTwitter size={20} />
              </a>
              <a href="#" className="text-primary" title="RSS">
                <BsRssFill size={20} />
              </a>
            </div>
          </Col>

          {/* Job Seeker Links */}
          <Col>
            <p className="fw-bold">JOB SEEKER</p>
            {[
              ['Sign up', 'jobseeker-register/'],
              ['Search jobs', 'jobs/'],
              ['Sign in', 'login/'],
              ['View applications', 'login/'],
              ['Job alerts', 'login/'],
              ['Post resume', ''],
              ['My courses', '']
            ].map(([label, link]) => (
              <div key={label}>
                <a href="#" className="text-primary">
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Employer Links */}
          <Col>
            <p className="fw-bold">EMPLOYER</p>
            {[
              ['Post a job', 'employer/job/post'],
              ['Search resume', 'employer/search/applicant'],
              ['Sign in', 'login/'],
              ['Sign up', 'register/'],
              ['Applicant tracking', 'employer/dashboard/']
            ].map(([label, link]) => (
              <div key={label}>
                <a href={`https://ekazi.co.tz/${link}`} className="text-primary">
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Information Links */}
          <Col>
            <p className="fw-bold">INFORMATION</p>

            {/* About Us Link */}
            <div>
              <a href="/about" className="text-primary">
                About us
              </a>
            </div>

            {/* View Map Button */}
            <div className="my-2">
              <span    className="text-primary"
                style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleOpenMap}>
                 View Map
              </span>
            </div>

            {/* Contact Modal Link */}
            <div>
              <span
                onClick={handleOpenModal}
                className="text-primary"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Contact
              </span>
            </div>
          </Col>
        </Row>

        {/* Modals */}
        <ContactModal show={showModal} handleClose={handleCloseModal} />
        <MapModal show={showMap} handleClose={handleCloseMap} />
      </Container>
    </footer>
  );
};

export default AppFooter;
