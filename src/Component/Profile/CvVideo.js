import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CvVideoCard = () => {
  // Demo data
  const applicant = {
    id: 1,
    name: 'Jane Doe',
    title: 'Frontend Developer CV',
    thumbnail: 'https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    addedDate: '2023-01-15'
  };

  const { name, title, thumbnail, videoUrl, addedDate } = applicant;
  
  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [videoData, setVideoData] = useState({
    url: '',
    title: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  // Handle modal open/close
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setVideoData({ url: '', title: '' });
    setPreviewUrl('');
    setIsPreviewReady(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate preview from URL
  const handlePreview = () => {
    if (!videoData.url) return;
    
    let embedUrl = '';
    
    // Handle YouTube URLs
    if (videoData.url.includes('youtube.com') || videoData.url.includes('youtu.be')) {
      let videoId = '';
      
      if (videoData.url.includes('youtube.com')) {
        videoId = videoData.url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (videoData.url.includes('youtu.be')) {
        videoId = videoData.url.split('/').pop();
      }
      
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } 
    // Handle Vimeo URLs
    else if (videoData.url.includes('vimeo.com')) {
      const videoId = videoData.url.split('/').pop();
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    } 
    // Handle direct video URLs
    else if (videoData.url.match(/\.(mp4|webm|ogg)$/i)) {
      embedUrl = videoData.url;
    }
    // Unsupported URL
    else {
      alert('Please enter a valid YouTube, Vimeo, or direct video URL (mp4, webm, ogg)');
      return;
    }
    
    setPreviewUrl(embedUrl);
    setIsPreviewReady(true);
    
    // Auto-generate title if empty
    if (!videoData.title) {
      setVideoData(prev => ({
        ...prev,
        title: 'My CV Video'
      }));
    }
  };

  // Save video data (would connect to your backend)
  const handleSave = () => {
    // Here you would typically send the data to your backend/database
    console.log('Saving video data:', {
      url: videoData.url,
      title: videoData.title,
      previewUrl: previewUrl
    });
    
    // Simulate API call success
    alert(`Video "${videoData.title}" has been saved successfully!`);
    
    // Close the modal
    handleCloseModal();
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="section-title mb-0">
              <b>CV PROFILE VIDEO</b>
            </h6>
            <div className="d-flex gap-2">
              <Button
                variant="link"
                className="p-0 border-0 bg-transparent"
                onClick={handleShowModal}
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
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
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
                borderRadius: '8px'
              }}
              onClick={() => window.open(videoUrl, '_blank')}
            >
              <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
              View Full CV Video
            </div>
          </div>
          
          <div className="mt-3">
            <h6 className="mb-1">{name} - {title}</h6>
            <p className="text-muted mb-1">{videoUrl}</p>
            <p className="mb-0 text-muted">
              <small>Added on {moment(addedDate).format('MMM D, YYYY')}</small>
            </p>
          </div>
        </Card.Body>
      </Card>

      {/* Add Video Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">
          
            Add CV Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="url"
                  placeholder="Paste YouTube, Vimeo, or direct video URL"
                  name="url"
                  value={videoData.url}
                  onChange={handleInputChange}
                  className="me-2"
                />
                <Button variant="primary" onClick={handlePreview}>
                  Preview
                </Button>
              </div>
              <Form.Text className="text-muted">
                Supported: YouTube, Vimeo, MP4, WebM, OGG
              </Form.Text>
            </Form.Group>

            {isPreviewReady && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Video Preview</Form.Label>
                  <div className="ratio ratio-16x9 bg-dark rounded">
                    {previewUrl ? (
                      <iframe
                        src={previewUrl}
                        title="Video preview"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center text-white">
                        <div className="text-center">
                          <FontAwesomeIcon icon={faPlayCircle} size="3x" className="mb-2" />
                          <p>Preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a title for your video"
                    name="title"
                    value={videoData.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={!isPreviewReady}
          >
            Save Video
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CvVideoCard;