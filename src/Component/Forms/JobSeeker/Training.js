import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useTraining from '../../../hooks/Universal/Training';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const AddTrainingModal = ({ show, onHide }) => {
    const { training, loadtraining } = useTraining();
    //training
    const AllTrainingOptions = training?.map(training => ({
        value: training.name,
        label: training.name,
    })) || [];
    const [TrainingOptions, setTrainingOptions] = useState([]);
    console.log("training is availavle yes", AllTrainingOptions);
    useEffect(() => setTrainingOptions(AllTrainingOptions.slice(0, 10)), [training]);
    const loadMoreTraining = () => {
        setTrainingOptions(prev => AllTrainingOptions.slice(0, prev.length + 10));
    };
    //institution
      const AllInstitutionOptions = training?.map(training => ({
        value: training.institution,
        label: training.institution,
    })) || [];
    const [InstitutionOptions, setInstitutionOptions] = useState([]);
    console.log("training is availavle yes", AllTrainingOptions);
    useEffect(() => setInstitutionOptions(AllInstitutionOptions.slice(0, 10)), [training]);
    const loadMoreInstitution = () => {
        setInstitutionOptions(prev => AllInstitutionOptions.slice(0, prev.length + 10));
    };
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Add Training & Workshop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    method="POST"

                    encType="multipart/form-data"
                    className="training-applicant"
                >
                    <input type="hidden" name="id" value="" />

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Training Name<span className="text-danger">*</span>
                        </Form.Label>
                     
                            <Col sm={9}>
                                <CreatableSelect
                                    name="training"
                                    options={TrainingOptions}
                                    onMenuScrollToBottom={loadMoreTraining}
                                    placeholder="Select Training ..."
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected Training:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                            
                                    isClearable // Allow clearing the selected option
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
                                    onMenuScrollToBottom={loadMoreInstitution}
                                    placeholder="Select institution ..."
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected institution", selected);
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

export default AddTrainingModal;