 import React from "react";
import AddEducationModal from "../Forms/JobSeeker/Education";
import AddLanguageModal from "../Forms/JobSeeker/Language";
import CareerModelForm from "../Forms/JobSeeker/CareerForm";
export const ModalSwitcher = ({ activeModal, onClose, applicant, onSuccess }) => {
    const handleSuccess = () => {
        onSuccess?.(); // Notify parent of successful submission
        onClose(); // Close the modal
    };

    switch(activeModal?.toLowerCase()) {
        case 'education':
            return <AddEducationModal show={true} onHide={handleSuccess} applicant={applicant} />;
        case 'languages':
            return <AddLanguageModal show={true} onHide={handleSuccess} applicant={applicant} />;
        case 'career objective':
            return <CareerModelForm isOpen={true} onClose={handleSuccess} applicant={applicant} />;
        default:
            return null;
    }
}