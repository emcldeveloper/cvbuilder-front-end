import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddTrainingModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Training & Workshop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form 
          method="POST" 
      
          encType="multipart/form-data" 
          className="training-applicant"
        >
          <input type="hidden" name="id" value="" />
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Training Name<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="training_name" 
                className="select_trining"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Institution<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="institution" 
                className="select_institution"
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

export default AddTrainingModal;