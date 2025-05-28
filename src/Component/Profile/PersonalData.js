import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar, Accordion, ListGroup } from 'react-bootstrap';
import { PencilFill, Camera } from 'react-bootstrap-icons';
// import LazyImage from '../../utils/Lazyimage';

const ProfileSection = ({ profile, address }) => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
    const [showBgModal, setShowBgModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
  
    const [profileImage, setProfileImage] = useState(
        profile?.picture ? `http://127.0.0.1:8000/${profile.picture}` : '/zuu.JPEG'
      );
      const [bgImage, setBgImage] = useState(
        profile?.picture ? `http://127.0.0.1:8000/${profile.background_picture}` : '/comp.jpg'
      );
      

    const handleBgImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBgImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div  >
            {/* Background Image Section with Edit Icon */}
            <div className="position-relative ">
                <Card.Img
                    variant="top"
                    src={bgImage}
                    loading="lazy"
                    onLoad={(e) => e.target.style.opacity = 1}
                    className="object-fit-cover"
                    style={{ height: '150px', objectFit: 'cover' }}
                />
                <Button
                    variant="light"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2 rounded-circle p-1"
                    onClick={() => setShowBgModal(true)}
                    style={{ width: '28px', height: '28px' }}
                >
                    <PencilFill size={12} />
                </Button>

                {/* Profile image with Edit Icon */}
                <div className="position-absolute" style={{ bottom: '-30px', left: '16px' }}>
                    <div className="position-relative">
                        <Image
                            src={profileImage}
                            roundedCircle
                            loading="lazy"
                            className="border border-3 border-white shadow"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            className="position-absolute bottom-0 end-0 rounded-circle p-1"
                            onClick={() => setShowProfileModal(true)}
                            style={{ width: '24px', height: '24px' }}
                        >
                            <PencilFill size={12} />
                        </Button>
                    </div>
                </div>


            </div>

            {/* Background Image Edit Modal */}
            <Modal show={showBgModal} onHide={() => setShowBgModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Background Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image
                        src={bgImage}
                        fluid
                        className="mb-3"
                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                    <Form>
                        <Form.Group controlId="formBgImage" className="mb-3">
                            <Form.Label>Upload New Background</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleBgImageUpload}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={() => setShowBgModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setShowBgModal(false)}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Profile Image Edit Modal */}
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image
                        src={profileImage}
                        roundedCircle
                        className="mb-3"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <Form>
                        <Form.Group controlId="formProfileImage" className="mb-3">
                            <Form.Label>Upload New Profile Photo</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageUpload}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={() => setShowProfileModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" className="me-auto" onClick={() => {
                                setProfileImage('/default-profile.jpg');
                                setShowProfileModal(false);
                            }}>
                                Remove Photo
                            </Button>
                            <Button variant="primary" onClick={() => setShowProfileModal(false)}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Personal Info Section */}
            <Container fluid className="mt-10">
                <Row className="personal-detail align-items-center">
                    <Col md={10} className="ps-5">
                        <div className="d-flex align-items-center">
                            <h5 className="mb-1 fw-bold me-2">
                                {profile?.first_name} {profile?.middle_name} {profile?.last_name}
                            </h5>
                          
                        </div>

                        <div className="text-dark d-flex align-items-center flex-wrap">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />

                            <span className="me-2">
                                {address?.postal && `${address.postal}, `}
                                {address?.sub_location && `${address.sub_location}, `}
                                {address?.region_name}
                                {address?.name || 'Tanzania'}
                            </span>

                            <Button
                                variant="link"
                                className="  p-0 ms-2 text-decolation:none"
                                onClick={() => setShowBasicInfoModal(true)}
                            >
                                <b>|</b> View Contacts
                            </Button>
                        </div>
                    </Col>

                    <Col md={2} className="text-end pe-5">
                        <Button
                            variant="link"
                            className="p-0"
                            onClick={() => setShowBasicInfoModal(true)}
                            title="Edit personal information"
                        >
                            <PencilFill size={16} className="me-1" />
                          
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Contact Modal */}
            <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col xs={1}><FontAwesomeIcon icon={faMapMarkerAlt} /></Col>
                        <Col xs={11}>
                            {address ? (
                                <>
                                    {address.postal && `${address.postal}, `}
                                    {address.sub_location && `${address.sub_location}, `}
                                    {address.region_name && `${address.region_name}, `}
                                    {address.name || 'Tanzania'}
                                </>
                            ) : <cite className="text-muted">No address data</cite>}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={1}><FontAwesomeIcon icon={faPhone} /></Col>
                        <Col xs={11}>
                            {address?.country_code && <div>{address.country_code} 123456789</div>}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                        <Col xs={11}>
                            <div>{profile?.email || <cite className="text-muted">No email</cite>}</div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Basic Info Modal */}
            <Modal size="lg" show={showBasicInfoModal} onHide={() => setShowBasicInfoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" defaultValue={profile?.first_name} />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" defaultValue={profile?.middle_name} />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" defaultValue={profile?.last_name} />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProfileSection;