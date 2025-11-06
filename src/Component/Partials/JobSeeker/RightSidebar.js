import React, { useEffect, useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { getListOfEmployers } from "../../../Api/Employer/ListOfEmployerApi";
import ChatApp from "../../../pages/ChatSystem/ChatMessage";
import { useNavigate } from "react-router-dom";
import JobAlertsSection from "./Jobalert";
const API_BASE_URL = process.env.REACT_APP_API_URL;


const RightSideBar = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const data = await getListOfEmployers(page, perPage)
        setEmployers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployers();
  }, [page, perPage]); // Re-fetch when page or perPage changes
  console.log("employer list wap", employers);
  return (
    <div className="d-flex flex-column gap-3">
      {/* Featured Companies Section */}
      <Card className="shadow-sm">
        <Card.Body>

          <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 h-24 flex items-center justify-between px-8 rounded-t-lg shadow-md">
            <div>
              <h5 className="text-white text-2xl font-bold tracking-wide">
                Featured Companies
              </h5>
              <div className="mt-1 w-24 h-[3px] bg-white/80 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue/90">Updated Weekly</span>
              <i className="fa-solid fa-building text-white text-lg"></i>
            </div>
          </div>

          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '8px' // Prevents content from touching scrollbar
          }}>
            {employers?.data?.map((company) => (
              <div
                key={company.id}
                className="d-flex align-items-center gap-3 p-2 hover-shadow-sm rounded mb-2"
                style={{
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              >
                <div className="bg-light rounded-circle overflow-hidden" style={{ width: '60px', height: '60px' }}>
                  <a href={`/featured/employer/details/${company.id}`}>
                    <Image
                      src={company.logo ? `https://ekazi.co.tz/${company.logo}` : '/employer.png'}
                      alt={company.client_name}
                      roundedCircle
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'white',
                      }}
                    />
                  </a>
                </div>
                <div className="flex-grow-1">
                  <h6
                    className="mb-0 fw-semibold text-truncate"
                    style={{ maxWidth: '200px', cursor: 'pointer' }}
                    onClick={() => navigate(`/featured/employer/details/${company.id}`)}
                  >
                    {company.client_name} msoft company
                  </h6>

                  {/* Optional job count */}
                  {/* <small className="text-muted">12 Jobs</small> */}
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Job Alerts Section */}
      {/* <Card className="shadow-sm">
        <Card.Body>
          <h6 className="fw-bold mb-2">Job Alerts</h6>
          <p className="text-muted small mb-3">
            Get notified when new jobs match your profile.
          </p>
          <Button variant="primary" className="w-100">
            Create Job Alert
          </Button>
        </Card.Body>
      </Card> */}
      <JobAlertsSection />
      {/* <ChatApp /> */}
    </div>
  );
};

export default RightSideBar;
