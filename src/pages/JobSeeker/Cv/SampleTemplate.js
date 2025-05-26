import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Modal,
    Button,
    Badge
} from 'react-bootstrap';
import { FaEye, FaFileAlt } from "react-icons/fa";

// Import your templates
import Template1 from "../../../templates/template1";
import Template2 from "../../../templates/template2";
import Template3 from "../../../templates/template3";
import Template4 from "../../../templates/template4";
// import Templat5  from "../../../templates/template5";
import Template6 from "../../../templates/template6";
import Template7 from "../../../templates/template7";
import Template8 from "../../../templates/template8";
import Template9 from "../../../templates/template9";
import Template10 from "../../../templates/template10";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";

const SampleTemplate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [templateViews, setTemplateViews] = useState({});
    const [totalview, setTotalview] = useState("");

    const templates = [
        { id: 1, name: "Template 1", image: "/cv1.png", component: <Template1 /> },
        { id: 2, name: "Template 2", image: "/cv2.png", component: <Template2 /> },
        { id: 3, name: "Template 3", image: "/cv3.png", component: <Template3 /> },
        { id: 4, name: "Template 4", image: "/cv4.png", component: <Template4 /> },
        // { id: 5, name: "Template 5", image: "/cv5.png", component: <Template5 /> },
        { id: 6, name: "Template 6", image: "/cv6.png", component: <Template6 /> },
        { id: 7, name: "Template 7", image: "/cv7.png", component: <Template7 /> },
        { id: 8, name: "Template 8", image: "/cv8.png", component: <Template8 /> },
        { id: 9, name: "Template 9", image: "/cv9.png", component: <Template9 /> },
        { id: 10, name: "Template 10", image: "/cv10.png", component: <Template10 /> },
    ];

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
        setSelectedTemplate(null);
    };

    const selectedTemplateData = templates.find(template => template.id === selectedTemplate);

    return (
        <JobSeekerLayout>
            <Container className="py-4">
                <Row className="mb-4">
                    <Col>
                        <h4 className="d-flex align-items-center gap-3">
                            <FaFileAlt className="text-primary" />
                            <span className="fw-bold">Select Your CV Template</span>
                            <Badge bg="light" text="dark" className="ms-2 d-flex align-items-center">
                                <FaEye className="me-1" />
                                {totalview}
                            </Badge>
                        </h4>
                    </Col>
                </Row>

                <Row xs={2} md={3} lg={4} className="g-4">
                    {templates.map((template) => {
                        const viewCount = templateViews[template.id] ?? template.views ?? 0;

                        return (
                            <Col key={template.id}>
                                <Card
                                    className={`h-100 cursor-pointer ${selectedTemplate === template.id ? 'border-primary border-2' : ''}`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={template.image}
                                        className="p-3 bg-light object-fit-contain"
                                        style={{ height: '200px' }}
                                    />
                                    <Card.Body className="text-center p-2">
                                        <Card.Title className="fs-6 mb-1">{template.name}</Card.Title>
                                        <div className="d-flex justify-content-center align-items-center text-muted" style={{ fontSize: '0.75rem' }}>
                                            <FaEye className="me-1" size={12} />
                                            <span>{viewCount}</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Preview Modal */}
                <Modal
                    show={showPreview}
                    onHide={handleClosePreview}
                    size="xl"
                    centered
                    scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Preview Selected Template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4 bg-light">
                        {selectedTemplateData?.component}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePreview}>
                            Back to Templates
                        </Button>
                        <div>
                            <Button variant="danger" onClick={handleClosePreview} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary">
                                Save
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Container>
        </JobSeekerLayout>
    );
};

export default SampleTemplate;