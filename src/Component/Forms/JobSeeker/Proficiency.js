import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddProficiencyModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Proficiency</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form 
          method="POST" 
        
          encType="multipart/form-data" 
          className="proficiency-applicant"
        >
          <input type="hidden" name="id" value="" />
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Organization / Institution <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="organization" 
                className="select_organization"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Proficiency<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="proficiency" 
                className="select_proficiency"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Started<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                type="date" 
                name="started" 
                required 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                type="date" 
                name="ended" 
                required 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Awarded<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                type="text" 
                name="award" 
                required 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attach Certificate<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                type="file" 
                name="attachment" 
                required 
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProficiencyModal;