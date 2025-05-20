import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PersonalitiesSection = ({ applicant }) => {
    return (
        <div className="personalities-section mt-4">
            {/* Only render if applicant exists */}
            {applicant && (
                <>
                    {/* Section Header */}
                    <div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title mb-0">
                                <b>PERSONALITY TRAITS</b>
                            </h6>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="link"

                                    className="p-0 border-0 bg-transparent"
                                >
                                    <Plus
                                        style={{ fontSize: '1.5rem' }}
                                        className="text-muted"
                                    />
                                </Button>

                                <Link
                                    to={`/detail-exprience?expd=${applicant.id}`}
                                >
                                    <Pencil
                                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                        className="text-muted"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="mb-3 mt-2 divider"></div>
                    </div>

                    {/* Personalities List */}
                    {applicant.applicant_personality?.length > 0 && (
                        <Col md={12} className="mt-3">
                            <Row className="g-2">
                                {applicant.applicant_personality.map((item, index) => (
                                    <Col xs="auto" key={index}>
                                        <div
                                            className="personality-tag p-1"
                                            onClick={() => console.log('Edit personalities')} // Add your edit handler
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.personality?.personality_name}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                </>
            )}

            {/* Style */}
            <style jsx>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .personality-tag {
          border: 1px solid rgb(226, 226, 226);
          border-radius: 5px;
          margin-right: 8px;
          margin-bottom: 8px;
          transition: all 0.2s;
        }
        .personality-tag:hover {
          background-color: #f8f9fa;
          border-color: #dee2e6;
        }
      `}</style>
        </div>
    );
};

export default PersonalitiesSection;