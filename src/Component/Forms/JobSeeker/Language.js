 import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddLanguageModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Language</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form   className="language-applicant">
    
          <input type="hidden" name="id" value="" />
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Language
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="language" 
                className="select_language"
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Read<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="read" 
                required
              >
                <option value="">Select Read Ability</option>
                {/* {Universal.readAbilities().map(data => (
                  <option key={data.id} value={data.id}>{data.read_ability}</option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Write<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="write" 
                required
              >
                <option value="">Select Write Ability</option>
                {/* {Universal.writeAbilities().map(data => (
                  <option key={data.id} value={data.id}>{data.write_ability}</option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Speak<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="speak" 
                required
              >
                <option value="">Select Speak Ability</option>
                {/* {Universal.speakAbilities().map(data => (
                  <option key={data.id} value={data.id}>{data.speak_ability}</option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Understand<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="understand" 
                required
              >
                <option value="">Select Understand Ability</option>
                {/* {Universal.understandAbilities().map(data => (
                  <option key={data.id} value={data.id}>{data.understand_ability}</option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddLanguageModal;