import React from "react";
import { Modal, Button ,Image} from "react-bootstrap";

const SearchModalForm = ({
  showModal,
  handleClose,
  modalBodyRef,
  handleScroll,
  filteredJobs,
  loadingMore,
  hasMore,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body
        ref={modalBodyRef}
        onScroll={handleScroll}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <div className="row" style={{ marginTop: "12px" }}>
          {filteredJobs.length === 0 ? (
            <div className="col-md-12">
              <p>No jobs found.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div className="col-md-6 mb-2" key={job.id}>
                <div className="card p-3">
                  <div className="row">
                    <div className="col-md-3">
                      <Image
                        src={`https://ekazi.co.tz/${job.client.logo}`
                          ||
                          "/images/nodata.png"
                        }
                        alt="Logo"
                        style={{ maxWidth: "120px", maxHeight: "75px" }}
                      />
                    </div>
                    <div className="col-md-9 text-truncate">
                      <a
                        className="text-decoration-none"
                        href={`/job/show/${job.id}`}
                        title={job.title}
                      >
                        {job.job_position?.position_name || job.title} - View
                      </a>
                      <br />
                      <span>{job.client?.client_name}</span>
                      <br />
                      <span>
                        {new Date(job.dead_line) < new Date()
                          ? `Expired: ${new Date(
                              job.dead_line
                            ).toLocaleDateString()}`
                          : new Date(job.dead_line).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {loadingMore && (
            <div className="col-12 text-center py-2">
              <small>Loading more jobs...</small>
            </div>
          )}
          {!hasMore && filteredJobs.length > 0 && (
            <div className="col-12 text-center py-2">
              <small>No more jobs to load.</small>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModalForm;
