import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useOrganization from '../../../hooks/Universal/Organization';
import UsegetProficiency from '../../../hooks/Universal/Proficiency';
import { useEffect, useState } from 'react';

const AddProficiencyModal = ({ show, onHide }) => {
  const { organization, loadorganization } = useOrganization();
  const {proficiency ,loadsproficiency}= UsegetProficiency();
  const AllOrganizationOptions = organization?.map(organization => ({
    value: organization.id,
    label: organization.organization_name,
  })) || [];
  console.log("orgnaization list yes", AllOrganizationOptions);
  const [Organizationoptions, setOrganizationOptions] = useState([]);

  useEffect(() => setOrganizationOptions(AllOrganizationOptions.slice(0, 10)), [organization]);

  const loadMoreOrganization = () => {
    setOrganizationOptions(prev => AllOrganizationOptions.slice(0, prev.length + 10));
  };
  //proficinecy option
  const AllProficiencyOptions = proficiency?.map(proficiency => ({
    value: proficiency.id,
    label: proficiency.proficiency_name,
  })) || [];
  console.log("proficiency list list yes", AllProficiencyOptions);
  const [Proficiencyoptions, setProficiencyOptions] = useState([]);

  useEffect(() => setProficiencyOptions(AllProficiencyOptions.slice(0, 10)), [proficiency]);

  const loadMoreProficiency = () => {
    setOrganizationOptions(prev => AllProficiencyOptions.slice(0, prev.length + 10));
  };


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Proficiency</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          method="POST"

          encType="multipart/form-data"
          className="proficiency-applicant"
        >
          <input type="hidden" name="id" value="" />

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Organization  <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="major"
                options={Organizationoptions}
                onMenuScrollToBottom={loadMoreOrganization}
                placeholder="Select organization ..."
                onChange={selected => {
                  // You can store this in state or pass to your form handler
                  console.log("Selected organization:", selected);
                }}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Proficiency<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
             <CreatableSelect
                name="proficiency"
                options={Proficiencyoptions}
                onMenuScrollToBottom={loadMoreProficiency}
                placeholder="Select proficiency ..."
                onChange={selected => {
                  // You can store this in state or pass to your form handler
                  console.log("Selected proficiency:", selected);
                }}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
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
                required
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
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Awarded<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="award"
                required
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
                required
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProficiencyModal;