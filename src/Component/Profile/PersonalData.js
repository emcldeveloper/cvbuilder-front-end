import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Badge, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus, faMapMarkerAlt, faPhone, faEnvelope ,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileSection = ({ applicant, isApplicant }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [showBackgroundImageModal, setShowBackgroundImageModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-section">
    
    </div>
  );
};

export default ProfileSection;