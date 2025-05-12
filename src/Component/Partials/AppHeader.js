// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RegisterModal from '../../Auth/RegisterModal';
import LoginModal from '../../Auth/LoginModal';

const AppHeader = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          zIndex: 1020,
          backgroundColor: '#DFE3E2',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="eKazi" width="120" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ekazi-navbar" />
          <Navbar.Collapse id="ekazi-navbar" className="w-100">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="text-primary">Home</Nav.Link>
              <Nav.Link href="/jobs" className="text-primary">Find Jobs</Nav.Link>
              <Nav.Link href="/employers" className="text-primary">Employers</Nav.Link>
              <Nav.Link href="/cv-builder" className="text-primary">CV Builder</Nav.Link>
              <Nav.Link href="/salary-calculator" className="text-primary">Salary Calculator</Nav.Link>
              <Nav.Link href="/pricing" className="text-primary">Pricing</Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              <Nav.Link onClick={() => setShowRegisterModal(true)} className="text-primary">Register</Nav.Link>
              <span className="mx-2">|</span>
              <Nav.Link onClick={() => setShowLoginModal(true)} className="text-primary">Login</Nav.Link>
              <Nav.Link href="/post-job">
                <a
                  href="/post-job"
                  className="btn mx-auto"
                  style={{
                    backgroundColor: '#D36314',
                    color: '#fff',
                    padding: '0.5rem 1.5rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Post Job
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RegisterModal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </>
  );
};

export default AppHeader;
