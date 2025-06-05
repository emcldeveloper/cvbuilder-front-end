import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import useLoginForm from '../hooks/Auth/useLoginForm';

const LoginModal = ({ show, onHide }) => {
  const {
    email,
    password,
    isLoading,
    showCandidateForm,
    setEmail,
    setPassword,
    setShowCandidateForm,
    handleUserChoice,
    handleLogin,
    handleSocialLogin,
  } = useLoginForm(onHide);

  return (
    <>
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Login Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button variant="primary" onClick={() => handleUserChoice('candidate')} className="me-2">
            Login as JobSeeker
          </Button>
          <Button variant="secondary" onClick={() => handleUserChoice('employer')}>
            Login as Employer
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showCandidateForm} onHide={() => setShowCandidateForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>JobSeeker Login</Modal.Title>
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
              {isLoading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Login'}
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
