import React, { useState } from 'react';
import {
    Card, Button, Modal, Form, Row, Col,
    ListGroup, Badge, Spinner, Alert, Image
} from 'react-bootstrap';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ExperienceModelMform from '../Forms/JobSeeker/ExperienceModelForm';
import AddWorkExperienceModal from '../Forms/JobSeeker/ExperienceModelForm';


const WorkExperienceSection = ({ applicant, isApplicant }) => {

    const [error, setError] = useState(null);
    const [showExperienceModal, setShowExperienceModal] = useState(false);



    // Calculate duration for a set of positions
    const calculateDuration = (positions) => {
        let totalMonths = 0;

        positions.forEach(pos => {
            const start = moment(pos.start_date);
            const end = pos.end_date ? moment(pos.end_date) : moment();
            const duration = moment.duration(end.diff(start));
            totalMonths += duration.asMonths();
        });

        const years = Math.floor(totalMonths / 12);
        const months = Math.round(totalMonths % 12);
        return { years, months, text: `${years} yrs - ${months} mos` };
    };

    // Calculate TOTAL experience across all positions
    const calculateTotalExperience = () => {
        if (!applicant?.experience) return { years: 0, months: 0, text: '0 yrs - 0 mos' };

        const allPositions = applicant.experience;
        return calculateDuration(allPositions);
    };

    const totalExperience = calculateTotalExperience();

    // Group experience by employer ID
    const groupedExperience = _.groupBy(applicant?.experience || [], 'applicant_employer_id');

    if (!applicant) return <Spinner animation="border" />;

    return (
        <div className="mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                    <h6 className="card-title ">
                        WORK EXPERIENCE ({totalExperience.text})
                    </h6>
                </Card.Title>

                <div className="d-flex gap-2">
                    <Button
                        variant="link"

                        className="p-0 border-0 bg-transparent"
                        onClick={() => setShowExperienceModal(true)}
                    >

                        <Plus
                            style={{ fontSize: '1.5rem' }}
                            className="text-muted"
                        />

                    </Button>
                    <AddWorkExperienceModal
                        show={showExperienceModal}
                        onHide={() => setShowExperienceModal(false)}
                    />
                    <Link
                        to={`/jobseeker/Edit-Experience`}
                    >
                        <Pencil
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            className="text-muted"
                        />
                    </Link>
                </div>
            </div>

            <hr className="border-primary mt-2 mb-3" />

            {/* Grouped by Employer */}
            <div className="row g-3">
                {Object.entries(groupedExperience).map(([employerId, positions]) => {
                    const employer = positions[0].employer;
                    const duration = calculateDuration(positions);

                    return (
                        <div key={employerId} className="col-12">
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 stroke-[#2E58A6]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>

                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="mb-1">{employer?.employer_name}</h5>
                                            <p className="text-muted mb-2">
                                                {employer?.sub_location}, {employer?.region?.region_name} - {employer?.region?.country?.name}
                                            </p>
                                            <Badge bg="light" text="dark" className="mb-1">
                                                {duration.text}
                                            </Badge>
                                        </div>
                                    </div>

                                    <ListGroup variant="flush" className="mt-1">
                                        {positions.reduce((acc, position) => {
                                            // Check if this position's employer is already in the accumulator
                                            const existingEmployer = acc.find(item => item.employer_id === position.employer.id);

                                            if (existingEmployer) {
                                                // Add position to existing employer group
                                                existingEmployer.positions.push(position);
                                            } else {
                                                // Create new employer group
                                                acc.push({
                                                    employer_id: position.employer.id,
                                                    employer_name: position.employer.employer_name,
                                                    positions: [position]
                                                });
                                            }
                                            return acc;
                                        }, []).map(employerGroup => (
                                            <ListGroup.Item key={employerGroup.employer_id} className="border-0 px-0 py-1">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        {/* Display all positions for this employer */}
                                                        {employerGroup.positions.map((position, idx) => (
                                                            <div
                                                                key={`${employerGroup.employer_id}-${idx}`}
                                                                className="d-flex position-relative mb-2"
                                                            >
                                                                {/* Timeline line + dot (only if there are 2 or more positions) */}
                                                                {employerGroup.positions.length > 1 && (
                                                                    <div className="position-relative me-3" style={{ width: "20px" }}>
                                                                        {/* Vertical line (only if not last item) */}
                                                                        {idx < employerGroup.positions.length - 1 && (
                                                                            <div
                                                                                style={{
                                                                                    position: "absolute",
                                                                                    top: "12px",
                                                                                    left: "7px",
                                                                                    height: "100%",
                                                                                    width: "2px",
                                                                                    backgroundColor: "#dee2e6",
                                                                                    zIndex: 0,
                                                                                }}
                                                                            />
                                                                        )}

                                                                        {/* Circle (dot) */}
                                                                        <div
                                                                            style={{
                                                                                width: "14px",
                                                                                height: "14px",
                                                                                borderRadius: "50%",
                                                                                backgroundColor: "#6c757d",
                                                                                position: "relative",
                                                                                zIndex: 1,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}

                                                                {/* Position details */}
                                                                <div>
                                                                    <p className="mb-1">
                                                                        <strong>{position.position?.position_name}</strong>

                                                                    </p>
                                                                    <p className="mb-1">

                                                                        {position.industry?.industry_name &&
                                                                            ` ${position.industry.industry_name} Industry`}
                                                                    </p>
                                                                    <p className="text-muted small">
                                                                        {moment(position.start_date).format("MMM YYYY")} -{" "}
                                                                        {position.end_date
                                                                            ? moment(position.end_date).format("MMM YYYY")
                                                                            : "Present"}
                                                                    </p>
                                                                    <div className="mt-2">
                                                                        <p className="mb-1 text-wrap" style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                                                                            <strong>Responsibility:</strong>{" "}
                                                                            <span
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: position.responsibility,
                                                                                }}
                                                                            />
                                                                        </p>

                                                                        {position.remark && (
                                                                            <p className="mb-1">
                                                                                <strong>Reason for Leaving:</strong>{" "}
                                                                                <span
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: position.remark,
                                                                                    }}
                                                                                />
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}


                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

WorkExperienceSection.propTypes = {
    applicant: PropTypes.shape({
        id: PropTypes.number,
        experience: PropTypes.arrayOf(PropTypes.object)
    }),
    isApplicant: PropTypes.bool
};

export default WorkExperienceSection;