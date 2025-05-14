import React, { useState } from 'react';
import { Card, Button, ProgressBar, Accordion, Image, ListGroup } from 'react-bootstrap';

const LeftSideBar = () => {
  const [profileCompletion] = useState(75);
  const [showModalPay, setShowModalPay] = useState(false);

  return (
    <div className="d-flex flex-column gap-3">
      <Card className="shadow-sm">
        {/* Cover image */}
        <div className="position-relative">
          <Card.Img
            variant="top"
            src="/maneno.jpeg"
            className="object-fit-cover"
            style={{ height: '100px', objectFit: 'cover' }}
          />

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

          {/* Upgrade Button */}
          <Button
            className="w-100 mb-3 text-white fw-semibold"
            style={{ background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)' }}
            onClick={() => setShowModalPay(true)}
          >
            🚀 Upgrade to Premium
          </Button>

          {/* Dashboard Section */}
          <h6 className="border-top pt-3 text-start fw-semibold">📊 Dashboard</h6>

          {/* Accordions */}
          <Accordion flush className="border-top pt-3 text-start mb-3">
            {[
              { key: "0", title: "📄 Resume Manager", items: ["Add Resume", "My Resume"] },
              { key: "1", title: "💼 My Jobs", items: ["My Applications", "Saved Jobs"] },
              { key: "2", title: "👤 My Account", items: ["Account Settings", "Change Password"] },
              { key: "3", title: "🔍 My Job Search", items: ["Saved Searches", "Recent Searches"] },
              { key: "4", title: "📚 Resources", items: ["Resume Tips", "Interview Tips"] },
            ].map(section => (
              <Accordion.Item eventKey={section.key} key={section.key}>
                <Accordion.Header>{section.title}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {section.items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <a href="#">{item}</a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeftSideBar;
