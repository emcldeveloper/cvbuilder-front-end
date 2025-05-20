import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const SoftwareSection = ({ applicant }) => {
    return (
        <div className="personalities-section mt-4">
            {/* Only render if applicant exists */}
            {applicant && (
                <>
                    {/* Section Header */}
                    <div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title mb-0">
                                <b>SOFTWARE & TOOLS</b>
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
                                    to={`/`}
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
                    {applicant.software?.length > 0 && (
                        <Col md={12} className="mt-3">
                            <Row className="g-2">
                                {applicant.software.map((item, index) => (
                                    <Col xs="auto" key={index}>
                                        <div
                                            className="software-tag p-1"
                                            onClick={() => console.log('Edit software')} // Add your edit handler
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.software?.software_name}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                        {applicant.tools?.length > 0 && (
                        <Col md={12} className="mt-3">
                            <Row className="g-2">
                                {applicant.tools.map((item, index) => (
                                    <Col xs="auto" key={index}>
                                        <div
                                            className="software-tag p-1"
                                            onClick={() => console.log('Edit software')} // Add your edit handler
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.tool?.tool_name}
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
        .software-tag {
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

export default SoftwareSection;