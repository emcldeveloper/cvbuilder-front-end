import React from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Container,
} from 'react-bootstrap';
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
    errorInfo, // ✅ Add this
  } = useLoginForm(onHide);

  return (
    <>
      {/* Select Login Type */}
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
      
               <Modal.Title as="h5" className="modal-title">
        Select Login Type
</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            variant="primary"
            onClick={() => handleUserChoice('candidate')}
            className="me-2"
          >
            Login as JobSeeker
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleUserChoice('employer')}
          >
            Login as Employer
          </Button>
        </Modal.Body>
      </Modal>

      {/* JobSeeker Login */}
      <Modal
        show={showCandidateForm}
        onHide={() => setShowCandidateForm(false)}
        centered
      >
        <Modal.Header closeButton>
        <Modal.Title as="h5" className="modal-title">
         JobSeeker Login 
</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-center mb-3">
            <span
              className="bg-light text-dark text-center px-4 py-2"
              style={{ fontSize: '20px', borderRadius: '5px' }}
            >
              Welcome to eKazi Portal
            </span>
          </Container>

          <Form onSubmit={handleLogin} id="login_User">
            {errorInfo && (
              <div className="text-danger text-center mb-3">{errorInfo}</div>
            )}

            <Form.Group controlId="email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="form-lg user_email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-lg user_password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              className="text-light form-lg bntLogin mb-3 w-100"
              style={{ backgroundColor: '#D36314' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <hr />

            <div className="text-center mb-3">
              <span className="d-block mb-2">Sign in with:</span>
              <Button
                href="/login/linkedin-openid"
                className="btn-sm me-2 text-white"
                style={{ backgroundColor: '#00acee' }}
              >
                <FaLinkedin />
              </Button>
              <Button
                href="/login/google"
                className="btn-sm me-2 text-white"
                style={{ backgroundColor: '#db4437' }}
              >
                <FaGoogle />
              </Button>
              <Button
                href="/login/twitter"
                className="btn-sm text-white"
                style={{ backgroundColor: '#1da1f2' }}
              >
                <FaTwitter />
              </Button>
            </div>

            <hr />

  <Row className="text-center py-3">
  <Col md={6} className="mb-3">
    <p className="mb-2 text-muted">Forgot your password?</p>
    <Button
      variant="outline-primary"
      className="px-3 py-1 rounded-pill"
      href="/reset"
    >
      Reset Password
    </Button>
  </Col>
  <Col md={6} className="mb-3">
    <p className="mb-2 text-muted">New to <strong>eKazi</strong>?</p>
    <Button
      variant="outline-primary"
      className="px-3 py-1 rounded-pill"
      onClick={() => {
        setShowCandidateForm(false);
        // Optionally trigger registration modal here
      }}
    >
      Register
    </Button>
  </Col>
</Row>



            <hr />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
