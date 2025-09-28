import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import useLanguageForm from "../../../hooks/Candidate/useLanguageForm";

const AddLanguageModal = ({ show, onHide, onSave, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    AllLanguageOptions,
    AllReadLanguageOptions,
    AllWriteLanguageOptions,
    AllSpeakLanguageOptions,
    AllUnderstandLanguageOptions,
  } = useLanguageForm(editData, applicant_id, onSave);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {formData.id ? "Edit Language" : "Add Language"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="language-applicant" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.id || ""} />

          {/* Language */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Language</Form.Label>
            <Col sm={9}>
              <Select
                name="language"
                options={AllLanguageOptions}
                value={formData.language}
                onChange={(selected) => handleChange("language", selected)}
                placeholder="Select language ..."
                isSearchable
              />
            </Col>
          </Form.Group>

          {/* Read */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Read<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="read"
                options={AllReadLanguageOptions}
                value={formData.read}
                onChange={(selected) => handleChange("read", selected)}
                placeholder="Select read ability ..."
                isSearchable
              />
            </Col>
          </Form.Group>

          {/* Write */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Write<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="write"
                options={AllWriteLanguageOptions}
                value={formData.write}
                onChange={(selected) => handleChange("write", selected)}
                placeholder="Select write ability ..."
                isSearchable
              />
            </Col>
          </Form.Group>

          {/* Speak */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Speak<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="speak"
                options={AllSpeakLanguageOptions}
                value={formData.speak}
                onChange={(selected) => handleChange("speak", selected)}
                placeholder="Select speak ability ..."
                isSearchable
              />
            </Col>
          </Form.Group>

          {/* Understand */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Understand<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="understand"
                options={AllUnderstandLanguageOptions}
                value={formData.understand}
                onChange={(selected) => handleChange("understand", selected)}
                placeholder="Select understand ability ..."
                isSearchable
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide} disabled={loading}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (formData.id ? "Updating..." : "Saving...") : formData.id ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddLanguageModal;
