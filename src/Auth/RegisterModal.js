import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { registerUser } from '../Api/Auth/Auth';

const RegisterModal = ({ show, onHide }) => {
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  // Static dropdown data
  const educationLevels = [
    "Certificate",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
  ];

  const courses = [
    "Computer Science",
    "Business Administration",
    "Education",
    "Engineering",
    "Law",
  ];

  const specializations = [
    "Software Development",
    "Finance",
    "Human Resource",
    "Marketing",
    "Civil Engineering",
  ];

  const countryList = ["Tanzania", "Kenya", "Uganda"];
  const regionList = {
    Tanzania: ["Dar es Salaam", "Arusha", "Mwanza", "Mbeya"],
    Kenya: ["Nairobi", "Mombasa", "Kisumu"],
    Uganda: ["Kampala", "Gulu", "Entebbe"]
  };

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    dob: '',
    gender: '',
    country: '',
    region: '',
    city: '',
    address: '',
    educationLevel: '',
    course: '',
    specialization: '',
    yearOfCompletion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset region if country changes
    if (name === 'country') {
      setFormData(prev => ({ ...prev, country: value, region: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUserChoice = (type) => {
    if (type === 'employer') {
      window.location.href = 'https://ekazi.co.tz';
    } else {
      setShowCandidateForm(true);
    }
  };

 const handleCandidateRegister = async (e) => {
  e.preventDefault();
  console.log('Submitted data:', formData);

  try {
    const result = await registerUser(formData); // Wait for API response

    if (result) {
      alert('Candidate registered successfully!');
      setShowCandidateForm(false);
      onHide();
    }
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
};

  const handleSocialRegister = (provider) => {
    alert(`Register with ${provider} clicked`);
  };

  return (
    <>
      {/* User Type Selection Modal */}
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

      {/* Candidate Registration Modal */}
      <Modal show={showCandidateForm} onHide={() => setShowCandidateForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Candidate Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCandidateRegister}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Select name="country" value={formData.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    {countryList.map((country, idx) => (
                      <option key={idx} value={country}>{country}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select name="region" value={formData.region} onChange={handleChange} required>
                    <option value="">Select Region</option>
                    {(regionList[formData.country] || []).map((region, idx) => (
                      <option key={idx} value={region}>{region}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>

            <hr />
            <h5>Education</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Education Level</Form.Label>
                  <Form.Select name="educationLevel" value={formData.educationLevel} onChange={handleChange} required>
                    <option value="">Select Education Level</option>
                    {educationLevels.map((level, idx) => (
                      <option key={idx} value={level}>{level}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Select name="course" value={formData.course} onChange={handleChange} required>
                    <option value="">Select Course</option>
                    {courses.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialized In</Form.Label>
                  <Form.Select name="specialization" value={formData.specialization} onChange={handleChange} required>
                    <option value="">Select Specialization</option>
                    {specializations.map((spec, idx) => (
                      <option key={idx} value={spec}>{spec}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Year of Completion</Form.Label>
                  <Form.Control
                    type="number"
                    name="yearOfCompletion"
                    value={formData.yearOfCompletion}
                    onChange={handleChange}
                    placeholder="e.g. 2022"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="w-100 mt-2">
              Register
            </Button>
          </Form>

          <hr />
          <div className="text-center mb-2">Or register with</div>
          <Row className="text-center mb-3">
            <Col>
              <Button variant="outline-danger" onClick={() => handleSocialRegister('Google')} className="w-100 mb-2">
                <FaGoogle className="me-2" /> Google
              </Button>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={() => handleSocialRegister('LinkedIn')} className="w-100 mb-2">
                <FaLinkedin className="me-2" /> LinkedIn
              </Button>
            </Col>
            <Col>
              <Button variant="outline-info" onClick={() => handleSocialRegister('Twitter')} className="w-100">
                <FaTwitter className="me-2" /> Twitter
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
