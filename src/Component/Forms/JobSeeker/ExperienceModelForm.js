import React, { useState, useEffect } from "react";
import {
  Card, Button, Modal, Form, Row, Col,
  ListGroup, Badge, Spinner, Alert
} from "react-bootstrap";
import { Pencil, Trash, EyeSlash } from "react-bootstrap-icons";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
const ExperienceModelMform = (isOpen, onClose, isEditMode = false) => {

  return (

    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Experience</Modal.Title>
      </Modal.Header>
      <Form

      >
        <Modal.Body>
          <Row className="g-3">
            {/* Employer */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Employer <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>

            {/* Location */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Sub Location <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="sub_location"
                  // value={formData.sub_location}
                  // onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Country/Region */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Country <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Region <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>

            {/* Position */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Position <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Position Level <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>

            {/* Industry */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Industry <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>

            {/* Duration */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Date <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  name="started"

                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I currently work here"

                  className="mt-4"
                />
                {
                  // !isCurrentRole && (
                  <>
                    <Form.Label>End Date <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="ended"


                    />
                  </>
                  // )
                }
              </Form.Group>
            </Col>

            {/* Salary */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Salary <span className="text-danger">*</span></Form.Label>

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Salary <span className="text-danger">*</span></Form.Label>

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

                  required
                />
              </Form.Group>
            </Col>

            {/* Reason for leaving */}
            {
              // !isCurrentRole && (
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Reason for Leaving</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="remark"

                  />
                </Form.Group>
              </Col>
              // )
            }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"

          >
            Close
          </Button>
          <Button variant="primary" type="submit"

          >
            {/* {isLoading ? "Saving..." : "Save Changes"} */}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>




  )
}
export default ExperienceModelMform;