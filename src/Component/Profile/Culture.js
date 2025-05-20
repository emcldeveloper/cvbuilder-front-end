import React from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CulturesSection = ({ applicant, onEdit, onAdd }) => {
    return (
        <div className="knowledges-section mt-4  ">
           
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="section-title mb-0">
                    <b>WORK COMPATIBILITY PROFILE</b>
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

            <div className="mb-3 divider" />

            

            {applicant?.culture?.length > 0 ? (
                <Row className="g-2">
                    {applicant.culture.map((item, index) => (
                        <Col xs="auto" key={index}>

                            <div
                                className="personality-tag p-1"

                                style={{ cursor: 'pointer' }}
                            >
                               {item.culture?.culture_name}
                            </div>
                        </Col>
                    ))}
                </Row>


            ) : (
                <div className="text-muted">No knowledges added yet</div>
            )}
            

            <style jsx>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
      `}</style>
        </div>
    );
};
export default CulturesSection;