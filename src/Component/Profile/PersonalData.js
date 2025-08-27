import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { ProgressBar, Accordion, ListGroup } from 'react-bootstrap';
import { PencilFill, Camera } from 'react-bootstrap-icons';
// import LazyImage from '../../utils/Lazyimage
import useGenders from '../../hooks/Universal/Gender';
import useMalitalstatus from '../../hooks/Universal/MaritalStatus';
import useRegions from '../../hooks/Universal/Region';
import usegetCountries from '../../hooks/Universal/Country';
import useCitizenship from '../../hooks/Universal/Citizenship';




const ProfileSection = ({ profile, address }) => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
    const [showBgModal, setShowBgModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { genders, loading } = useGenders();
    const { maritalstatus, maritalsatausloading } = useMalitalstatus();


    const { citizenship, loadingcitizenship } = useCitizenship();
    console.log("citizenship mambo vip",citizenship);




    const [profileImage, setProfileImage] = useState(
        profile?.picture ? `https://ekazi.co.tz/${profile.picture}` : 'http://127.0.0.1:8000/uploads/picture/pre_photo.jpg'
    );
    const [bgImage, setBgImage] = useState(
        profile?.picture ? `https://ekazi.co.tz/${profile.background_picture}` : 'https://ekazi.co.tz/svg/dotted.svg');

 
    //region option
    const { regions, loaderegion } = useRegions();
    const AllRegionOptions = regions?.map(region => ({
        value: region.id,
        label: region.region_name
    })) || [];

    const [Regionoptions, setRegionOptions] = useState([]);

    useEffect(() => setRegionOptions(AllRegionOptions.slice(0, 10)), [regions]);

    const loadMoreRegions = () => {
        setRegionOptions(prev => AllRegionOptions.slice(0, prev.length + 10));
    };
    //country option
    const { countries, loadecountry } = usegetCountries();
    const AllCountryOptions = countries?.map(country => ({
        value: country.id,
        label: country.name,
    })) || [];

    const [Countryoptions, setCountryOptions] = useState([]);

    useEffect(() => setCountryOptions(AllCountryOptions.slice(0, 10)), [countries]);

    const loadMoreCountry = () => {
        setCountryOptions(prev => AllCountryOptions.slice(0, prev.length + 10));
    };
    //gender option
    
    const AllGenderOptions = genders?.map(gender => ({
        value: gender.id,
        label: gender.gender_name,
    })) || [];
    console.log("current gender 2025", genders);
    const [Genderoptions, setGenderOptions] = useState([]);

    useEffect(() => setGenderOptions(AllGenderOptions.slice(0, 10)), [genders]);

    const loadMoreGender = () => {
        setGenderOptions(prev => AllGenderOptions.slice(0, prev.length + 10));
    };
    //maritalstattus option
    
    const AllMaritalStatusOptions = maritalstatus?.map(maritalstatus => ({
        value: maritalstatus.id,
        label: maritalstatus.marital_status,
    })) || [];
    console.log("current maritalstaus 2025", genders);
    const [MaritalStatusoptions, setMaritalStatusOptions] = useState([]);

    useEffect(() => setMaritalStatusOptions(AllMaritalStatusOptions.slice(0, 10)), [maritalstatus]);

    const loadMoreMaritalStatus = () => {
        setGenderOptions(prev => AllMaritalStatusOptions.slice(0, prev.length + 10));
    };

    //natinality option
    
    const AllCitizenshipOptions = citizenship?.map(citizenship => ({
        value: citizenship.id,
        label: citizenship.citizenship,
    })) || [];
    console.log("current citizenship 2025", citizenship);
    const [citizenshipoptions, setCitizenshipOptions] = useState([]);

    useEffect(() => setMaritalStatusOptions(AllMaritalStatusOptions.slice(0, 10)), [maritalstatus]);

    const loadMoreCitizenship = () => {
        setCitizenshipOptions(prev => AllCitizenshipOptions.slice(0, prev.length + 10));
    };



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
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
    // if (loading) return <p>Loading genders...</p>;
    return (
        <div  >
            {/* Background Image Section with Edit Icon */}
            <div className="position-relative ">
                <Card.Img
                    variant="top"
                    src={bgImage}
                    loading="lazy"

                    onLoad={(e) => (e.target.style.opacity = 1)}

                    style={{
                        height: "100px",   // fixed height
                        width: "100%",     // full card width
                        objectFit: "cover", // fit without cutting
                        backgroundColor:'#2995CC'

                    }}
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
                    <Modal.Title className='fs-5'>Edit Background Image</Modal.Title>
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
                    <Modal.Title className='fs-5'>Edit Profile Image</Modal.Title>
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
                    <Modal.Title className='fs-5'>Contact Info</Modal.Title>
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
                    <Modal.Title className='fs-5'>Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST"  >
                        <input type="hidden" name="id" value={profile?.id} />
                        <Row>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="first_name"
                                    defaultValue={profile?.first_name}
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Middle Name"
                                    name="middle_name"
                                    defaultValue={profile?.middle_name}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="last_name"
                                    defaultValue={profile?.last_name}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="gender"
                                    options={Genderoptions}
                                    onMenuScrollToBottom={loadMoreGender}
                                    placeholder="Select Gender "
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected  gender:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                                    isClearable // Allow clearing the selected option
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Marital <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="marital"
                                    options={MaritalStatusoptions}
                                    onMenuScrollToBottom={loadMoreMaritalStatus}
                                    placeholder="Select marital status "
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected  marital status:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                                    isClearable // Allow clearing the selected option
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date_of_birth"
                                    defaultValue={profile?.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    // defaultValue={phone?.phone_number}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Extra Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone2"
                                    defaultValue=""
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="country"
                                    options={Countryoptions}
                                    onMenuScrollToBottom={loadMoreCountry}
                                    placeholder="Select country "
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected  country:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                                    isClearable // Allow clearing the selected option
                                />

                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
                                  <Select
                                    name="citizenship"
                                    options={citizenshipoptions}
                                    onMenuScrollToBottom={loadMoreCitizenship}
                                    placeholder="Select citizenship "
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected  citizenship:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                                    isClearable // Allow clearing the selected option
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Region <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="region"
                                    options={Regionoptions}
                                    onMenuScrollToBottom={loadMoreRegions}
                                    placeholder="Select Region "
                                    onChange={selected => {
                                        // You can store this in state or pass to your form handler
                                        console.log("Selected  region:", selected);
                                    }}
                                    isSearchable // this is the default behavior
                                    isClearable // Allow clearing the selected option
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Sub Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sub_location"
                                    defaultValue={profile?.address?.sub_location}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postal_address"
                                    defaultValue={profile?.address?.postal}
                                />
                            </Form.Group>
                        </Row>

                        <Modal.Footer className="mt-3">
                            <Button variant="outline-secondary" onClick={() => setShowBasicInfoModal(false)}>
                                Close
                            </Button>
                            <Button variant="outline-secondary" type="submit">
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProfileSection;