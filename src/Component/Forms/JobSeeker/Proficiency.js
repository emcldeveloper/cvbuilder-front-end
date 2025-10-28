import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import useOrganization from "../../../hooks/Universal/Organization";
import useGetProficiency from "../../../hooks/Universal/Proficiency";
import { useEffect, useState } from "react";
import useProficienceForm from "../../../hooks/Candidate/UseProficience";

const AddProficiencyModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { organization } = useOrganization();
  const { proficiency } = useGetProficiency();
  const { formData, handleChange, handleFileChange, handleSubmit, loading } =
    useProficienceForm(applicant_id);

  // Organization options
  const AllOrganizationOptions =
    organization?.map((org) => ({
      value: org.id,
      label: org.organization_name,
    })) || [];

  const [OrganizationOptions, setOrganizationOptions] = useState([]);
  useEffect(
    () => setOrganizationOptions(AllOrganizationOptions.slice(0, 10)),
    [organization]
  );
  const loadMoreOrganization = () => {
    setOrganizationOptions((prev) =>
      AllOrganizationOptions.slice(0, prev.length + 10)
    );
  };

  // Proficiency options
  const AllProficiencyOptions =
    proficiency?.map((p) => ({
      value: p.id,
      label: p.proficiency_name,
    })) || [];

  const [ProficiencyOptions, setProficiencyOptions] = useState([]);
  useEffect(
    () => setProficiencyOptions(AllProficiencyOptions.slice(0, 10)),
    [proficiency]
  );
  const loadMoreProficiency = () => {
    setProficiencyOptions((prev) =>
      AllProficiencyOptions.slice(0, prev.length + 10)
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Proficiency</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => handleSubmit(e, onHide)}
          encType="multipart/form-data"
          className="proficiency-applicant"
        >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Organization <span className="text-danger">*</span>
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
                isSearchable
                isClearable
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Proficiency <span className="text-danger">*</span>
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
                isSearchable
                isClearable
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Started <span className="text-danger">*</span>
            </Form.Label>
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended <span className="text-danger">*</span>
            </Form.Label>
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Awarded <span className="text-danger">*</span>
            </Form.Label>
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attach Certificate <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="attachment"
                 onChange={handleFileChange}
                required
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProficiencyModal;
