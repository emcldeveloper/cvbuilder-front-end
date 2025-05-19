import React, { useState, useRef, useContext } from 'react';  // Import useContext from React
import { Container, Button, Modal } from 'react-bootstrap';
import useJobs from '../../hooks/Jobs/useJobs'; // Hook to get jobs
import SearchModalForm from '../Forms/Job/SearchModalForm'; // Modal component
import { UniversalContext } from '../../context/UniversalContext';  // Import UniversalContext

const JobSearchSection = () => {
  const {
    jobs,
    loading,
    hasMore,
    loadMore,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    loadingMore,
  } = useJobs(); // Using the hook for job-related data

  const { industries } = useContext(UniversalContext);  // Access industries from context

  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [filteredJobs, setFilteredJobs] = useState([]);  // Filtered jobs to show in the modal
  const modalBodyRef = useRef(null);  // To handle the modal body scroll

  // Show the modal and set filtered jobs
  const handleSearch = () => {
    // Filter jobs based on search term and selected industry
    const filtered = jobs.filter((job) => {
      const matchTitle = job.job_position?.position_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchIndustry = selectedIndustry
        ? job.industry_id === parseInt(selectedIndustry)
        : true;

      return matchTitle && matchIndustry;
    });

    setFilteredJobs(filtered);
    setShowModal(true);  // Show modal with search results
  };

  const handleClose = () => {
    setShowModal(false);
    setFilteredJobs([]);  // Reset filtered jobs when closing the modal
  };

  const handleScroll = () => {
    // Infinite scroll handling logic
    const el = modalBodyRef.current;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      loadMore();  // Call to load more jobs when reaching the bottom
    }
  };

  return (
    <Container>
      <div className="search-container">
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
                  {industries && industries.length > 0 ? (
                    industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.industry_name}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading industries...</option>
                  )}
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
      </div>

      {/* Modal with filtered job results */}
      <SearchModalForm
        showModal={showModal}
        handleClose={handleClose}
        modalBodyRef={modalBodyRef}
        handleScroll={handleScroll}
        filteredJobs={filteredJobs}  // Pass filtered jobs here
        loadingMore={loadingMore}
        hasMore={hasMore}
      />
    </Container>
  );
};

export default JobSearchSection;
