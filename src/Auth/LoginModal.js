import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { loginUser } from '../Api/Auth/Auth';

const LoginModal = ({ show, onHide }) => {
  const [userType, setUserType] = useState('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handles the user's choice of login type (candidate or employer)
  const handleUserChoice = (type) => {
    if (type === 'employer') {
      window.location.href = 'https://ekazi.co.tz/login'; // Redirect to Ekazi login page
      onHide(); // Close the modal when redirecting to the employer login page
    } else {
      setShowCandidateForm(true); // Show the candidate login form
    }
  };

  // Handle the candidate login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (userType === 'candidate') {
      setIsLoading(true); // Set loading state to true

      try {
        const data = await loginUser(email, password);

        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          alert('Login successful!');
          setShowCandidateForm(false);
          onHide(); // Close modal
          
          // Redirect to candidate dashboard
          window.location.href = '/applicant/dashboard'; 
        } else {
          alert('Invalid login credentials');
        }
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      } finally {
        setIsLoading(false); // Set loading state back to false after the login attempt
      }
    }
  };

  // Handle social login (Google, LinkedIn, Twitter)
  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} clicked`);
  };

  return (
    <>
      {/* User Type Selection Modal */}
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Login Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            variant="primary"
            onClick={() => handleUserChoice('candidate')}
            className="me-2"
          >
            Login as Candidate
          </Button>
          <Button variant="secondary" onClick={() => handleUserChoice('employer')}>
            Login as Employer
          </Button>
        </Modal.Body>
      </Modal>

      {/* Candidate Login Form Modal */}
      <Modal show={showCandidateForm} onHide={() => setShowCandidateForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Candidate Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                'Login'
              )}
              {isLoading && ' Logging in...'}
            </Button>
          </Form>

          <hr />

          <div className="text-center mb-2">Or login with</div>

          <Row className="mb-3 text-center">
            <Col>
              <Button
                variant="outline-danger"
                onClick={() => handleSocialLogin('Google')}
                className="w-100 mb-2"
              >
                <FaGoogle className="me-2" />
                Google
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => handleSocialLogin('LinkedIn')}
                className="w-100 mb-2"
              >
                <FaLinkedin className="me-2" />
                LinkedIn
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-info"
                onClick={() => handleSocialLogin('Twitter')}
                className="w-100"
              >
                <FaTwitter className="me-2" />
                Twitter
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>Hello</Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
