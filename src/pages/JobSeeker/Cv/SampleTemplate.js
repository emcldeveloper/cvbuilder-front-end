import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Modal,
    Button,
    Badge,
    Form,

} from 'react-bootstrap';

import { FaFileAlt, FaEye, FaCrown, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Import your templates
import Template1 from "../../../templates/template1";
import Template2 from "../../../templates/template2";
import Template3 from "../../../templates/template3";
import Template4 from "../../../templates/template4";
import Template6 from "../../../templates/template6";
import Template7 from "../../../templates/template7";
import Template8 from "../../../templates/template8";
import Template9 from "../../../templates/template9";
import Template10 from "../../../templates/template10";
import Template5 from "../../../templates/template5";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { CvApi } from "../../../Api/Jobseeker/CvApi";
import { Api } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SampleTemplate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [viewCountData, setTemplateViews] = useState({});
    const [totalview, setTotalview] = useState("");
    const navigate =useNavigate();

    const templates = [
        { id: 1, name: "Template 1", image: "/cv1.png", component: <Template1 /> },
        { id: 2, name: "Template 2", image: "/cv2.png", component: <Template2 /> },
        { id: 3, name: "Template 3", image: "/cv3.png", component: <Template3 /> },
        { id: 4, name: "Template 4", image: "/cv4.png", component: <Template4 /> },
        { id: 5, name: "Template 5", image: "/cv5.png", component: <Template5 /> },
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
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [plansubscription, setPlanSubscriptions] = useState([]);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [codeNumber, setCodeNumber] = useState('');

    useEffect(() => {
        const myPlansubscription = async () => {
            try {
                setLoading(true);
                const response = await CvApi.getsubscriptionPlan()
                console.log('my plan subscription', response);
                setPlanSubscriptions(response); // response is already the data
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching  my plan scubsription:', err);
            } finally {
                setLoading(false);
            }
        };

        myPlansubscription();
    }, []);



    // ...

    useEffect(() => {
        const cvcount = async () => {
            try {
                setLoading(true);
                const response = await CvApi.getCvcount();
                console.log('CV count response:', response);

                // Handle different response formats
                let viewsData = {};

                if (Array.isArray(response)) {
                    // Response is array of {template_no, view} objects
                    viewsData = response.reduce((acc, item) => {
                        if (item?.template_no !== undefined) {
                            acc[item.template_no] = item.view || 0;
                        }
                        return acc;
                    }, {});
                } else if (response && typeof response === 'object') {
                    // Response is already in {templateId: views} format
                    viewsData = response;
                }

                setTemplateViews(viewsData);

                // Calculate total views if needed
                const total = Object.values(viewsData).reduce((sum, count) => sum + count, 0);
                setTotalview(total);

                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching CV counts:', err);
                setTemplateViews({});
                setTotalview("0");
            } finally {
                setLoading(false);
            }
        };

        cvcount();
    }, []);


    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        setShowModal(false);
        setShowInvoiceModal(true);
    };

    const applicant_id = localStorage.getItem("applicantId");
    console.log("applicant id from local storage", applicant_id);
    const paymentData = {
        referenceNumber: codeNumber,
        applicantId: applicant_id,
        subscriptionId: selectedPlan?.id,
    };
    const handlePaymentSubmit = async (e) => {  // Added async here
        e.preventDefault();
        try {
            const response = await CvApi.createsubscription(paymentData);

            if (response.status === 200) {
                console.log('data sub', response);
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                window.location.reload();
            } else {
                console.error("Error creating subscription:");
            }

        } catch (error) {
            console.error("Error creating subscription:", error);
            // Handle error (e.g., show error message to user)
        }
    };
   const handlecvincrementSubmit = async (templateId) => {
    try {
        // Option 1: If your API expects FormData
        const formData = new FormData();
        formData.append('template_id', templateId);
        formData.append('view_count', 1);
        
        // Make sure CvApi.createcvincrement accepts FormData
        const response = await CvApi.createcvincrement(formData);
        
        // Option 2: If your API expects a plain object
        // const response = await CvApi.createcvincrement({
        //     template_id: templateId,
        //     view_count: 1
        // });
        
        console.log('count cv id', response);
        
        // Update your viewCountData state after successful increment
        setTemplateViews(prev => ({
            ...prev,
            [templateId]: (prev[templateId] || 0) + 1
        }));
        
    } catch (error) {
        console.error("Error incrementing view count:", error);
    }
};
    // const handleSubmit = async (templateId) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('template_id', templateId);
    //         formData.append('view_count', 1);

    //         await axios.post('http://127.0.0.1:8000/api/applicant/countcv', formData);

    //         // Refresh views after submit
    //         const response = await axios.get("http://127.0.0.1:8000/api/applicant/getcvno");
    //         const viewCounts = response.data.view_count;
    //         const totalview = response.data.count;
    //         setotalview(totalview);

    //         const mappedViews = {};
    //         viewCounts.forEach((item) => {
    //             mappedViews[item.template_no] = item.view;
    //         });
    //         setTemplateViews(mappedViews);

    //     } catch (error) {
    //         console.error("Failed to track view or fetch updated views:", error.message);
    //     }
    // };

    return (
        <JobSeekerLayout>
            <Container className="py-4">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="d-flex align-items-center gap-3 mb-0">
                                <FaFileAlt className="text-primary" style={{ fontSize: '1.5rem' }} />
                                <span className="fw-bold"> CV Templates</span>
                                <Badge bg="light" text="dark" className="ms-2 d-flex align-items-center">
                                    <FaEye className="me-1" />
                                    {totalview}
                                </Badge>
                            </h4>

                            {/* CV Subscription Button */}
                            <Button
                                variant="outline-primary"
                                className="d-flex align-items-center gap-2"
                                onClick={() => setShowModal(true)}
                            >
                                <FaCrown className="text-warning" />
                                CV Subscription
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Modal for CV Subscription */}
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="d-flex align-items-center gap-3">
                            <FaCrown className="text-warning" />
                            <span className="fw-bold">CV Subscription Plans</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-0">
                        <div className="text-center mb-4">
                            <h5 className="text-muted">Choose the plan that works for you</h5>
                        </div>

                        <div className="row g-4 justify-content-center">
                            {plansubscription?.map((subscription, index) => (
                                <div key={index} className="col-md-6 col-lg-4">
                                    <Card className={`h-100 border-${index === 1 ? 'primary' : 'light'} shadow-sm`}>
                                        <Card.Header className={`bg-${index === 1 ? 'primary' : 'light'} text-${index === 1 ? 'white' : 'dark'} py-3`}>
                                            <h5 className="mb-0 fw-bold">{subscription.name} Subscription</h5>
                                            {index === 1 && <span className="badge bg-warning text-dark mt-2">Most Popular</span>}
                                        </Card.Header>
                                        <Card.Body className="py-4">
                                            <div className="mb-4">
                                                <span className="fs-4 fw-bold">{subscription.price?.toLocaleString('en-US')} Tsh</span>
                                                <span className="text-muted">/month</span>
                                                <p className="small text-muted mb-0">{subscription.duration}-day billing cycle</p>
                                            </div>

                                            <ul className="list-unstyled text-start mb-4">
                                                <li className="mb-3 d-flex align-items-start">
                                                    <span className="me-2 text-success">✓</span>
                                                    <span>Manage up to {subscription.cv_limit} CVs</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <span className="me-2 text-success">✓</span>
                                                    <span>{subscription.description}</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <span className="me-2 text-success">✓</span>
                                                    <span>{subscription.name} templates</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <span className="me-2 text-success">✓</span>
                                                    <span>{subscription.cv_limit} PDF downloads</span>
                                                </li>
                                                <li className="d-flex align-items-start">
                                                    <span className="me-2 text-success">✓</span>
                                                    <span>Priority support</span>
                                                </li>
                                            </ul>

                                            <Button
                                                variant={index === 1 ? "primary" : "outline-primary"}
                                                size="lg"
                                                className="w-100 mt-auto"
                                                onClick={() => handleSelectPlan(subscription)}
                                            >
                                                {index === 1 ? "Get Premium" : "Get Started"}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <small className="text-muted me-auto">* Cancel anytime with 30-day money back guarantee</small>
                        <Button variant="light" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Invoice/Payment Modal */}
                <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment Instructions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedPlan && (
                            <>
                                <div className="mb-4">
                                    <h5>Invoice for {selectedPlan.name} Plan</h5>
                                    <p className="mb-1">Amount: <strong>{selectedPlan.price?.toLocaleString('en-US')}  Tsh</strong></p>
                                    <p className="mb-1">Duration: {selectedPlan.duration} days</p>
                                    <p>CV Limit: {selectedPlan.cv_limit}</p>
                                </div>

                                <div className="payment-instructions mb-4 p-3 bg-light rounded">
                                    <h6 className="mb-3">Pay via Tigo Pesa:</h6>

                                    {/* Tigo Lipa Number Image */}
                                    <div className="payment-images-container mb-4">
                                        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                                            {/* First Image - Larger Size */}
                                            <div className="text-center">
                                                <img
                                                    src="/lipa_no/lipa1.jpg"
                                                    alt="Tigo Pesa Lipa Number"
                                                    className="img-fluid rounded border shadow-sm"
                                                    style={{ maxHeight: '250px', width: 'auto' }}
                                                />
                                                <p className="mt-2 small text-muted">Payment Number</p>
                                            </div>

                                            {/* Second Image - Larger Size */}
                                            <div className="text-center">
                                                <img
                                                    src="/lipa_no/jinsi_ya_kulipa.jpg"
                                                    alt="How to Pay via Tigo Pesa"
                                                    className="img-fluid rounded border shadow-sm"
                                                    style={{ maxHeight: '250px', width: 'auto' }}
                                                />
                                                <p className="mt-2 small text-muted">Payment Instructions</p>
                                            </div>
                                        </div>

                                        <p className="text-center mt-3 small text-muted">Scan or enter manually</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <FaWhatsapp className="text-success me-2" size={20} />
                                        <span>Send payment code via WhatsApp: +255 714 059 160</span>
                                    </div>

                                    <Form onSubmit={handlePaymentSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Enter Payment Code:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter code from payment"
                                                value={codeNumber}
                                                onChange={(e) => setCodeNumber(e.target.value)}
                                                required

                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="w-100">
                                            Submit Payment Verification
                                        </Button>
                                    </Form>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                </Modal>

                <Row xs={2} md={3} lg={4} className="g-4">
                    {templates.map((template) => {
                        const viewCount = viewCountData[template.id] || 0; // Fallback to 0 if no views

                        return (
                            <Col key={template.id} xs={6} md={4} lg={3} className="mb-4">
                                <Card
                                    className={`h-100 cursor-pointer ${selectedTemplate === template.id ? 'border-primary border-2' : ''}`}
                                    onClick={() => {
                                        const selectedTemplateId = template.id;
                                        handleTemplateSelect(selectedTemplateId );
                                        handlecvincrementSubmit(selectedTemplateId); 
                                    }}
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
                    size="lg"
                    centered
                    scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Preview Selected Template</Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            padding: '1rem',

                        }}
                    >
                        {/* <div
                            style={{
                                width: '210mm',
                                minHeight: '297mm',
                                backgroundColor: 'white',
                                padding: '20mm',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                                fontSize: '12pt',
                                lineHeight: '1.5',
                            }}
                        > */}
                        {selectedTemplateData?.component}
                        {/* </div> */}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePreview}>
                            Back to Templates
                        </Button>
                        <div>
                            <Button variant="danger" onClick={handleClosePreview} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary"
                            // onClick={()=>navigate('/jobseeker/home-cv')}
                             onClick={() => navigate('/jobseeker/home-cv', { state: { template: selectedTemplate } })}
                            
                            >
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