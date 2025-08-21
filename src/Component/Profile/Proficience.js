import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import AddProficiencyModal from '../Forms/JobSeeker/Proficiency';

const ProficiencyQualifications = ({ applicant }) => {



    const formatYear = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    //   const getFileNameFromUrl = (url) => {
    //     if (!url) return '';
    //     const parts = url.split('/');
    //     return parts[parts.length - 1];
    //   };
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
    const [IsOpenModel ,setIsOpenModel]=useState(false);
    const handleModelProficiency =()=>{
        setIsOpenModel(true);
    }

    return (
        <div className="proficiency-section mt-3">
            {/* Proficiency Header */}
            {applicant?.proficiency && (
                <div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="section-title mb-0">
                            <b>PROFICIENCY QUALIFICATION</b>
                        </h6>
                        <div className="d-flex gap-2">
                            <Button
                                variant="link"

                                className="p-0 border-0 bg-transparent"
                                onClick={handleModelProficiency}
                            >
                                <Plus
                                    style={{ fontSize: '1.5rem' }}
                                    className="text-muted"
                                />
                            </Button>
                            <AddProficiencyModal  show={IsOpenModel} onHide={()=>{setIsOpenModel(false)}}/>
                            <Link
                                to={`/jobseeker/Edit-Proficiency`}
                            >
                                <Pencil
                                    style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                    className="text-muted"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="mb-3 divider" />

                    {/* Proficiency List */}
                    <div className="proficiency-list">
                        {applicant.proficiency.length > 0 ? (
                            applicant.proficiency.map((proficiency, index) => (
                                <div key={index} className="d-flex mb-3 proficiency-item">
                                    <div className="me-3 mt-1">
                                        <FontAwesomeIcon
                                            icon={faMedal}
                                            className="text-primaryu"
                                            style={{ fontSize: '1.5rem' }}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-0 fw-bold">
                                                {proficiency.proficiency?.proficiency_name} - {' '}
                                                <span className="fw-light text-muted">
                                                    {formatYear(proficiency.started)} - {formatYear(proficiency.ended)}
                                                </span>
                                            </h6>

                                        </div>
                                        <p className="mb-0 text-uppercase">
                                            {proficiency.award} ({proficiency.organization?.organization_name})
                                        </p>

                                        {proficiency.attachment && (
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
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-2 text-muted">
                                No proficiency qualifications added
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .proficiency-item {
          transition: background-color 0.2s;
          padding: 8px;
          border-radius: 4px;
        }
        .proficiency-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
        </div>
    );
};

export default ProficiencyQualifications;