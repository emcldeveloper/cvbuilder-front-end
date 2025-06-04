import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { UniversalContext } from '../context/UniversalContext';
import { registerUser } from '../Api/Auth/Auth';

const RegisterModal = ({ show, onHide }) => {
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  const {
    genders = [],
    countries = [],
    regions = [],
    educationLevels = [],
    maritalStatuses = [],
    courses = [],
    majors = [],
  } = useContext(UniversalContext);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    country: '',
    region: '',
    address: '',
    educationLevel: '',
    course: '',
    major: '',
    maritalStatus: '',
    yearOfCompletion: '',
  });

  const genderOptions = genders.map((item) => ({
    value: item.id,
    label: item.gender_name,
  }));

  const maritalStatusOptions = maritalStatuses.map((item) => ({
    value: item.id,
    label: item.marital_status,
  }));

  const educationLevelOptions = educationLevels.map((item) => ({
    value: item.id,
    label: item.education_level,
  }));

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const regionOptions = (countryId) =>
    regions
      .filter((region) => region.country_id === countryId)
      .map((region) => ({ value: region.id, label: region.region_name }));

  const courseOptions = courses.map((course) => ({
    value: course.course_name,
    label: course.course_name,
  }));

  const majorOptions = majors.map((major) => ({
    value: major.name,
    label: major.name,
  }));

  const handleChange = (e, field) => {
    if (e?.target) {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    } else if (field === 'country') {
      setFormData((prev) => ({ ...prev, country: e?.value || '', region: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e?.value || '' }));
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
    try {
      const result = await registerUser(formData);
      if (result) {
        alert('Candidate registered successfully!');
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          dob: '',
          gender: '',
          country: '',
          region: '',
          address: '',
          educationLevel: '',
          course: '',
          major: '',
          maritalStatus: '',
          yearOfCompletion: '',
        });
        setShowCandidateForm(false);
        onHide();
      }
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <>
      {/* User Type Modal */}
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e, 'firstName')}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleChange(e, 'middleName')}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e, 'lastName')}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <CreatableSelect
                isClearable
                value={formData.course ? { value: formData.course, label: formData.course } : null}
                options={courseOptions}
                onChange={(e) => setFormData((prev) => ({ ...prev, course: e ? e.value : '' }))}
                placeholder="Select or create course"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Major</Form.Label>
              <CreatableSelect
                isClearable
                value={formData.major ? { value: formData.major, label: formData.major } : null}
                options={majorOptions}
                onChange={(e) => setFormData((prev) => ({ ...prev, major: e ? e.value : '' }))}
                placeholder="Select or create major"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Select
                value={genderOptions.find((opt) => opt.value === formData.gender)}
                options={genderOptions}
                onChange={(e) => handleChange(e, 'gender')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Marital Status</Form.Label>
              <Select
                value={maritalStatusOptions.find((opt) => opt.value === formData.maritalStatus)}
                options={maritalStatusOptions}
                onChange={(e) => handleChange(e, 'maritalStatus')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Education Level</Form.Label>
              <Select
                value={educationLevelOptions.find((opt) => opt.value === formData.educationLevel)}
                options={educationLevelOptions}
                onChange={(e) => handleChange(e, 'educationLevel')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year of Completion</Form.Label>
              <Form.Control
                type="number"
                value={formData.yearOfCompletion}
                onChange={(e) => handleChange(e, 'yearOfCompletion')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) => handleChange(e, 'address')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Select
                value={countryOptions.find((opt) => opt.value === formData.country)}
                options={countryOptions}
                onChange={(e) => handleChange(e, 'country')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Region</Form.Label>
              <Select
                value={regionOptions(formData.country).find((opt) => opt.value === formData.region)}
                options={regionOptions(formData.country)}
                onChange={(e) => handleChange(e, 'region')}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
