import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createCreerProfile } from "../../../Api/Jobseeker/JobSeekerProfileApi";
import Swal from "sweetalert2";


const ObjectiveModelForm = ({ isOpen, onClose, onSubmit, applicant }) => {
  const [career, setCareer] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const applicant_id = localStorage.getItem("applicantId");


  // Initialize data when applicant changes
  useEffect(() => {
    if (applicant?.careers?.length > 0) {
      setCareer(applicant.careers[0].career); // ✅ pick the first career string
    } else {
      setCareer("");
    }
  }, [applicant]);

  // Character count
  useEffect(() => {
    setCharCount(career.length);
  }, [career]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!career.trim()) {
      setError("Career objective is required.");
      return;
    }
    setError(null);
      setIsSubmitting(true);
    try {
       const sendData={
        "career":career
       };
      console.log("career object is 2025 now", career);
    const response = await createCreerProfile(applicant_id ,sendData);
          if (response.status === 200) {
              Swal.fire({
                title: "Success!",
                text: response.data.success,
                icon: "success",
              });
              
            }

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
        <Modal.Title className="fs-5">Career Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="careerTextarea">
            <Form.Label>
              Career Profile <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              maxLength={1000}
              placeholder="Start typing..."
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 0 0.25rem #ddd",
              }}
            />
            <div className="text-end mt-2">
              <small className="text-muted">
                {charCount} / 1000
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
            disabled={isSubmitting || !career.trim()}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ObjectiveModelForm;
