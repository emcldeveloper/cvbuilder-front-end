import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditSoftwareModal = ({ show, onHide }) => {
  // State for form data
  const [formData, setFormData] = useState({
    software: [], 
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
        <Modal.Title>SOFTWARE & TOOLS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
     <Row className="mb-3">
            <Col md={12}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>Software</Form.Label>
                <Col sm={10}>
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
                <Form.Label column sm={2}>Tools</Form.Label>
                <Col sm={10}>
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

export default EditSoftwareModal;