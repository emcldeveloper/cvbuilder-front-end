import React from 'react';
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import { FaUser, FaPaperclip, FaEnvelope, FaFileAlt, FaShareSquare } from 'react-icons/fa';

const CompactCoverLetterForm = ({ job, notes, applicant }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={12} xl={12}>
        <Card className="border-0 rounded-2">
          <Card.Header className=" text-white border-0 rounded-top-2 py-2" style={{ backgroundColor: '#2E58A6' }}>
            <h5 className="mb-0 text-center">
              <FaFileAlt className="me-1" />
              Professional Cover Letter
            </h5>
          </Card.Header>

          <Card.Body className="p-3">
            {/* Sender/Receiver Info */}
            <div className=" pb-2 mb-2">
              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold text-muted">YOUR INFO</Form.Label>
                <div className="d-flex align-items-center">
                  <FaUser className="me-1 text-primary" />
                  <Form.Control 
                    name="name" 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="border-0 border-bottom rounded-0 ps-0"
                  />
                </div>
                <div className="d-flex align-items-center mt-2">
                  <FaEnvelope className="me-1 text-primary" />
                  <Form.Control 
                    name="from" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="border-0 border-bottom rounded-0 ps-0"
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label className="small fw-bold text-muted">RECIPIENT INFO</Form.Label>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="me-1 text-primary" />
                  <Form.Control 
                    value={job?.job_email?.email || 'Recipient Email'} 
                    readOnly 
                    className="border-0 border-bottom rounded-0 ps-0 bg-light"
                  />
                </div>
                
              </Form.Group>
            </div>

            {/* Cover Letter Content */}
            <div className="py-2">
              <p className="small text-muted mb-1">
                Re: <a href={`/job/show?slug=${job?.job_position?.slug}&jbi=${job?.encrypted_id}`} className="text-decoration-none text-muted">
                  {job?.job_position?.position_name} software developer Position
                </a>
              </p>

              <Form.Group className="mb-2">
                <Form.Control
                  as="textarea"
                  name="notes"
                  placeholder="Write your cover letter here..."
                  required
                  className="border rounded-1"
                  style={{ minHeight: '200px' }}
                  defaultValue={notes?.show_notes?.letter || ''}
                />
              </Form.Group>

              <div>
                <p className="mb-1 small">Thank you for your consideration.</p>
                <p className="mb-1 small">Best regards,</p>
                <p className="mb-0 fw-bold small">{applicant?.name || 'Maneno Halidi'}</p>
                <p className="small text-muted mb-0">{applicant?.user?.email || 'halidi@email.com'}</p>
                <p className="small text-muted">{applicant?.user?.phone1 || '+255 714059160'}</p>
              </div>
            </div>

            {/* Attachments */}
            <div className="mt-2 p-2 bg-light rounded-2">
              <h5 className="mb-1 d-flex align-items-center small">
                <FaPaperclip className="me-1 text-primary" />
                Required Attachments
              </h5>
              
              <Form.Group className="mb-1">
                <Form.Label className="small fw-bold">
                  {job?.attachmentSubscribe?.cv === 1 && job?.attachmentSubscribe?.certificate === 0 && "Attach resume (PDF/DOCX)"}
                  {job?.attachmentSubscribe?.certificate === 1 && job?.attachmentSubscribe?.cv === 1 && "Attach resume and certificates"}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control 
                  type="file" 
                  name="attachments[]" 
                  multiple 
                  accept=".pdf,.doc,.docx"
                  className="border-dashed small"
                  size="sm"
                />
                <Form.Text className="d-block small text-muted">
                  Max 5MB each. Combine files if needed.
                </Form.Text>
              </Form.Group>

              {notes && (
                <div className="mt-1">
                  <h6 className="small fw-bold">Previous applications:</h6>
                  <Form.Select size="sm" className="w-50 small">
                    <option>Select previous cover letter</option>
                  </Form.Select>
                </div>
              )}
            </div>
          </Card.Body>

          <Card.Footer className="bg-light border-0 rounded-bottom-2 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Will be sent to {job?.job_email?.email || 'hiring manager'}
              </small>
              <Button variant="primary" size="sm">
                Submit
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default CompactCoverLetterForm;