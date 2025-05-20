import React, { useEffect, useState } from "react";
import {
    Row, Col, Card, Modal, Form, Button,
    OverlayTrigger, Tooltip, Badge
} from 'react-bootstrap';

const ObejctiveModelForm = ({ applicant }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [objective, setObjective] = useState(applicant?.objective?.objective || '');
    const [charCount, setCharCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Character counter for textarea
    useEffect(() => {
        setCharCount(objective.length);
    }, [objective]);

    const handleShowEdit = () => setShowEditModal(true);
    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowDelete = () => setShowDeleteModal(true);
    const handleCloseDelete = () => setShowDeleteModal(false);
    return (
        <div>
            <Modal show={showEditModal} onHide={handleCloseEdit} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Career Objectives</Modal.Title>
                </Modal.Header>
                <Form  >
                    <Modal.Body>
                        <Form.Group controlId="objectiveTextarea">
                            <Form.Label>Career Objective <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                                maxLength={300}
                                placeholder="Start typing..."
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    boxShadow: 'inset 0 0 0.25rem #ddd'
                                }}
                            />
                            <div className="text-end mt-2">
                                <small className="text-muted">
                                    <span>{charCount}</span>
                                    <span>/ 300</span>
                                </small>
                            </div>
                            {error && <div className="text-danger mt-2">{error}</div>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            disabled={isSubmitting || !objective.trim()}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDelete} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Objective</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-danger">
                        Career objective will be deleted! <br />
                        Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                       
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ObejctiveModelForm