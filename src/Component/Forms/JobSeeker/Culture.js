import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import useCulture from '../../../hooks/Universal/Culture';
import MyProfile from '../../../hooks/Candidate/ProfileData';
import { createCulture } from '../../../Api/Jobseeker/JobSeekerProfileApi';
import Swal from 'sweetalert2';

const EditCultureModal = ({ show, onHide }) => {
    const applicant_id = localStorage.getItem("applicantId");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    // Form data
    const [formData, setFormData] = useState({ culture: [] });

    // Applicant profile
    const applicant = MyProfile();
    const culturedata = Array.isArray(applicant?.culture) ? applicant.culture : [];
    console.log("Applicant culture data:", culturedata);

    // Culture options from universal API
    const { culture, loadculture } = useCulture();
    const AllCultureOptions = culture?.map(cultures => ({
        value: cultures.id,
        label: cultures.culture_name,
    })) || [];

    const [CultureOptions, setCultureOptions] = useState([]);
    const [selectedCultures, setSelectedCultures] = useState([]);

    // Load first 10 options
    useEffect(() => {
        setCultureOptions(AllCultureOptions.slice(0, 10));
    }, [culture]);

    const loadMoreCulture = () => {
        setCultureOptions(prev => AllCultureOptions.slice(0, prev.length + 10));
    };

    // Pre-fill when editing (when modal opens)
    useEffect(() => {
        if (culturedata.length > 0) {
            const mapped = culturedata.map(item => ({
                value: item.culture?.id || item.culture_id,
                label: item.culture?.culture_name || item.culture_name
            }));
            setSelectedCultures(mapped);
        }
    }, [culturedata, show]);

    // Handle select change
    const handleCultureChange = (selected) => {
        setSelectedCultures(selected || []);
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cultureIds = selectedCultures.map(item => item.value);
        setFormData({
            ...formData,
            culture: cultureIds
        });

        if (cultureIds.length === 0) {
            setError("Culture selection is required.");
            return;
        }



        setError(null);
        setIsSubmitting(true);
        try {
                    console.log("cultuer availale 2028",formData);
            const response = await createCulture(formData)
            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.success,
                    icon: "success",
                });

            }
            onHide(); // close modal
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                <Form.Label column sm={3}>Culture</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        name="culture"
                                        options={CultureOptions}
                                        value={selectedCultures} // ✅ pre-filled values
                                        onChange={handleCultureChange}
                                        onMenuScrollToBottom={loadMoreCulture}
                                        placeholder="Select culture ..."
                                        isSearchable
                                        isMulti
                                        isClearable
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
