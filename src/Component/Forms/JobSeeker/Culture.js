import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import Select from 'react-select';
import useCulture from '../../../hooks/Universal/Culture';

const EditCultureModal = ({ show, onHide }) => {
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
    const { culture, loadculture } = useCulture();
    const AllCultureOptions = culture?.map(cultures => ({
        value: cultures.id,
        label: cultures.culture_name,
    })) || [];
    const [CultureOptions, setCultureOptions] = useState([]);
    console.log(" culture yes", culture);
    useEffect(() => setCultureOptions(AllCultureOptions.slice(0, 10)), [culture]);
    const loadMoreCulture = () => {
        setCultureOptions(prev => AllCultureOptions.slice(0, prev.length + 10));
    };

    return (
        <Modal show={show} onHide={onHide} size="m" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Work Compatibility Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>culture</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        name="culture"
                                        options={CultureOptions}
                                        onMenuScrollToBottom={loadMoreCulture}
                                        placeholder="Select culture ..."
                                        onChange={selected => {
                                            // You can store this in state or pass to your form handler
                                            console.log("Selected culture:", selected);
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

export default EditCultureModal;