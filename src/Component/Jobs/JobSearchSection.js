import React, { useState, useEffect, useContext, useRef } from 'react';
import {Container} from 'react-bootstrap';
import { UniversalContext } from '../../context/UniversalContext';
import { getJobs } from '../../Api/Job/FeactureJob';
import SearchModalForm from '../Forms/Job/SearchModalForm';

const JobSearchSection = () => {
  const { industries, loading } = useContext(UniversalContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const modalBodyRef = useRef(null);
  const LIMIT = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs(LIMIT, 1);
        setJobs(response);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
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
    setPage(2); // Next page will be 2
    setHasMore(true);
    setShowModal(true);
  };

  const loadMoreJobs = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const moreJobs = await getJobs(LIMIT, page);
      if (moreJobs.length < LIMIT) {
        setHasMore(false);
      }
      setFilteredJobs(prev => [...prev, ...moreJobs]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Failed to load more jobs', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    const el = modalBodyRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      loadMoreJobs();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFilteredJobs([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <Container>
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

      {/* Modal with infinite scroll */}
     <SearchModalForm
  showModal={showModal}
  handleClose={handleClose}
  modalBodyRef={modalBodyRef}
  handleScroll={handleScroll}
  filteredJobs={filteredJobs}
  loadingMore={loadingMore}
  hasMore={hasMore}
/>
    </div>
    </Container>

  );
};

export default JobSearchSection;
