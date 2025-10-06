import React, { useState } from 'react';
import {
    Container, Badge, Card, Button, Modal, Form, Row, Col,
    Spinner, Alert, Image
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faCalendarAlt, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import useDeleteEducation from '../../../hooks/Candidate/DeleteEducation';

import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import AddEducationModal from '../../Forms/JobSeeker/Education';

const EditEducationDetails = ({ applicant, showAddModal, showEditModal }) => {
    const handleDeleteEducation = useDeleteEducation();
    const [IsModelOpen, setIsModelOpen] = useState(false);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const navigate = useNavigate();
    const getFileNameFromUrl = (url) => {
        if (!url) return '';
        const parts = url.split('/');
        const fullName = parts[parts.length - 1];
        const lastDotIndex = fullName.lastIndexOf('.');
        if (lastDotIndex === -1) return fullName;

        const name = fullName.substring(0, lastDotIndex);
        const extension = fullName.substring(lastDotIndex);

        const shortenedName = name.length > 10
            ? `${name.substring(0, 7)}...`
            : name;

        return `${shortenedName}${extension}`;
    };
    const showAddEducationModal = () => {
        // Your logic to show add education modal
    };

    const handleEditEducation = (education) => {
        // Your edit logic here
        console.log('Editing education:', education);
    };

    const HandleOpenModel = () => {
        setIsModelOpen(true);
    }



    return (
        <div className="education-section">
            {/* Education Details Header */}
            {applicant?.education && (
                <Container className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="section-title mb-0">
                            <b>EDUCATION DETAILS</b>
                        </h6>
                        <div className="d-flex gap-2">
                            <Button
                                variant="link"
                                className="p-0 text-secondary me-2"
                                onClick={() => navigate(-1)}
                                title="Back to Training"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                            </Button>
                            <Button
                                variant="link"
                                className="p-0 text-secondary"
                                onClick={HandleOpenModel}
                                title="Add Education"
                            >
                                <FontAwesomeIcon icon={faPlus} size="lg" />
                            </Button>
                            <AddEducationModal
                                show={IsModelOpen}
                                onHide={() => setIsModelOpen(false)} />
                        </div>
                    </div>

                    <div className="mb-3 divider" />

                    {/* Education Items */}
                    <div className="education-list">
                        {applicant.education.length > 0 ? (
                            applicant.education.map((education, index) => (
                                <div key={education.id} className="education-item mb-1 p-1">
                                    <div className="d-flex">
                                        {/* Education Icon */}
                                        <div className="me-3 mt-1">
                                            <FontAwesomeIcon
                                                icon={faGraduationCap}
                                                className="text-primary"
                                                style={{ fontSize: '1.75rem' }}
                                            />
                                        </div>

                                        {/* Education Details */}
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className="fw-bold mb-1">
                                                    {education.level?.education_level} in {education.course?.course_name}
                                                </h6>
                                                <div className="d-flex">
                                                    <Button
                                                        variant="link"
                                                        className="p-0 text-secondary me-2"
                                                        onClick={() => handleEditEducation(education)}
                                                        title="Edit Education"
                                                    >
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        className="p-0 text-danger"
                                                        onClick={() => handleDeleteEducation(education.id)}
                                                        title="Delete Education"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                </div>
                                            </div>

                                            {education.major?.name && (
                                                <p className="mb-1">
                                                    <Badge bg="light" text="dark" className="fw-normal">
                                                        Major: {education.major.name}
                                                    </Badge>
                                                </p>
                                            )}
                                            <p className="mb-1 text-dark">
                                                {education.college?.college_name}
                                            </p>

                                            <p className="text-muted small mb-1">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                                {formatDate(education.started)} - {formatDate(education.ended)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-muted">
                                No education records found
                            </div>
                        )}
                    </div>
                </Container>
            )}

            <style jsx>{`
    .divider {
      height: 1px;
      background-color: #eaeaea;
    }
    .education-item {
      background-color: #fff;
      transition: all 0.2s;
    }
  `}</style>
        </div>
    );
};

export default EditEducationDetails;