import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditPersonalityModal = ({ show, onHide }) => {
  // State for form data
  const [formData, setFormData] = useState({
    personality: [],
    
  });

  const handleSelectChange = (e) => {
    const options = [...e.target.options];
    const selectedValues = options
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData({
      ...formData,
      [e.target.name]: selectedValues
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Skills-No best title specified yet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Culture</Form.Label>
                <Col sm={9}>
                  <Form.Select 
                    name="culture"
                    multiple 
                    className="select2 tokenizer tokenizationSelect2 tokenizer"
                    onChange={handleSelectChange}
                    value={formData.culture}
                  >
                    {/* Example options - replace with your actual data */}
                    <option value="1">Culture 1</option>
                    <option value="2">Culture 2</option>
                    <option value="3">Culture 3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Personalities</Form.Label>
                <Col sm={9}>
                  <Form.Select 
                    name="personality"
                    multiple 
                    className="tokenizationSelect2 tokenizer form-control select2 tokenizer"
                    onChange={handleSelectChange}
                    value={formData.personality}
                  >
                    <option value="1">Personality 1</option>
                    <option value="2">Personality 2</option>
                    <option value="3">Personality 3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Skills & Knowledge</Form.Label>
                <Col sm={9}>
                  <Form.Select 
                    name="knowledge"
                    multiple 
                    className="tokenizationSelect2 tokenizer form-control select2 tokenizer"
                    onChange={handleSelectChange}
                    value={formData.knowledge}
                  >
                    <option value="1">Skill 1</option>
                    <option value="2">Skill 2</option>
                    <option value="3">Skill 3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Software</Form.Label>
                <Col sm={9}>
                  <Form.Select 
                    name="software"
                    multiple 
                    className="tokenizationSelect2 tokenizer form-control select2 tokenizer"
                    onChange={handleSelectChange}
                    value={formData.software}
                  >
                    <option value="1">Software 1</option>
                    <option value="2">Software 2</option>
                    <option value="3">Software 3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Tools</Form.Label>
                <Col sm={9}>
                  <Form.Select 
                    name="tool"
                    multiple 
                    className="tokenizationSelect2 tokenizer form-control select2 tokenizer"
                    onChange={handleSelectChange}
                    value={formData.tool}
                  >
                    <option value="1">Tool 1</option>
                    <option value="2">Tool 2</option>
                    <option value="3">Tool 3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPersonalityModal;