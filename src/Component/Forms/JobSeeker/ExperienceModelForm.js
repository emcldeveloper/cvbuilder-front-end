import React from "react";
import React, { useState, useEffect } from "react";
import { 
  Card, Button, Modal, Form, Row, Col, 
  ListGroup, Badge, Spinner, Alert
} from "react-bootstrap";
import { Pencil, Trash, EyeSlash } from "react-bootstrap-icons";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
const ExperienceModelMform =()=>{
return (
    <div>
        {/* Add Experience Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              {/* Employer */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employer <span className="text-danger">*</span></Form.Label>
                  <Employers onSelect={(val) => handleSelectChange("employer", val)} />
                </Form.Group>
              </Col>

              {/* Location */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sub Location <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="sub_location"
                    value={formData.sub_location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Country/Region */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                  <Country onSelect={(val) => handleSelectChange("country", val)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Region <span className="text-danger">*</span></Form.Label>
                  <Region onSelect={(val) => handleSelectChange("region", val)} />
                </Form.Group>
              </Col>

              {/* Position */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Position <span className="text-danger">*</span></Form.Label>
                  <Positions onSelect={(val) => handleSelectChange("position", val)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Position Level <span className="text-danger">*</span></Form.Label>
                  <PositionLevel onSelect={(val) => handleSelectChange("position_level", val)} />
                </Form.Group>
              </Col>

              {/* Industry */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Industry <span className="text-danger">*</span></Form.Label>
                  <Industries onSelect={(val) => handleSelectChange("industry", val)} />
                </Form.Group>
              </Col>

              {/* Duration */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="started"
                    value={formData.started}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="I currently work here"
                    checked={isCurrentRole}
                    onChange={handleCheckboxChange}
                    className="mt-4"
                  />
                  {!isCurrentRole && (
                    <>
                      <Form.Label>End Date <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="ended"
                        value={formData.ended}
                        onChange={handleChange}
                        required={!isCurrentRole}
                      />
                    </>
                  )}
                </Form.Group>
              </Col>

              {/* Salary */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Salary <span className="text-danger">*</span></Form.Label>
                  <SalaryRange onSelect={(val) => handleSelectChange("start_salary", val)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Salary <span className="text-danger">*</span></Form.Label>
                  <SalaryRange onSelect={(val) => handleSelectChange("end_salary", val)} />
                </Form.Group>
              </Col>

              {/* Responsibility */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Responsibilities <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Reason for leaving */}
              {!isCurrentRole && (
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Reason for Leaving</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="remark"
                      value={formData.remark}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* Edit Experience Modal */}
      {editData && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Experience</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(editData.id, editData);
          }}>
            <Modal.Body>
              {/* Similar form fields as Add Modal, but populated with editData */}
              {/* You would map through the same fields but with editData values */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Changes"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
)
}
export default ExperienceModelMform;