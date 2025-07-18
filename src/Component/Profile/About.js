import React, { useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import CareerModelForm from '../Forms/JobSeeker/CareerForm';

const ApplicantCareerSection = ({ applicant }) => {


    // Access the first career object from the careers array
    const careerData = applicant?.careers?.[0];
    const skills = applicant?.knowledge || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("Received applicant data skill:", skills);

    const handleOpenModel = () => {
        setIsModalOpen(true);
    }

    return (

        < div>
            {careerData?.career && (
                <div className="position-relative mt-10">
                    {/* Header with edit button */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="card-title   mb-0">CAREER PROFILE</h6>
                        <Pencil
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            onClick={handleOpenModel}
                            className="text-muted"
                        />
                    </div>
                    <CareerModelForm isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        applicant={applicant}
                    />


                    <div className="mb-3 divider" />
                    {/* Career summary */}
                    <div className="mb-4">
                        <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
                            {careerData.career}
                        </p>
                    </div>

                    {/* Skills section - only show if skills exist */}
                    {skills.length > 0 && (
                        <Card className="border-0" style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px'
                        }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Card.Subtitle className="text-primary">
                                        <strong>Top Skills</strong>
                                    </Card.Subtitle>

                                </div>

                                <div className="d-flex flex-wrap gap-2">
                                    {skills.slice(0, 4).map((item, index) => (
                                        <Badge
                                            key={index}
                                            bg="light"
                                            text="dark"
                                            className="px-3 py-2 rounded-pill"
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {item?.knowledge?.knowledge_name}
                                        </Badge>
                                    ))}
                                    {skills.length > 4 && (
                                        <Badge
                                            bg="secondary"
                                            className="px-3 py-2 rounded-pill"
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            +{skills.length - 4} more
                                        </Badge>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            )}
            <style jsx>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
     
        }
      `}</style>
        </div>

    );
};

export default ApplicantCareerSection;