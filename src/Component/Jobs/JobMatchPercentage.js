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
          <Modal.Title>Application Match Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2 text-center fw-semibold">
            You meet <span className="text-success">{matchCount}</span> out of{" "}
            <span className="text-dark">{totalRequirements}</span> job requirements.
          </p>
          <ProgressBar now={matchPercentage} label={`${matchPercentage}% Match`} />
          <div className="mt-3">
            <ul className="list-group list-group-flush small">
              <li className="list-group-item">✔️ Education: Matched</li>
              <li className="list-group-item">✔️ Industry: Matched</li>
              <li className="list-group-item">✔️ Experience: Matched</li>
              <li className="list-group-item">❌ Language: Not Matched</li>
              <li className="list-group-item">✔️ Skills: Matched</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary">Edit</Button>
        <Button variant="primary">Apply Anyway</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MatchModalButton;
