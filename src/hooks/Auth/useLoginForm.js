// hooks/useLoginForm.js
import { useState } from 'react';
import { loginUser } from '../../Api/Auth/Auth';

const useLoginForm = (onHide) => {
  const [userType, setUserType] = useState('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserChoice = (type) => {
    if (type === 'employer') {
      window.location.href = 'https://ekazi.co.tz/login';
      onHide();
    } else {
      setShowCandidateForm(true);
    }
  };

const handleLogin = async (e) => {
  e.preventDefault();

  if (userType === 'candidate') {
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);

      if (data.access_token) {
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('role_id', data.role_id);
        localStorage.setItem('verified', data.verified);
        localStorage.setItem('applicantId', data.applicant_id);

        setShowCandidateForm(false);
        onHide();

      
          window.location.href = '/jobseeker/dashboard';
        
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }
};
  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} clicked`);
  };

  return {
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
  };
};

export default useLoginForm;
