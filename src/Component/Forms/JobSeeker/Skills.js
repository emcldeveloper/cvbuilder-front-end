import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useKnowledge from '../../../hooks/Universal/Skills';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import MyProfile from '../../../hooks/Candidate/ProfileData';
import Swal from 'sweetalert2';
import { createKnowledge } from '../../../Api/Jobseeker/JobSeekerProfileApi';

const EditSkillsModal = ({ show, onHide }) => {
    const applicant = MyProfile();
    const applicant_id = localStorage.getItem("applicantId");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const knowledgedata = Array.isArray(applicant?.knowledge) ? applicant.knowledge : [];
    const [selectedKnowledge, setSelectedKnowledge] = useState([]);
    useEffect(() => {
        if (knowledgedata.length > 0) {
            const mapped = knowledgedata.map(item => ({
                value: item.knowledge?.id || item.knowledge_id,
                label: item.knowledge?.knowledge_name || item.knowledge_name
            }));
            setSelectedKnowledge(mapped);
        }
    }, [knowledgedata, show]);

    const handleknowledgeChange = (selected) => {
        setSelectedKnowledge(selected || []);
    };
    // State for form data
    const [formData, setFormData] = useState({
        culture: [],
        personality: [],
        knowledge: [],
        software: [],
        tool: []
    });
    // const handleSelectChange = (e) => {
    //     const options = [...e.target.options];
    //     const selectedValues = options
    //         .filter(option => option.selected)
    //         .map(option => option.value);

    //     setFormData({
    //         ...formData,
    //         [e.target.name]: selectedValues
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const knowledgeIds = selectedKnowledge.map(item => item.value);

        const payload = {
            applicant_id: applicant_id,
            knowledge: knowledgeIds,
        };

        setError(null);
        setIsSubmitting(true);

        try {
            console.log("knowledge send data from form", payload);
            const response = await createKnowledge(payload);

            if (response?.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.success,
                    icon: "success",
                });
                onHide();
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text:
                    err.response?.data?.message ||
                    "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const { knowledge, loadknowledge } = useKnowledge()
    const AllKnowledgeOptions = knowledge?.map(knowledge => ({
        value: knowledge.id,
        label: knowledge.knowledge_name,
    })) || [];
    const [knowledgeOptions, setKnowledgeOptions] = useState([]);
    useEffect(() => setKnowledgeOptions(AllKnowledgeOptions.slice(0, 10)), [knowledge]);
    const loadMoreKnowledge = () => {
        setKnowledgeOptions(prev => AllKnowledgeOptions.slice(0, prev.length + 10));
    };
    return (
        <Modal show={show} onHide={onHide} size="m" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Key Skills & Competencies</Modal.Title>
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
                                        value={selectedKnowledge}
                                        onMenuScrollToBottom={loadMoreKnowledge}
                                        placeholder="Select knowledge ..."
                                        onChange={handleknowledgeChange
                                        }
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