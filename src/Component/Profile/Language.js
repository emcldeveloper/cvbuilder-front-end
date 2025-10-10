import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AddLanguageModal from '../Forms/JobSeeker/Language';

const LanguagesSection = ({ applicant, isApplicant, encryptedApplicantId }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [IsOpenModel, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        language: '',
        read: '',
        write: '',
        speak: '',
        understand: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setShowAddModal(false);
    };


    const handleOpenLnagugae = () => {
        setIsModalOpen(true);
    }
    const CloseModelLnaguage = () => {
        setIsModalOpen(false);
    }



    return (
        <div className="languages-section mb-4 mt-2">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="section-title mb-0">
                    <b>LANGUAGES</b>
                </h6>
                <div className="d-flex gap-2">
                    <Button
                        variant="link"
                        onClick={handleOpenLnagugae}
                        className="p-0 border-0 bg-transparent"
                    >
                        <Plus
                            style={{ fontSize: '1.5rem' }}
                            className="text-muted"
                        />
                    </Button>
                    <AddLanguageModal show={IsOpenModel} onHide={CloseModelLnaguage} />
                    <Link
                        to={`/jobseeker/Edit-Language`}
                    >
                        <Pencil
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            className="text-muted"
                        />
                    </Link>
                </div>
            </div>
            <div className="divider mb-3" />

            {/* Languages Table */}
            {applicant?.language?.length > 0 ? (
                <div className="table-responsive">
                    <Table borderless className="mb-0">
                        <thead>
                            <tr>
                                <th className="text-black fw-bold">Language</th>
                                <th className="text-black fw-bold">Read</th>
                                <th className="text-black fw-bold">Write</th>
                                <th className="text-black fw-bold">Speak</th>
                                <th className="text-black fw-bold">Understand</th>
                            </tr>
                        </thead>

                        <tbody>
                            {applicant.language.map((ability, index) => (
                                <React.Fragment key={index}>
                                    <tr className="language-row">
                                        <td className="p-1">{ability.language?.language_name}</td>
                                        <td className="p-1">{ability.read?.read_ability}</td>
                                        <td className="p-1">{ability.write?.write_ability}</td>
                                        <td className="p-1">{ability.speak?.speak_ability}</td>
                                        <td className="p-1">{ability.understand?.understand_ability}</td>
                                    </tr>

                                    {index < applicant.language.length - 1 && (
                                        <tr>
                                            <td colSpan={5} className="border-top"></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <p className="text-muted">No languages added</p>
            )}

            {/* Add Language Modal */}
            {/* <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Language</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 row">
                            <Form.Label column sm={3}>Language</Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Language</option>
                               
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row">
                            <Form.Label column sm={3}>Read <span className="text-danger">*</span></Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="read"
                                    value={formData.read}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Read Ability</option>
                                    
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row">
                            <Form.Label column sm={3}>Write <span className="text-danger">*</span></Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="write"
                                    value={formData.write}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Write Ability</option>
                                  
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row">
                            <Form.Label column sm={3}>Speak <span className="text-danger">*</span></Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="speak"
                                    value={formData.speak}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Speak Ability</option>
                                   
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row">
                            <Form.Label column sm={3}>Understand <span className="text-danger">*</span></Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="understand"
                                    value={formData.understand}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Understand Ability</option>
                                   
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal> */}

            <style jsx>{`
        .text-orange {
          color: orange;
        }
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .language-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
        </div>
    );
};

export default LanguagesSection;