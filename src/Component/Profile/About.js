import React from 'react';
import { Pencil } from 'react-bootstrap-icons';
import { Row, Col, Card, Badge } from 'react-bootstrap';

const ApplicantCareerSection = ({ applicant }) => {
   
    
    // Access the first career object from the careers array
    const careerData = applicant?.careers?.[0];
    const skills = applicant?.knowledge || [];
    console.log("Received applicant data skill:", skills);

    return (
        
                    < div>
                        {careerData?.career && (
                            <div className="position-relative">
                                {/* Header with edit button */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title text-primary mb-0">Career Profile</h5>
                                    <Pencil
                                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                        onClick={() => console.log('Edit clicked')}
                                        className="text-muted"
                                    />
                                </div>

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
                     </div>
          
    );
};

export default ApplicantCareerSection;