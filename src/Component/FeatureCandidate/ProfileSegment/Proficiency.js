import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const Proficiency = ({ candidate }) => {
    const proficiencies = candidate?.applicant?.proficiencies || [];
    console.log("personality how many", proficiencies);
    const formatYear = (dateString) => {
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
    const [IsOpenModel, setIsOpenModel] = useState(false);
    const handleModelProficiency = () => {
        setIsOpenModel(true);
    }


    if (proficiencies.length === 0) {
        return (
            <Container className="border p-4 bg-white rounded mb-1">
                <p className="text-muted">No profocincey  availabl.</p>
            </Container>
        );
    }

    return (
        <Container className="border p-4 bg-white rounded mb-1">
            <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
                Proficiency Qualification
            </p>
            <hr />

            {
                proficiencies?.map((proficiency, index) => (
                    <div key={index} className="d-flex mb-3 proficiency-item">
                        <div className="me-3 mt-1">
                            <FontAwesomeIcon
                                icon={faMedal}
                                className="text-primary"
                                style={{ fontSize: '1.5rem' }}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-0 fw-bold">
                                    {proficiency.proficiency.proficiency_name} - {' '}
                                    <span className="fw-light text-muted">
                                        {formatYear(proficiency.started)} - {formatYear(proficiency.ended)}
                                    </span>
                                </h6>

                            </div>
                            <p className="mb-0 text-uppercase">
                                {proficiency.award} ({proficiency.organization?.organization_name})
                            </p>

                            {/* {proficiency.attachment && (
                                <div className="mt-1">
                                    <a
                                        href={proficiency.attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none small"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                        {getFileNameFromUrl(proficiency.attachment)}
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

export default Proficiency;