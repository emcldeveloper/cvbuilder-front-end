import React, { useState } from 'react';
import { Card, Button, ProgressBar, Accordion, Image, ListGroup } from 'react-bootstrap';

const LeftSideBar = () => {
  const [profileCompletion] = useState(75); // Static value for now
  const [showModalPay, setShowModalPay] = useState(false);

  return (
    <div className="col-12 col-lg-3 d-flex flex-column gap-3">
      <Card className="shadow-sm">
        {/* Cover image */}
        <div className="position-relative">
          <Card.Img variant="top" src="/maneno.jpeg" className="object-fit-cover" style={{ height: '100px' }} />

          {/* Profile image */}
          <div className="position-absolute" style={{ bottom: '-40px', left: '16px' }}>
            <div className="position-relative">
              <Image
                src="/msoft.JPEG"
                roundedCircle
                className="border border-4 border-white shadow"
                style={{ width: '96px', height: '96px', objectFit: 'cover' }}
              />
              <Button
                variant="primary"
                size="sm"
                className="position-absolute bottom-0 end-0 rounded-circle p-1"
                onClick={() => window.location.href = '/edit-profiles'}
              >
                ✏️
              </Button>
            </div>
          </div>
        </div>

        {/* Card body */}
        <Card.Body className="text-center mt-5">
          <h5 className="fw-bold">Halidi Maneno</h5>
          <p className="text-muted mb-1">Machine Learning Engineering</p>
          <p className="text-muted small">Exactmanpower Consult LTD</p>

          {/* Profile Completion */}
          <div className="text-start mb-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <ProgressBar now={profileCompletion} variant="success" />
          </div>

          {/* Upgrade button */}
          <Button
            variant="gradient"
            className="w-100 mb-3 bg-gradient bg-purple text-white fw-semibold"
            onClick={() => setShowModalPay(true)}
          >
            🚀 Upgrade to Premium
          </Button>

          {/* Dashboard Section */}
          <h6 className="border-top pt-3 text-start fw-semibold">
            📊 Dashboard
          </h6>

          {/* Accordions */}
          <Accordion flush className="border-top pt-3 text-start mb-3">
            {/* Resume Manager */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>📄 Resume Manager</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="#">Add Resume</a></ListGroup.Item>
                  <ListGroup.Item><a href="#">My Resume</a></ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* My Jobs */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>💼 My Jobs</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="#">My Applications</a></ListGroup.Item>
                  <ListGroup.Item><a href="#">Saved Jobs</a></ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* My Account */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>👤 My Account</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="#">Account Settings</a></ListGroup.Item>
                  <ListGroup.Item><a href="#">Change Password</a></ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* My Job Search */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>🔍 My Job Search</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="#">Saved Searches</a></ListGroup.Item>
                  <ListGroup.Item><a href="#">Recent Searches</a></ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* Resources */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>📚 Resources</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="#">Resume Tips</a></ListGroup.Item>
                  <ListGroup.Item><a href="#">Interview Tips</a></ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeftSideBar;
