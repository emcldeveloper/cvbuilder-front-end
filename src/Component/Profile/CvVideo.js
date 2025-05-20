import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CvVideoCard = () => {
  // Demo data
  const applicant = {
    name: 'Jane Doe',
    title: 'Frontend Developer CV',
    thumbnail: 'https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg', // Example thumbnail
    videoUrl: 'https://youtu.be/h0e2HAPTGF4https://www.youtube.com/watch?v=ysz5S6PUM-U', // Example link
  };

  const { name, title, thumbnail, videoUrl } = applicant;

  return (
   <div>
     <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="section-title mb-0">
                                    <b>CV PROFILE VIDEO</b>
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
        
                            <div className="mb-3 divider" />
                            <div style={{ position: 'relative' }}>
    
    <img
      src={thumbnail || '/default-thumb.jpg'}
      alt="CV Preview"
      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
    />
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        cursor: 'pointer',
      }}
      onClick={() => window.open(videoUrl, '_blank')}
    >
      ▶ View Full CV Video
    </div>
  </div>
   </div>
    

  
  );
};

export default CvVideoCard;
