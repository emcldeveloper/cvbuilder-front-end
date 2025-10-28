 import { Modal, Button, Form, Row, Col  ,Spinner } from 'react-bootstrap';
import useTraining from '../../../hooks/Universal/Training';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useTrainingForm from '../../../hooks/Candidate/UseTraining';


const AddTrainingModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");
  const { training } = useTraining();
  const { formData, handleChange, handleFileChange, handleSubmit ,  loading } = useTrainingForm(applicant_id);

  // Prepare training select options
  const AllTrainingOptions =
    training?.map((t) => ({ value: t.name, label: t.name })) || [];
  const [TrainingOptions, setTrainingOptions] = useState([]);
  useEffect(
    () => setTrainingOptions(AllTrainingOptions.slice(0, 10)),
    [training]
  );
  const loadMoreTraining = () =>
    setTrainingOptions((prev) =>
      AllTrainingOptions.slice(0, prev.length + 10)
    );

  // Prepare institution select options
  const AllInstitutionOptions =
    training?.map((t) => ({ value: t.institution, label: t.institution })) || [];
  const [InstitutionOptions, setInstitutionOptions] = useState([]);
  useEffect(
    () => setInstitutionOptions(AllInstitutionOptions.slice(0, 10)),
    [training]
  );
  const loadMoreInstitution = () =>
    setInstitutionOptions((prev) =>
      AllInstitutionOptions.slice(0, prev.length + 10)
    );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Training & Workshop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Training Name<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="name"
                options={TrainingOptions}
                value={
                  formData.name ? { value: formData.name, label: formData.name } : null
                }
                onMenuScrollToBottom={loadMoreTraining}
                placeholder="Select Training..."
                onChange={(selected) => handleChange("name", selected?.value || "")}
                isClearable
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Institution<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="institution"
                options={InstitutionOptions}
                value={
                  formData.institution
                    ? { value: formData.institution, label: formData.institution }
                    : null
                }
                onMenuScrollToBottom={loadMoreInstitution}
                placeholder="Select Institution..."
                onChange={(selected) =>
                  handleChange("institution", selected?.value || "")
                }
                isClearable
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Started<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="started"
                value={formData.started}
                onChange={(e) => handleChange("started", e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="ended"
                value={formData.ended}
                onChange={(e) => handleChange("ended", e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attach Certificate<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleFileChange}
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            {/* <Button variant="primary" type="submit">
              Save changes
            </Button> */}
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

export default AddTrainingModal;
