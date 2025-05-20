import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const JobsFitSection = ({ applicant, isApplicant, encryptedApplicantId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    industry: '',
    jobs: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Then close modal
    setShowAddModal(false);
  };

  return (
    <div className="jobs-fit-section mb-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col md={8}>
          <h5 className="text-orange mb-0"><b>LIST OF JOBS I MAY FIT</b></h5>
        </Col>
        {isApplicant && (
          <Col md={4} className="d-flex justify-content-end">
            <Button 
              variant="link" 
              className="text-dark p-0 me-3"
              onClick={() => setShowAddModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Button>
            <a 
              href={`getIndustryJobsFit-detail?jbl=${encryptedApplicantId}`} 
              className="text-dark"
              style={{ textDecoration: 'none' }}
            >
              <FontAwesomeIcon icon={faPencilAlt} size="lg" />
            </a>
          </Col>
        )}
      </Row>

      <div className="divider mb-3" />

      {/* Jobs Display - Box Design */}
      {applicant?.tagIndustries?.length > 0 ? (
        <Row className="g-3">
          {applicant.tagIndustries.map((industry, index) => {
            // Get unique tags for this industry
            const uniqueTags = [...new Set(
              industry.applicant_tags
                .filter(tag => tag.industry_id === industry.id && tag.applicant_id === applicant.id)
                .map(tag => tag.tag_name)
            )];
            
            return (
              <Col md={12} key={index}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="mb-2 mb-md-0 me-md-3" style={{ minWidth: '150px' }}>
                        <h6 className="fw-bold mb-0">{industry.industry_name}</h6>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap gap-2">
                          {uniqueTags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              pill
                              bg="light" 
                              text="dark"
                              className="p-2 d-flex align-items-center"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="text-muted">No job matches added yet</p>
      )}

      {/* Add Jobs Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jobs I May Fit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Industry <span className="text-danger">*</span></Form.Label>
              <Form.Select 
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Industry</option>
                {/* Populate with your industries */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job Names <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="select"
                name="jobs"
                multiple
                value={formData.jobs}
                onChange={(e) => setFormData({...formData, jobs: [...e.target.selectedOptions].map(o => o.value)})}
                required
                style={{ height: '150px' }}
              >
                {/* Populate with your jobs */}
                <option value="job1">Job 1</option>
                <option value="job2">Job 2</option>
              </Form.Control>
              <Form.Text className="text-muted">
                Hold Ctrl/Cmd to select multiple jobs
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .text-orange {
          color: orange;
        }
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
      `}</style>
    </div>
  );
};

export default JobsFitSection;