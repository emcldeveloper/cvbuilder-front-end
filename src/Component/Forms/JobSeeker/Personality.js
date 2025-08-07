import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import usePersoanlity from '../../../hooks/Universal/Personality';
import Select from 'react-select';

const EditPersonalityModal = ({ show, onHide }) => {
    // State for form data
    const [formData, setFormData] = useState({
        personality: [],

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
    const {personality, loadpersonality } = usePersoanlity()
    const AllPersnolityOptions = personality?.map(personality => ({
        value: personality.id,
        label: personality.personality_name,
    })) || [];
    const [personalityOptions, setPersonalityOptions] = useState([]);
    console.log("knowlege is personilty yes", personality);
    useEffect(() => setPersonalityOptions(AllPersnolityOptions.slice(0, 10)), [personality]);
    const loadMorePersonality = () => {
        setPersonalityOptions(prev => AllPersnolityOptions.slice(0, prev.length + 10));
    };

    return (
        <Modal show={show} onHide={onHide} size="m" centered>
            <Modal.Header closeButton>
                <Modal.Title>Skills-No best title specified yet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>Personalities</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        name="personality"
                                        options={personalityOptions}
                                        onMenuScrollToBottom={loadMorePersonality}
                                        placeholder="Select personality ..."
                                        onChange={selected => {
                                            // You can store this in state or pass to your form handler
                                            console.log("Selected personality:", selected);
                                        }}
                                        isSearchable // this is the default behavior
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

export default EditPersonalityModal;