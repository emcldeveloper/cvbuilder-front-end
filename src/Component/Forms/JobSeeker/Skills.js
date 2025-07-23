import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditSkillsModal = ({ show, onHide }) => {
  // State for form data
  const [formData, setFormData] = useState({
    culture: [],
    personality: [],
    knowledge: [],
    software: [],
    tool: []
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

export default EditSkillsModal;