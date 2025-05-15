import React from "react";
import { Card, Button, Image } from "react-bootstrap";

const RightSideBar = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Featured Companies Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-3">Featured Companies</h5>
          {[1, 2, 3, 4].map((company) => (
            <div key={company} className="d-flex align-items-center gap-3 p-2 hover-shadow-sm rounded">
              <div className="bg-light rounded-circle overflow-hidden" style={{ width: '48px', height: '48px' }}>
                <Image
                  src="/company.jpg"
                  alt="Company Logo"
                  roundedCircle
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h6 className="mb-0 fw-semibold">TechCorp Inc.</h6>
                <small className="text-muted">12 Jobs</small>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Job Alerts Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <h6 className="fw-bold mb-2">Job Alerts</h6>
          <p className="text-muted small mb-3">
            Get notified when new jobs match your profile.
          </p>
          <Button variant="primary" className="w-100">
            Create Job Alert
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RightSideBar;
