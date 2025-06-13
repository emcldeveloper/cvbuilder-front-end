// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RegisterModal from '../../Auth/RegisterModal';
import LoginModal from '../../Auth/LoginModal';

const AppHeader = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');

    // Update login state
    setIsLoggedIn(false);

    // Redirect to homepage
    window.location.href = '/';
  };

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
              <Nav.Link href="/pricelists" className="text-primary">Pricing</Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              {isLoggedIn ? (
                <>
                  <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowRegisterModal(true)} className="text-primary">Register</Nav.Link>
                  <span className="mx-2">|</span>
                  <Nav.Link onClick={() => setShowLoginModal(true)} className="text-primary">Login</Nav.Link>
                </>
              )}
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

      {/* Modals */}
      <RegisterModal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
      <LoginModal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal(false);
          // Check token again after modal closes to see if user logged in
          setIsLoggedIn(!!localStorage.getItem('auth_token'));
        }}
      />
    </>
  );
};

export default AppHeader;
