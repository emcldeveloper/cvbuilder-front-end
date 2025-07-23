import React, { useState } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EditSkillsModal from '../Forms/JobSeeker/Skills';

const KnowledgesSection = ({ applicant, onEdit, onAdd }) => {
    const [IsOpenModel, setIsOpenModel] = useState(false);

    const handleSkillModel = () => {
        setIsOpenModel(true);
    }

    const handleSkilledClose = () => {
        setIsOpenModel(false);
    }

    return (
        <div className="knowledges-section mt-4  ">

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="section-title mb-0">
                    <b>KEY SKILLS & COMPETEMCIES</b>
                </h6>
                <div className="d-flex gap-2">
                    <Link
                        onClick={handleSkillModel}
                    >
                        <Pencil
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            className="text-muted"
                        />
                    </Link>
                </div>
            </div>
            <EditSkillsModal show={IsOpenModel} onHide={handleSkilledClose}
            />
            <div className="mb-3 divider" />



            {applicant?.knowledge?.length > 0 ? (
                <Row className="g-2">
                    {applicant.knowledge.map((item, index) => (
                        <Col xs="auto" key={index}>

                            <div
                                className="personality-tag p-1"

                                style={{ cursor: 'pointer' }}
                            >
                                {item.knowledge?.knowledge_name}
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
export default KnowledgesSection;