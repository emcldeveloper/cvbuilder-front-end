import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useKnowledge from '../../../hooks/Universal/Skills';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const EditSkillsModal = ({ show, onHide }) => {
    // State for form data
    const [formData, setFormData] = useState({
        culture: [],
        personality: [],
        knowledge: [],
        software: [],
        tool: []
    });

    const handleSelectChange = (e) => {
        const options = [...e.target.options];
        const selectedValues = options
            .filter(option => option.selected)
            .map(option => option.value);

        setFormData({
            ...formData,
            [e.target.name]: selectedValues
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        onHide(); // Close modal after submission
    };
    const { knowledge, loadknowledge } = useKnowledge()
    const AllKnowledgeOptions = knowledge?.map(knowledge => ({
        value: knowledge.id,
        label: knowledge.knowledge_name,
    })) || [];
    const [knowledgeOptions, setKnowledgeOptions] = useState([]);
    console.log("knowlege is availavle yes", AllKnowledgeOptions);
    useEffect(() => setKnowledgeOptions(AllKnowledgeOptions.slice(0, 10)), [knowledge]);
    const loadMoreKnowledge = () => {
        setKnowledgeOptions(prev => AllKnowledgeOptions.slice(0, prev.length + 10));
    };

    return (
        <Modal show={show} onHide={onHide} size="m" centered>
            <Modal.Header closeButton>
                <Modal.Title>KEY SKILLS & COMPETEMCIES</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>



                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>Skills</Form.Label>
                                <Col sm={9}>
                                    <CreatableSelect
                                        name="knowledge"
                                        options={knowledgeOptions}
                                        onMenuScrollToBottom={loadMoreKnowledge}
                                        placeholder="Select knowledge ..."
                                        onChange={selected => {
                                            // You can store this in state or pass to your form handler
                                            console.log("Selected knowledge:", selected);
                                        }}
                                        isSearchable // this is the default behavior
                                        isMulti // Enable multi-select
                                        isClearable // Allow clearing the selected option
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>




                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="outline-secondary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditSkillsModal;