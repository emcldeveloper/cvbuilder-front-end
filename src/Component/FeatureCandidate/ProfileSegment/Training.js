import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';


const Training = ({ candidate }) => {
    const trainings = candidate?.applicant?.trainings || [];
    console.log("personality how many", trainings);
    const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
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





    if (trainings.length === 0) {
        return (
            <Container className="border p-4 bg-white rounded mb-1">
                <p className="text-muted">No trainings  available.</p>
            </Container>
        );
    }

    return (
        <Container className="border p-4 bg-white rounded mb-1">
            <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
                Trainings & Workshops
            </p>
            <hr />

            { trainings?.map((training, index) => (
                    <div key={index} className="d-flex mb-3 training-item">
                        <div className="me-3 mt-1">
                            <FontAwesomeIcon
                                icon={faChalkboardTeacher}
                                className="text-primary"
                                style={{ fontSize: '1.5rem' }}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-0 fw-bold">
                                    {training.name} - {' '}
                                    <span className="fw-light text-muted">
                                        {formatDate(training.started)} - {formatDate(training.ended)}
                                    </span>
                                </h6>

                            </div>
                            <p className="mb-0">
                                {training.institution}
                            </p>

                            {/* {training.attachment && (
                                <div className="mt-1">
                                    <a
                                        href={training.attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none small"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                        {getFileNameFromUrl(training.attachment)}
                                    </a>
                                </div>
                            )} */}
                        </div>
                    </div>
                ))

            }
        </Container>
    );
};

export default Training;