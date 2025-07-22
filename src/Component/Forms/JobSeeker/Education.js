import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddEducationModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Education</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form   encType="multipart/form-data" className="education-applicant">
          <input type="hidden" name="id" value="" />
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Level<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select name="level" required>
                <option value="">Select</option>
                {/* {Universal.getEducationLevels().map(level => (
                  <option key={level.id} value={level.id}>
                    {level.education_level}
                  </option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              College / University<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="college" 
                className="select_college22"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Course<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="course" 
                className="select_course"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Major/Specialized In<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="major_id" 
                className="select_major_data"
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
                accept=".pdf" 
                required
              />
              <Form.Text className="text-muted">
                PDF format is the only acceptable format max size: 5120 KB.
              </Form.Text>
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit" id="myButton">
              Save changes
              <span className="spinner-border spinner-border-sm ms-2 d-none" role="status" aria-hidden="true"></span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEducationModal;