import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UniversalContext } from '../../context/UniversalContext';
import { getJobs } from '../../Api/Job/FeactureJob'; // 🔁 New import

const JobSearchSection = () => {
  const { industries, loading } = useContext(UniversalContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data.jobs || response.data); // depends on your API shape
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchTitle = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchIndustry = selectedIndustry
        ? job.industry_id === parseInt(selectedIndustry)
        : true;
      return matchTitle && matchIndustry;
    });

    setFilteredJobs(filtered);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="w-100">
      <style>{`
        .customForm {
          border: 1px solid #D7D8DA50;
        }
        .customForm:focus {
          border: 2px solid #2E58A6;
        }
      `}</style>

      <div className="row">
        <div className="col-md-12">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control rounded customForm"
                placeholder="What are you looking for..."
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="">Select Category</option>
                {!loading &&
                  industries?.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.industry_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-warning text-white"
                style={{ border: 'none', backgroundColor: '#D36314', width: '100%' }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" style={{ zIndex: 9998, overflow: 'visible', marginTop: '12px' }}>
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
                        <img
                          src={
                            job.logo ||
                            job.client?.logo ||
                            '/images/nodata.png'
                          }
                          alt="Logo"
                          style={{ maxWidth: '120px', maxHeight: '75px' }}
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
                            ? `Expired: ${new Date(job.dead_line).toLocaleDateString()}`
                            : new Date(job.dead_line).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobSearchSection;
