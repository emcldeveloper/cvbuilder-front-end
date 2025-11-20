import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import useOrganization from "../../../hooks/Universal/Organization";
import useGetProficiency from "../../../hooks/Universal/Proficiency";
import { useEffect, useState } from "react";
import useProficienceForm from "../../../hooks/Candidate/UseProficience";

const AddProficiencyModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { organization } = useOrganization();
  const { proficiency } = useGetProficiency();

  
  const {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    loading,
  } = useProficienceForm(applicant_id, editData);

  console.log("check the current date ",formData);

  // ------------ ORGANIZATION OPTIONS WITH LAZY LOADING --------------
  const AllOrganizationOptions =
    organization?.map((org) => ({
      value: org.id,
      label: org.organization_name,
    })) || [];

  const [OrganizationOptions, setOrganizationOptions] = useState([]);
  useEffect(() => {
    setOrganizationOptions(AllOrganizationOptions.slice(0, 10));
  }, [organization]);

  const loadMoreOrganization = () => {
    setOrganizationOptions((prev) =>
      AllOrganizationOptions.slice(0, prev.length + 10)
    );
  };

  // ------------- PROFICIENCY OPTIONS ----------------
  const AllProficiencyOptions =
    proficiency?.map((p) => ({
      value: p.id,
      label: p.proficiency_name,
    })) || [];

  const [ProficiencyOptions, setProficiencyOptions] = useState([]);
  useEffect(() => {
    setProficiencyOptions(AllProficiencyOptions.slice(0, 10));
  }, [proficiency]);

  const loadMoreProficiency = () => {
    setProficiencyOptions((prev) =>
      AllProficiencyOptions.slice(0, prev.length + 10)
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {formData.id ? "Edit Proficiency" : "Add Proficiency"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={(e) => handleSubmit(e, onHide)}
          encType="multipart/form-data"
        >
          {/* ORGANIZATION */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Organization *
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="organization"
                options={OrganizationOptions}
                value={
                  OrganizationOptions.find(
                    (opt) => opt.value === formData.organization
                  ) || null
                }
                onMenuScrollToBottom={loadMoreOrganization}
                placeholder="Select organization ..."
                onChange={(selected) =>
                  handleChange("organization", selected?.value || "")
                }
                isClearable
              />
            </Col>
          </Form.Group>

          {/* PROFICIENCY */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Proficiency *
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="proficiency"
                options={ProficiencyOptions}
                value={
                  ProficiencyOptions.find(
                    (opt) => opt.value === formData.proficiency
                  ) || null
                }
                onMenuScrollToBottom={loadMoreProficiency}
                placeholder="Select proficiency ..."
                onChange={(selected) =>
                  handleChange("proficiency", selected?.value || "")
                }
                isClearable
              />
            </Col>
          </Form.Group>

          {/* STARTED */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Started *</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="started"
                value={formData.started}
                onChange={(e) => handleChange("started", e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          {/* ENDED */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Ended *</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="ended"
                value={formData.ended}
                onChange={(e) => handleChange("ended", e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          {/* AWARD */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Award *</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="award"
                value={formData.award}
                onChange={(e) => handleChange("award", e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          {/* FILE UPLOAD */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attachment{" "}
              {!formData.id && <span className="text-danger">*</span>}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleFileChange}
                required={!formData.id}
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading
                ? formData.id
                  ? "Updating..."
                  : "Saving..."
                : formData.id
                ? "Update"
                : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProficiencyModal;
