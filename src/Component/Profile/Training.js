import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { Pencil, Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AddTrainingModal from '../Forms/JobSeeker/Training';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const TrainingWorkshops = ({ applicant, showAddModal, showEditModal }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const getFileNameFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    const fullName = parts[parts.length - 1];
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1) return fullName;

    const name = fullName.substring(0, lastDotIndex);
    const extension = fullName.substring(lastDotIndex);

    const shortenedName = name.length > 10
      ? `${name.substring(0, 7)}...`
      : name;

    return `${shortenedName}${extension}`;
  };
  const [IsOpenModel ,setIsOpenModel]=useState(false);
   const handleOpenModelTraining =()=>{
    setIsOpenModel(true);
    
   }

  return (
    <div className="training-section mt-3">
      {/* Training Header */}
      {applicant?.training && (
        <div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="section-title mb-0">
              <b>TRAININGS & WORKSHOPS</b>
            </h6>
            <div className="d-flex gap-2">
              <Button
                variant="link"

                className="p-0 border-0 bg-transparent"
                onClick={handleOpenModelTraining}
              >
                <Plus
                  style={{ fontSize: '1.5rem' }}
                  className="text-muted"
                />
              </Button>
               <AddTrainingModal  show={IsOpenModel}  onHide={()=>{setIsOpenModel(false)}}/>
              <Link
                to={`/jobseeker/Edit-Training`}
              >
                <Pencil
                  style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                  className="text-muted"
                />
              </Link>
            </div>
          </div>


          <div className="mb-3 divider" />

          {/* Training List */}
          <div className="training-list">
            {applicant.training.length > 0 ? (
              applicant.training.map((training, index) => (
                <div key={index} className="d-flex mb-3 training-item">
                  <div className="me-3 mt-1">
                   <MenuBookOutlinedIcon sx={{ fontSize: 40, color: '#2E58A6' }} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0 fw-bold">
                        {training.name} - {' '}
                        <span className="fw-light text-muted">
                          {formatDate(training.started)} - {formatDate(training.ended)}
                        </span>
                      </h6>

                    </div>
                    <p className="mb-0">
                      {training.institution}
                    </p>

                    {training.attachment && (
                      <div className="mt-1">
                        <a
                          href={training.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none small"
                        >
                          <FontAwesomeIcon icon={faDownload} className="me-1" />
                          {getFileNameFromUrl(training.attachment)}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-2 text-muted">
                No trainings or workshops added
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .training-item {
          transition: background-color 0.2s;
          padding: 8px;
          border-radius: 4px;
        }
        .training-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default TrainingWorkshops;