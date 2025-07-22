 import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const AddWorkExperienceModal = ({ show, onHide }) => {
  const [currentRole, setCurrentRole] = useState(false);
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);

  const toggleCurrentRole = () => {
    setCurrentRole(!currentRole);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form   className="experience_applicant">
          
          <input type="hidden" name="id" value="" />
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Employer<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="employer" 
                className="select_employer"
                required
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Location<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={4}>
                  <Form.Label>Country / State<span className="text-danger">*</span></Form.Label>
                  <Form.Select 
                    name="country" 
                    className="country"
                    required
                  >
                    <option value="">Select country</option>
                    {/* {Universal.countries().map(data => (
                      <option key={data.id} value={data.name}>{data.name}</option>
                    ))} */}
                  </Form.Select>
                </Col>
                
                <Col md={4}>
                  <Form.Label>Region / City<span className="text-danger">*</span></Form.Label>
                  <Form.Select 
                    name="region" 
                    className="region"
                    required
                  >
                    <option value="">Select regions</option>
                    {/* {Universal.regions().map(data => (
                      <option key={data.id} value={data.region_name}>{data.region_name}</option>
                    ))} */}
                  </Form.Select>
                </Col>
                
                <Col md={4}>
                  <Form.Label>Sub Location<span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text" 
                    name="sub_location" 
                    className="sub_location"
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Position<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={7}>
                  <Form.Select 
                    name="position" 
                    className="select_position"
                    required
                  >
                    {/* Options will be loaded dynamically */}
                  </Form.Select>
                </Col>
                
                <Col md={5}>
                  <Form.Select 
                    name="level" 
                    required
                  >
                    <option value="">Select Level</option>
                    {/* {Universal.getPositionLevels().map(data => (
                      <option key={data.id} value={data.id}>{data.position_name}</option>
                    ))} */}
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Industry <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="industry" 
                className="select_industry"
                required
                onChange={(e) => setShowCustomIndustry(e.target.value === 'other')}
              >
                {/* Options will be loaded dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>

          {showCustomIndustry && (
            <Form.Group as={Row} className="mb-3 custom-industry-container">
              <Form.Label column sm={3}>
                Please specify <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  id="custom-industry" 
                  name="custom_industry" 
                  className="custom-industry"
                  required
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={3}>
              Duration<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row className="mb-2">
                <Col md={12}>
                  <Form.Check 
                    type="checkbox"
                    id="currentRoleCheckbox"
                    label="I am currently working in this role"
                    onChange={toggleCurrentRole}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label>Started<span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="date" 
                    name="started" 
                    className="input-sm"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Ended<span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="date" 
                    name="ended" 
                    className="input-sm"
                    disabled={currentRole}
                    required={!currentRole}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Salary Range from <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={4}>
              <Form.Select 
                name="start_salary" 
                required
              >
                <option value="">Select salary Range</option>
                {/* {Universal.salaryRanges().map(data => (
                  <option key={data.id} value={data.id}>{data.low}</option>
                ))} */}
              </Form.Select>
            </Col>
            <Form.Label column sm={1}>
              To <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={4}>
              <Form.Select 
                name="end_salary" 
                required
              >
                <option value="">Select salary Range</option>
                {/* {Universal.salaryRanges().map(data => (
                  <option key={data.id} value={data.id}>{data.low}</option>
                ))} */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Responsibility<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                as="textarea" 
                name="responsibility" 
                style={{ height: '100px' }}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Reason for Leaving <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
                as="textarea" 
                name="remark" 
                style={{ height: '100px' }}
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

export default AddWorkExperienceModal;