import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const JobsFitSection = ({ applicant, isApplicant, encryptedApplicantId }) => {
    const applicant_tag = applicant?.applicant_tag || [];
   
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
    <div className="jobs-fit-section mb-4 mt-2">
    {/* Header */}
    <Row className="align-items-center mb-3">
      <Col md={8}>
        <h6 className="mb-0"><b>LIST OF JOBS I MAY FIT</b></h6>
      </Col>
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
    </Row>
  
    <div className="divider mb-3" />
  
    {/* Jobs Display - Grouped by Industry */}
    {applicant_tag?.length > 0 ? (
      <Row className="g-0">
        {/* First group tags by industry */}
        {Object.entries(
          applicant_tag.reduce((acc, tag) => {
            if (!acc[tag.industry_name]) {
              acc[tag.industry_name] = [];
            }
            acc[tag.industry_name].push(tag);
            return acc;
          }, {})
        ).map(([industryName, tags], index) => (
          <Col md={12} key={index}>
            <Card className="border-0 ">
              <Card.Body>
              <div className="d-flex flex-column flex-md-row align-items-start">
  <div className="me-md-3 mb-1" style={{ minWidth: '150px' }}>
    <h6 className="fw-bold mb-0">{industryName}</h6>
  </div>
  <div className="flex-grow-1">
    <Row className="g-1">
      {tags.map((tag, index) => (
        <Col xs="auto" key={index}>
          <div className="personality-tag p-1 px-2">
            {tag.tag_name}
          </div>
        </Col>
      ))}
    </Row>
  </div>
</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
              name="industry_id"
              value={formData.industry_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Industry</option>
              {Array.from(new Set(applicant_tag.map(tag => tag.industry_name))).map((industry, i) => (
                <option key={i} value={applicant_tag.find(t => t.industry_name === industry)?.id}>
                  {industry}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>Job Tags <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              name="tags"
              multiple
              value={formData.tags}
              onChange={(e) => setFormData({
                ...formData, 
                tags: [...e.target.selectedOptions].map(o => o.value)
              })}
              required
              style={{ height: '150px' }}
            >
              {applicant_tag
                .filter(tag => tag.industry_id === formData.industry_id)
                .map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.tag_name}
                  </option>
                ))}
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