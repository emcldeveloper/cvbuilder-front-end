import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { ProgressBar, Accordion, ListGroup } from 'react-bootstrap';
import { PencilFill, Camera } from 'react-bootstrap-icons';
import useGenders from '../../hooks/Universal/Gender';
import useMalitalstatus from '../../hooks/Universal/MaritalStatus';
import useRegions from '../../hooks/Universal/Region';
import usegetCountries from '../../hooks/Universal/Country';
import useCitizenship from '../../hooks/Universal/Citizenship';
import { createBackgroundImage, createProfileImage } from '../../Api/Jobseeker/JobSeekerProfileApi';
import Swal from 'sweetalert2';
import moment from "moment";

const ProfileSection = ({ profile, address }) => {
    const applicant_id = localStorage.getItem("applicantId");
    const [showContactModal, setShowContactModal] = useState(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
    const [showBgModal, setShowBgModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const { genders, loading } = useGenders();
    const { maritalstatus, maritalsatausloading } = useMalitalstatus();
    const { citizenship, loadingcitizenship } = useCitizenship();
    const { regions, loaderegion } = useRegions();
    const { countries, loadecountry } = usegetCountries();

    const [Regionoptions, setRegionOptions] = useState([]);
    const [Countryoptions, setCountryOptions] = useState([]);
    const [Genderoptions, setGenderOptions] = useState([]);
    const [MaritalStatusoptions, setMaritalStatusOptions] = useState([]);
    const [citizenshipoptions, setCitizenshipOptions] = useState([]);
    console.log("profile complete to check the data", profile);
    // const [profileImage, setProfileImage] = useState(
    //     profile?.picture ? `http://127.0.0.1:8000/${profile.picture}` : 'http://127.0.0.1:8000/uploads/picture/pre_photo.jpg'
    // );
    // const [bgImage, setBgImage] = useState(
    //     profile?.background_picture ? `http://127.0.0.1:8000/${profile.background_picture}` : 'http://127.0.0.1:8000/svg/dotted.svg'
    // );
    const [profileImage, setProfileImage] = useState('https://ekazi.co.tz/uploads/picture/pre_photo.jpg');
    const [bgImage, setBgImage] = useState('https://ekazi.co.tz/svg/dotted.svg');

    useEffect(() => {
        if (profile?.picture) {
            const formattedPath = profile.picture.startsWith('/')
                ? profile.picture.substring(1)
                : profile.picture;
            setProfileImage(`https://ekazi.co.tz/${formattedPath}`);
        }

        if (profile?.background_picture) {
            const formattedPath = profile.background_picture.startsWith('/')
                ? profile.background_picture.substring(1)
                : profile.background_picture;
            setBgImage(`https://ekazi.co.tz/${formattedPath}`);
        }
    }, [profile]);

    const handleImageError = (type) => (e) => {
        console.error(`${type} image failed to load:`, e.target.src);
        if (type === 'background') {
            setBgImage('https://ekazi.co.tz/svg/dotted.svg');
        } else {
            setProfileImage('https://ekazi.co.tz/uploads/picture/pre_photo.jpg');
        }
    };


    const [profileFile, setProfileFile] = useState(null);
    const [bgFile, setBgFile] = useState(null);

    // Region options
    useEffect(() => {
        const AllRegionOptions = regions?.map(region => ({
            value: region.id,
            label: region.region_name
        })) || [];
        setRegionOptions(AllRegionOptions.slice(0, 10));
    }, [regions]);

    const loadMoreRegions = () => {
        const AllRegionOptions = regions?.map(region => ({
            value: region.id,
            label: region.region_name
        })) || [];
        setRegionOptions(prev => AllRegionOptions.slice(0, prev.length + 10));
    };

    // Country options
    useEffect(() => {
        const AllCountryOptions = countries?.map(country => ({
            value: country.id,
            label: country.name,
        })) || [];
        setCountryOptions(AllCountryOptions.slice(0, 10));
    }, [countries]);

    const loadMoreCountry = () => {
        const AllCountryOptions = countries?.map(country => ({
            value: country.id,
            label: country.name,
        })) || [];
        setCountryOptions(prev => AllCountryOptions.slice(0, prev.length + 10));
    };

    // Gender options
    useEffect(() => {
        const AllGenderOptions = genders?.map(gender => ({
            value: gender.id,
            label: gender.gender_name,
        })) || [];
        setGenderOptions(AllGenderOptions.slice(0, 10));
    }, [genders]);

    const loadMoreGender = () => {
        const AllGenderOptions = genders?.map(gender => ({
            value: gender.id,
            label: gender.gender_name,
        })) || [];
        setGenderOptions(prev => AllGenderOptions.slice(0, prev.length + 10));
    };

    // Marital status options
    useEffect(() => {
        const AllMaritalStatusOptions = maritalstatus?.map(status => ({
            value: status.id,
            label: status.marital_status,
        })) || [];
        setMaritalStatusOptions(AllMaritalStatusOptions.slice(0, 10));
    }, [maritalstatus]);

    const loadMoreMaritalStatus = () => {
        const AllMaritalStatusOptions = maritalstatus?.map(status => ({
            value: status.id,
            label: status.marital_status,
        })) || [];
        setMaritalStatusOptions(prev => AllMaritalStatusOptions.slice(0, prev.length + 10));
    };

    // Citizenship options
    useEffect(() => {
        const AllCitizenshipOptions = citizenship?.map(citizen => ({
            value: citizen.id,
            label: citizen.citizenship,
        })) || [];
        setCitizenshipOptions(AllCitizenshipOptions.slice(0, 10));
    }, [citizenship]);

    const loadMoreCitizenship = () => {
        const AllCitizenshipOptions = citizenship?.map(citizen => ({
            value: citizen.id,
            label: citizen.citizenship,
        })) || [];
        setCitizenshipOptions(prev => AllCitizenshipOptions.slice(0, prev.length + 10));
    };

    // Background image handlers
    const handleBgImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setBgImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveBackgroundImage = async (e) => {
        e.preventDefault();
        if (!bgFile) {
            Swal.fire({
                title: "Error!",
                text: "Please select an image first!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("background_picture", bgFile); // Append the actual file
            formData.append("applicant_id", applicant_id);

            // Uncomment and implement your background image API call
            const response = await createBackgroundImage(formData);
            if (response?.status === 200 || response?.success) {
                Swal.fire({
                    title: "Success!",

                    text: response.success || "Background image updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                console.error("API returned unexpected response:", response);
                throw new Error(response?.message || "Failed to save background image");
            }


        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: "Error saving background image",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // Profile image handlers
    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    title: "Error!",
                    text: "Please select a valid image file (JPEG, PNG, GIF, WEBP)",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
            if (file.size > maxSize) {
                Swal.fire({
                    title: "Error!",
                    text: "File size must be less than 5MB",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
            setProfileFile(file);
            const reader = new FileReader();
            reader.onload = (event) => setProfileImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const saveProfileImage = async (e) => {
        e.preventDefault();

        console.log("saveProfileImage called");
        console.log("profileFile state:", profileFile);

        if (!profileFile) {
            Swal.fire({
                title: "Error!",
                text: "Please select an image first!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("picture", profileFile);
            formData.append("applicant_id", applicant_id);

            // Debug FormData contents
            console.log("=== FormData Debug ===");
            console.log("FormData has picture:", formData.has("picture"));
            console.log("FormData has applicant_id:", formData.has("applicant_id"));

            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name}, ${value.size} bytes, ${value.type}`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }


            console.log("profile image is avaulbel", formData);
            const response = await createProfileImage(formData);


            if (response?.status === 200 || response?.success) {
                Swal.fire({
                    title: "Success!",

                    text: response.success || "Profile image updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setProfileImage(URL.createObjectURL(profileFile));
                });
            } else {
                console.error("API returned unexpected response:", response);
                throw new Error(response?.message || "Failed to save profile image");
            }

            setShowProfileModal(false);
        } catch (err) {
            console.error("Error in saveProfileImage:", err);

            let errorMessage = "Error saving profile image";

            // Check if error response contains Laravel validation errors
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
            }
            // Check if error has a direct message
            else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            // Handle Laravel validation error format
            else if (err.response?.status === 422 && err.response?.data) {
                // Laravel often returns { errors: { field: ["error1", "error2"] } }
                const errors = err.response.data.errors;
                if (typeof errors === 'object') {
                    errorMessage = Object.values(errors).flat().join(', ');
                } else {
                    errorMessage = errors || "Validation error";
                }
            }
            // Use the error message if available
            else if (err.message) {
                errorMessage = err.message;
            }

            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // Save address + personal info
    const saveAddressInfo = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            formData.append("user_id", profile?.id);

            // Implement your API call here
            // const res = await fetch(`${API_URL}/profile/address`, {
            //     method: "POST",
            //     body: formData,
            // });

            Swal.fire({
                title: "Success!",
                text: "Personal information updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setShowBasicInfoModal(false);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: "Error saving personal information",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {/* Background Image Section with Edit Icon */}
            <div className="position-relative">
                <Card.Img
                    variant="top"
                    src={bgImage}
                    loading="lazy"
                    onLoad={(e) => (e.target.style.opacity = 1)}
                    onError={handleImageError('background')}
                    style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "cover",
                        backgroundColor: '#2995CC'
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
                        className="mb-3"
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    />
                    <Form onSubmit={saveBackgroundImage}>
                        <Form.Group controlId="formBgImage" className="mb-3">
                            <Form.Label>Upload New Background Photo</Form.Label>
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
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Profile Image Edit Modal - FIXED: Only one modal */}
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
                    <Form onSubmit={saveProfileImage}>
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
                            <Button
                                variant="danger"
                                className="me-auto"
                                onClick={() => {
                                    setProfileImage('https://ekazi.co.tz/uploads/picture/pre_photo.jpg');
                                    setProfileFile(null);
                                }}
                            >
                                Remove Photo
                            </Button>
                            <Button variant="primary" type="submit">
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
                                {address?.name || "Tanzania"}
                            </span>

                            <Button
                                variant="link"
                                className="p-0 ms-2 text-decoration-none"
                                onClick={() => setShowContactModal(true)}
                            >
                                <b>|</b> View Contacts
                            </Button>
                        </div>

                        {/* ✅ Add member since here */}
                        {profile?.created_at && (
                            <div className="text-muted small mt-1">
                                Member since {moment(profile.created_at).format("YYYY")}
                            </div>
                        )}
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
                    <Form onSubmit={saveAddressInfo}>
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
                                    placeholder="Select Gender"
                                    isSearchable
                                    isClearable
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Marital Status <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="marital"
                                    options={MaritalStatusoptions}
                                    onMenuScrollToBottom={loadMoreMaritalStatus}
                                    placeholder="Select marital status"
                                    isSearchable
                                    isClearable
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
                                    placeholder="Select country"
                                    isSearchable
                                    isClearable
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
                                <Select
                                    name="citizenship"
                                    options={citizenshipoptions}
                                    onMenuScrollToBottom={loadMoreCitizenship}
                                    placeholder="Select citizenship"
                                    isSearchable
                                    isClearable
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
                                    placeholder="Select Region"
                                    isSearchable
                                    isClearable
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Sub Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sub_location"
                                    defaultValue={address?.sub_location}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postal_address"
                                    defaultValue={address?.postal}
                                />
                            </Form.Group>
                        </Row>

                        <Modal.Footer className="mt-3">
                            <Button variant="outline-secondary" onClick={() => setShowBasicInfoModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
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