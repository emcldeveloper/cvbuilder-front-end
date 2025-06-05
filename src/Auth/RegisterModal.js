import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import useRegisterForm from '../hooks/Auth/useRegisterForm';

const RegisterModal = ({ show, onHide }) => {
  const {
    formData,
    setFormData,
    showCandidateForm,
    setShowCandidateForm,
    handleChange,
    handleCandidateRegister,
    genderOptions,
    maritalStatusOptions,
    educationLevelOptions,
    countryOptions,
    regionOptions = [],
    courseOptions,
    majorOptions,
  } = useRegisterForm({ onSuccess: onHide });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [localCourseOptions, setLocalCourseOptions] = useState([]);
  const [localMajorOptions, setLocalMajorOptions] = useState([]);

  const allCourseOptions = [...courseOptions, ...localCourseOptions];
  const allMajorOptions = [...majorOptions, ...localMajorOptions];

  const handleUserChoice = (type) => {
    if (type === 'employer') {
      window.location.href = 'https://ekazi.co.tz';
    } else {
      setShowCandidateForm(true);
    }
  };

  const onChangeHandler = (e, field) => {
    if (e?.target) {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    } else if (field === 'country') {
      setFormData((prev) => ({
        ...prev,
        country: e?.value || '',
        region_id: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e?.value || '',
      }));
    }
  };
 const handleSocialLogin = (platform) => {
    switch (platform) {
      case 'Google':
        window.location.href = '/auth/google';
        break;
      case 'LinkedIn':
        window.location.href = '/auth/linkedin';
        break;
      case 'Twitter':
        window.location.href = '/auth/twitter';
        break;
      default:
        break;
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordError('');
    handleCandidateRegister(e);
  };

  return (
    <>
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Registration Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button variant="primary" onClick={() => handleUserChoice('candidate')} className="me-2">
            Register as Candidate
          </Button>
          <Button variant="secondary" onClick={() => handleUserChoice('employer')}>
            Register as Employer
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showCandidateForm} onHide={() => setShowCandidateForm(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Candidate Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            {/* Personal Info */}
            <section className="mb-4">
              <h5>Personal Information</h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.firstname}
                      onChange={(e) => onChangeHandler(e, 'firstname')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="middlename">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.middlename}
                      onChange={(e) => onChangeHandler(e, 'middlename')}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.lastname}
                      onChange={(e) => onChangeHandler(e, 'lastname')}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.dob || ''}
                      onChange={(e) => onChangeHandler(e, 'dob')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      value={genderOptions.find(opt => opt.value === formData.gender) || null}
                      options={genderOptions}
                      onChange={(e) => onChangeHandler(e, 'gender')}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="maritalStatus">
                    <Form.Label>Marital Status</Form.Label>
                    <Select
                      value={maritalStatusOptions.find(opt => opt.value === formData.maritalStatus) || null}
                      options={maritalStatusOptions}
                      onChange={(e) => onChangeHandler(e, 'maritalStatus')}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* Contact */}
            <section className="mb-4">
              <h5>Contact Details</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => onChangeHandler(e, 'email')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => onChangeHandler(e, 'phone')}
                      required
                      placeholder="+255 123 456 789"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => onChangeHandler(e, 'password')}
                        required
                        isInvalid={!!passwordError}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => onChangeHandler(e, 'confirmPassword')}
                        required
                        isInvalid={!!passwordError}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* Education */}
            <section className="mb-4">
              <h5>Education</h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="education_level">
                    <Form.Label>Education Level</Form.Label>
                    <Select
                      value={educationLevelOptions.find(opt => opt.value === formData.education_level) || null}
                      options={educationLevelOptions}
                      onChange={(e) => onChangeHandler(e, 'education_level')}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="course">
                    <Form.Label>Course</Form.Label>
                    <CreatableSelect
                      isClearable
                      value={
                        formData.course_id
                          ? allCourseOptions.find(opt => opt.value === formData.course_id) || { label: formData.course_id, value: formData.course_id }
                          : null
                      }
                      options={allCourseOptions}
                      onChange={(e) => {
                        if (e && !allCourseOptions.find(opt => opt.value === e.value)) {
                          setLocalCourseOptions(prev => [...prev, e]);
                        }
                        onChangeHandler(e, 'course_id');
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="major">
                    <Form.Label>Major</Form.Label>
                    <CreatableSelect
                      isClearable
                      value={
                        formData.major
                          ? allMajorOptions.find(opt => opt.value === formData.major) || { label: formData.major, value: formData.major }
                          : null
                      }
                      options={allMajorOptions}
                      onChange={(e) => {
                        if (e && !allMajorOptions.find(opt => opt.value === e.value)) {
                          setLocalMajorOptions(prev => [...prev, e]);
                        }
                        onChangeHandler(e, 'major');
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* Address */}
            <section className="mb-4">
              <h5>Address</h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Select
                      value={countryOptions.find(opt => opt.value === formData.country) || null}
                      options={countryOptions}
                      onChange={(e) => onChangeHandler(e, 'country')}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="region_id">
                    <Form.Label>Region</Form.Label>
                    <Select
                      value={
                        regionOptions(formData.country)?.find(opt => opt.value === formData.region_id) || null
                      }
                      options={regionOptions(formData.country)}
                      onChange={(e) => onChangeHandler(e, 'region_id')}
                      isDisabled={!formData.country}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address}
                      onChange={(e) => onChangeHandler(e, 'address')}
                      placeholder="Street address, P.O. box, etc."
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>

 
 <div className="text-center mb-2">Or login with</div>
            <Row className="mb-3 text-center">
              <Col>
                <Button
                  variant="outline-danger"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-100 mb-2"
                >
                  <FaGoogle className="me-2" /> Google
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="w-100 mb-2"
                >
                  <FaLinkedin className="me-2" /> LinkedIn
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-info"
                  onClick={() => handleSocialLogin('Twitter')}
                  className="w-100"
                >
                  <FaTwitter className="me-2" /> Twitter
                </Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="text-end">
                <Button variant="secondary" onClick={() => setShowCandidateForm(false)} className="me-2">
                  Back
                </Button>
                <Button type="submit" variant="primary">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
