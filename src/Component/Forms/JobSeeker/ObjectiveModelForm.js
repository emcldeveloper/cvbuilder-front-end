import React, { useEffect, useState } from "react";
import {
  Modal, Form, Button
} from 'react-bootstrap';
import Swal from "sweetalert2";
import { createCreerObjective } from "../../../Api/Jobseeker/JobSeekerProfileApi";

const ObejctiveModelForm = ({ isOpen, onClose, onSubmit, applicant }) => {
  const [objective, setObjective] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const applicant_id = localStorage.getItem("applicantId");

  // Initialize objective when applicant changes
  useEffect(() => {
    setObjective(applicant?.objective?.objective || '');
  }, [applicant]);
  console.log("applicatnt data 2025", applicant);
  // Update char counter when objective changes
  useEffect(() => {
    setCharCount(objective.length);
  }, [objective]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!objective.trim()) {
      setError("Objective is required.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const sendData = {
        "objective": objective
      };
      console.log("career object is 2025 -2026 now", objective);
      const response = await createCreerObjective(applicant_id, sendData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response.data.success,
          icon: "success",
        });

      }
      // Close modal after saving
      onClose();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Career Objectives</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="objectiveTextarea">
            <Form.Label>
              Career Objective <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              maxLength={300}
              placeholder="Start typing..."
              style={{
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: 'inset 0 0 0.25rem #ddd'
              }}
            />
            <div className="text-end mt-2">
              <small className="text-muted">
                <span>{charCount}</span>
                <span>/ 300</span>
              </small>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            disabled={isSubmitting || !objective.trim()}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ObejctiveModelForm;
