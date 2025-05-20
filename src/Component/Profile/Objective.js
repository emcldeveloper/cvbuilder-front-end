import React, { useState, useEffect } from 'react';
import { 
  Row, Col, Card, Modal, Form, Button,
  OverlayTrigger, Tooltip, Badge
} from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { profile } from '../../Api/Jobseeker/JobSeekerProfileApi';
import axios from 'axios';
import ObejctiveModelForm from '../Forms/JobSeeker/ObjectiveModelForm';

const CareerObjectivesSection = ({ applicant, isApplicant }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/applicant/objectives/add', {
        objective: objective
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      });

      // Handle success
      console.log('Success:', response.data);
      // You would typically update the parent state here or refetch data
      handleCloseEdit();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(`/api/applicant/objectives/${applicant?.objective?.id}`);
      // Handle success
      console.log('Deleted:', response.data);
      // Update parent state or refetch data
      handleCloseDelete();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      
          <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
            <Card.Title className="text-primary mb-0">
              <h5>Career Objectives</h5>
            </Card.Title>
            
           
              <div className="d-flex">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Edit Objective</Tooltip>}
                >
                  <Button 
                    variant="link" 
                    className="text-dark p-0 me-2"
                    onClick={handleShowEdit}
                  >
                    <Pencil size={18} />
                  </Button>
                </OverlayTrigger>
                
                
              </div>
          
          </div>
          
          <hr className="border-primary" />

          {/* Objective Content */}
          <div className="mb-3">
            {applicant?.objective?.objective ? (
              <p style={{ whiteSpace: 'pre-line' }}>{applicant.objective.objective}</p>
            ) : (
              <p className="text-muted">No career objective added yet</p>
            )}
          </div>
        

      {/* Edit Objective Modal - Smaller size */}
      <ObejctiveModelForm applicant={applicant}/>
     
    </>
  );
};

export default CareerObjectivesSection;