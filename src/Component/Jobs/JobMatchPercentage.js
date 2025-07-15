import { useState } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";

const MatchModalButton = ({ matchCount = 4, totalRequirements = 5 }) => {
  const [show, setShow] = useState(false);

  const matchPercentage = Math.round((matchCount / totalRequirements) * 100);

  return (
    <>
      <div className="text-center mt-1 mb-1">
        <button
          type="button"
          className="btn btn-primary px-5 py-1 fw-bold"
          onClick={() => setShow(true)}
        >
          Submit Application
        </button>
      </div>

  <Modal show={show} onHide={() => setShow(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title style={{ fontSize: 'clamp(14px, 3vw, 18px)' }}>
      Application Match Status - <span style={{ color: '#2E58A6', fontWeight: '600' }}>Software Developer</span>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Improved Note Box */}
   <div className="d-flex align-items-center justify-content-between mb-4">
  {/* Left: Warning Description */}
  <div className="alert alert-warning p-3 mb-0" style={{ 
    borderRadius: '8px', 
    flex: 1,
    marginRight: '20px'
  }}>
    <div className="d-flex">
      <div className="me-2">⚠️</div>
      <div>
        <strong className="d-block mb-1">NOTES:</strong>
        <p className="mb-0 small">
          You're missing {4 - Math.floor(matchPercentage/25)} of 4 key requirements. 
          Ensure your details match the job requirements before proceeding or apply anyway.
          {matchPercentage < 80 && " Fix the issues below to boost your chances."}
        </p>
      </div>
    </div>
  </div>

  {/* Right: Circular Progress Graph */}
  <div style={{ minWidth: '120px' }}>
    <div 
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `conic-gradient(#2E58A6 ${matchPercentage}%, #f0f0f0 ${matchPercentage}%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(46, 88, 166, 0.1)'
      }}
    >
      <div 
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#2E58A6'
        }}
      >
        {matchPercentage}%
      </div>
    </div>
    <h6 className="mt-2 text-center" style={{ 
      color: '#2E58A6', 
      fontSize: '0.85rem',
      fontWeight: '500'
    }}>
      {matchPercentage >= 80 ? 'Strong Match' : 'Partial Match'}
    </h6>
  </div>
</div>

    {/* Enhanced Requirements Breakdown */}
  <div className="requirements-breakdown">
  <h6 className="fw-semibold mb-3">Requirements Analysis:</h6>
  
  {/* Scrollable container with max-height */}
  <div 
    className="requirement-container"
    style={{
      maxHeight: '300px',
      overflowY: 'auto',
      paddingRight: '8px',
      scrollbarWidth: 'thin'
    }}
  >
    {/* Requirement Items - now with responsive layout */}
    <div className="requirement-item mb-2 p-2" style={{ 
      background: '#f8f9fa', 
      borderRadius: '6px',
      borderLeft: '3px solid #28a745',
      minWidth: '280px' // Minimum width for mobile
    }}>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <span className="mb-1 mb-md-0">✔️ <strong>Education:</strong> Bachelor's in Computer Science</span>
        <span className="text-success">Matched</span>
      </div>
    </div>

    <div className="requirement-item mb-2 p-2" style={{ 
      background: '#f8f9fa', 
      borderRadius: '6px',
      borderLeft: '3px solid #28a745'
    }}>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <span className="mb-1 mb-md-0">✔️ <strong>Experience:</strong> 3+ years required</span>
        <span className="text-success">Matched (5 years)</span>
      </div>
    </div>

    <div className="requirement-item mb-2 p-2" style={{ 
      background: '#f8f9fa', 
      borderRadius: '6px',
      borderLeft: '3px solid #28a745'
    }}>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <span className="mb-1 mb-md-0">✔️ <strong>Training:</strong> Oracle required</span>
        <span className="text-success">Matched</span>
      </div>
    </div>

    <div className="requirement-item mb-2 p-2" style={{ 
      background: '#fff8f8', 
      borderRadius: '6px',
      borderLeft: '3px solid #dc3545'
    }}>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <span className="mb-1 mb-md-0">❌ <strong>Language:</strong> French proficiency (B2 level)</span>
        <span className="text-danger">Not Met (A2 level)</span>
      </div>
      <div className="mt-1 small text-muted">
        <strong>To match:</strong> Complete B2 certification or add French projects
      </div>
    </div>

    <div className="requirement-item mb-2 p-2" style={{ 
      background: '#fff8f8', 
      borderRadius: '6px',
      borderLeft: '3px solid #dc3545'
    }}>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <span className="mb-1 mb-md-0">❌ <strong>Certification:</strong> AWS Certified</span>
        <span className="text-danger">Missing</span>
      </div>
      <div className="mt-1 small text-muted">
        <strong>To match:</strong> AWS Cloud Practitioner (30-day study plan available)
      </div>
    </div>
  </div>
</div>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between border-top-0 pt-0">
    <Button 
      variant="outline-secondary" 
      onClick={() => setShow(false)}
      style={{ minWidth: '100px' }}
    >
      Cancel
    </Button>
    <div className="d-flex gap-2">
    
      <Button 
        variant={matchPercentage >= 70 ? "primary" : "outline-danger"}
        style={{ minWidth: '140px' }}
      >
        Apply Anyway
      </Button>
    </div>
  </Modal.Footer>
</Modal>
    </>
  );
};

export default MatchModalButton;
