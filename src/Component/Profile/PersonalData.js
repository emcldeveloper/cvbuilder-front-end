import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button, Modal, Form, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { PencilFill, Phone } from 'react-bootstrap-icons';
import useGenders from '../../hooks/Universal/Gender';
import useMalitalstatus from '../../hooks/Universal/MaritalStatus';
import useRegions from '../../hooks/Universal/Region';
import usegetCountries from '../../hooks/Universal/Country';
import useCitizenship from '../../hooks/Universal/Citizenship';
import { createBackgroundImage, createProfileImage } from '../../Api/Jobseeker/JobSeekerProfileApi';
import Swal from 'sweetalert2';
import moment from "moment";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import useAddressForm from '../../hooks/Candidate/UseAddress';

const ProfileSection = ({ profile, address ,phone}) => {
    const applicant_id = localStorage.getItem("applicantId");
    const [showContactModal, setShowContactModal] = useState(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
    const [showBgModal, setShowBgModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);
    console.log("profile  yes boss", phone);

    // Crop states
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    // Add state for background file
    const [bgFile, setBgFile] = useState(null);

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
    const [selectedRegion, setSelectedRegion] = useState(null);
    useEffect(() => {
        if (address && address.region_name && address.region_id) {
            console.log("Address yes boss", address.region_name);
            setSelectedRegion({
                value: address.region_id,
                label: address.region_name,
            });
        }
    }, [address]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    useEffect(() => {
        if (address && address.name && address.country_id) {
            console.log("Address yes boss", address.name);
            setSelectedCountry({
                value: address.name,
                label: address.name,
            });
        }
    }, [address]);
     const [selectedGender, setSelectedGender] = useState(null);
    useEffect(() => {
        if (profile && profile.gender_name && profile.gender_id) {
           
            setSelectedGender({
                value: profile.gender_id,
                label: profile.gender_name,
            });
        }
    }, [address])
       const [selectedCitizenship, setSelectedCitizenship] = useState(null);
    useEffect(() => {
        if (address && address.citizenship && address.id) { 
            setSelectedCitizenship({
                value: address.citizenship,
                label: address.citizenship,
            });
        }
    }, [address]);



    useEffect(() => {
        const mapped = genders?.map(gender => ({
            value: gender.id,
            label: gender.gender_name,
        })) || [];
        setGenderOptions(mapped.slice(0, 10));
    }, [genders]);


    const handleImageError = (type) => (e) => {
        console.error(`${type} image failed to load:`, e.target.src);
        if (type === 'background') {
            setBgImage('https://ekazi.co.tz/svg/dotted.svg');
        } else {
            setProfileImage('https://ekazi.co.tz/uploads/picture/pre_photo.jpg');
        }
    };

    // 🟢 Step 1: Handle file selection → open crop modal
    const handleProfileImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            Swal.fire({
                title: "Error!",
                text: "Please select a valid image file (JPEG, PNG, JPG, WEBP)",
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

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropModal(true);
        };
        reader.readAsDataURL(file);
    };

    // 🟢 Step 2: Handle crop area
    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    // 🟢 Step 3: Generate cropped image preview
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImg);
            setProfileImage(croppedImg);
            setShowCropModal(false);
            setShowProfileModal(true); // Return to profile modal to show preview
        } catch (e) {
            console.error(e);
            Swal.fire("Error!", "Failed to crop image.", "error");
        }
    }, [imageSrc, croppedAreaPixels]);

    // 🟢 Step 4: Save final cropped image to backend
    const saveProfileImage = async (e) => {
        e.preventDefault();

        if (!croppedImage) {
            Swal.fire("Error!", "Please crop the image first.", "error");
            return;
        }

        try {
            // Convert data URL to blob
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const file = new File([blob], "cropped-profile.jpg", { type: "image/jpeg" });

            const formData = new FormData();
            formData.append("picture", file);
            formData.append("applicant_id", applicant_id);

            console.log("=== FormData Debug ===");
            console.log("FormData has picture:", formData.has("picture"));
            console.log("FormData has applicant_id:", formData.has("applicant_id"));

            const apiResponse = await createProfileImage(formData);

            if (apiResponse?.status === 200 || apiResponse?.success) {
                Swal.fire({
                    title: "Success!",
                    text: apiResponse.success || "Profile image updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setShowProfileModal(false);
                    // Optionally reload the page or update parent state
                    window.location.reload();
                });
            } else {
                throw new Error(apiResponse?.message || "Failed to save profile image");
            }
        } catch (err) {
            console.error("Error in saveProfileImage:", err);
            let errorMessage = "Error saving profile image";

            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.status === 422 && err.response?.data) {
                const errors = err.response.data.errors;
                if (typeof errors === 'object') {
                    errorMessage = Object.values(errors).flat().join(', ');
                } else {
                    errorMessage = errors || "Validation error";
                }
            } else if (err.message) {
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

    // ✅ FIXED: Background image handlers
    const handleBgImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    title: "Error!",
                    text: "Please select a valid image file (JPEG, PNG, JPG, WEBP)",
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

            setBgFile(file); // Store the actual file
            const reader = new FileReader();
            reader.onload = (event) => {
                setBgImage(event.target.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ FIXED: Save background image function
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
            formData.append("background_picture", bgFile); // Append the actual FILE, not the URL
            formData.append("applicant_id", applicant_id);

            // Debug FormData contents
            console.log("=== Background Image FormData Debug ===");
            console.log("FormData has background_picture:", formData.has("background_picture"));
            console.log("FormData has applicant_id:", formData.has("applicant_id"));

            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name}, ${value.size} bytes, ${value.type}`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            const response = await createBackgroundImage(formData);

            if (response?.status === 200 || response?.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.success || "Background image updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setShowBgModal(false);
                    setBgFile(null); // Clear the file state
                    window.location.reload();
                });
            } else {
                console.error("API returned unexpected response:", response);
                throw new Error(response?.message || "Failed to save background image");
            }

        } catch (err) {
            console.error("Error saving background image:", err);

            let errorMessage = "Error saving background image";

            // Enhanced error handling
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.status === 422 && err.response?.data) {
                const errors = err.response.data.errors;
                if (typeof errors === 'object') {
                    errorMessage = Object.values(errors).flat().join(', ');
                } else {
                    errorMessage = errors || "Validation error";
                }
            } else if (err.message) {
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

    // Reset background file when modal closes
    const handleBgModalClose = () => {
        setBgFile(null);
        setShowBgModal(false);
    };

    const saveAddressInfo = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            formData.append("user_id", profile?.id);

            console.log("adrres data for new data is saved ok",formData);

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

    // Region options (unchanged)
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

    // Other option loaders (unchanged)
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
        
const {formData,
        handleChange,
        handleSubmit,
        loadings,
    }=useAddressForm(profile,address,Phone)
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

            {/* ✅ FIXED: Background Image Edit Modal */}
            <Modal show={showBgModal} onHide={handleBgModalClose} centered>
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
                            <Form.Text className="text-muted">
                                Supported formats: JPEG, PNG, JPG, WEBP. Max size: 5MB
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={handleBgModalClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!bgFile}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Profile Image Edit Modal with Crop Integration */}
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
                            <Form.Text className="text-muted">
                                Supported formats: JPEG, PNG, JPG, WEBP. Max size: 5MB
                            </Form.Text>
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
                                    setCroppedImage(null);
                                }}
                            >
                                Remove Photo
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!croppedImage}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Crop Modal */}
            <Modal show={showCropModal} onHide={() => setShowCropModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Crop Your Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                            background: "#333",
                            borderRadius: "8px",
                            overflow: "hidden"
                        }}
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            cropShape="round"
                            showGrid={false}
                            style={{
                                containerStyle: {
                                    borderRadius: "8px"
                                }
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <Form.Label>Zoom: {Math.round(zoom * 100)}%</Form.Label>
                        <Form.Range
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowCropModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={showCroppedImage}
                    >
                        Crop & Preview
                    </Button>
                </Modal.Footer>
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
                                {address?.region_name} {""}
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
                            {address?.country_code && <div>{address.country_code} 0000</div>}
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
                    <Form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={profile?.id} />
                        <Row>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                     
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Middle Name"
                                    name="middle_name"
                                    value={formData.middel_name}
                                    defaultValue={profile?.middle_name}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="last_name"
                                    value={formData.last_name}
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
                                    value={selectedGender}
                                    onMenuScrollToBottom={loadMoreGender}
                                    onChange={(option)=>{
                                        setSelectedGender(option)
                                    }

                                    }
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
                                    defaultValue={phone?.phone_number}
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
                                    value={selectedCountry}
                                    onChange={(option) => {
                                        setSelectedCountry(option);
                                    }}
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
                                    value={selectedCitizenship}
                                    onChange={(option)=>{ 
                                        setSelectedCitizenship(option)
                                     }}
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
                                    value={selectedRegion}
                                    onMenuScrollToBottom={loadMoreRegions}
                                       onChange={(option) => {
                                        setSelectedRegion(option);
                                    }}
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