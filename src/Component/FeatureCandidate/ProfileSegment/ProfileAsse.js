
import React, { useState } from 'react';
import { FaEye, FaStar, FaRegStar } from 'react-icons/fa';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const ProfileAssessment = ({ candidate }) => {
    const [showModal, setShowModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [rating, setRating] = useState(4.3);
    const [totalRatings, setTotalRatings] = useState(128);
    const [views, setViews] = useState(1050);
    const featured_views = candidate?.applicant?.featured_views || [];
    console.log("how many no of view", featured_views);

    const handleRate = (star) => {
        setUserRating(star);
        // In a real app, you would save this to your backend
        setTimeout(() => {
            setShowModal(false);
            // Update the overall rating (this is just a simple average for demo)
            const newTotalRatings = totalRatings + 1;
            const newRating = ((rating * totalRatings) + star) / newTotalRatings;
            setRating(newRating);
            setTotalRatings(newTotalRatings);
            alert(`Thanks for your ${star}-star rating!`);
        }, 1000);
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="">
            <Row  >
                <Col md={12}>
                    <div className="p-4 border rounded bg-white">
                        <h2 className="fw-bold text-primary mb-3 " style={{ fontSize: "18px" }}>Profile Assessment</h2>
                        <hr />
                        <Row className="align-items-center mb-3">
                            <Col xs={12} md={6}>
                                <p className="d-flex align-items-center mb-2 mb-md-0">
                                    <FaEye className="text-primary me-2" />
                                    {featured_views.map(view => (
                                        <span key={view.id} className="ms-1">{view.view_number} views</span>
                                    ))}

                                </p>
                            </Col>

                            <Col xs={12} md={6}>
                                <div
                                    className="d-flex align-items-center text-warning"
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleShow}
                                >
                                    <FaStar className="me-2" />
                                    <span>
                                        {rating.toFixed(1)} ({totalRatings} ratings)
                                        <small className="text-muted ms-1">Click to rate</small>
                                    </span>
                                </div>
                            </Col>
                        </Row>



                    </div>
                </Col>
            </Row>

            {/* Rating Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Rate this Applicant Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>How would you rate this Applicant Profile?</p>
                    <div className="d-flex justify-content-center my-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                                key={star}
                                variant="outline-warning"
                                className="mx-1 d-flex align-items-center justify-content-center"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    color: '#D36314'
                                }}
                                onClick={() => handleRate(star)}
                            >
                                {star <= userRating ? <FaStar /> : <FaRegStar />}
                            </Button>
                        ))}
                    </div>
                    <p className="text-muted">Select a rating from 1 (lowest) to 5 (highest)</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileAssessment;