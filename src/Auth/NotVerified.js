import React, { useState } from 'react';
import { Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotVerified = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResend = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token'); // or however you store it
      await axios.post(
        '/api/resend-verification', // ✅ replace with your actual endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Verification email has been resent successfully.');
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center mt-5">
      <Alert variant="warning">
        <h3>Your account is not verified</h3>
        <p>Please check your email for the verification link.</p>
        <p>
          Didn’t receive an email?{' '}
          <Button
            variant="link"
            onClick={handleResend}
            disabled={loading}
            style={{ padding: 0 }}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  className="me-1"
                />
                Sending...
              </>
            ) : (
              'Click here to resend'
            )}
          </Button>
        </p>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Alert>

      <Button variant="primary" onClick={() => navigate('/')}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotVerified;
