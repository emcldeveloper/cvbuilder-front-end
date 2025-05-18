import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import FilterJobs from "../../Component/Jobs/FilterJobs";
import MainLayout1 from "../../layouts/MainLayout1";
import SideBarListJobs from "../../Component/Jobs/SideBarListJobs";
import PageHeader from "../../Component/Pages/PageHeader";
import JobDetails from "../../Component/Jobs/JobDetails"; // Import JobDetails Component

const FindJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null); // State to hold the selected job
  const [activeJob, setActiveJob] = useState(null); // State to track active job for highlighting

  return (
    <MainLayout1>
      <PageHeader title="Find Jobs" />
      <Container className="mt-4">
        {/* Filter Section */}
        <Row className="mb-4">
          <Col>
            <FilterJobs />
          </Col>
        </Row>

        {/* Main Content Section */}
        <Row>
          <Col md={5}>
            {/* Sidebar with Job Filters */}
           
             <SideBarListJobs
              setSelectedJob={setSelectedJob} // Pass setSelectedJob function
              setActiveJob={setActiveJob} // Pass setActiveJob function for highlighting active job
              activeJob={activeJob} // Pass activeJob for comparison to highlight selected job
            />
           
          </Col>
          <Col md={7}>
            {/* Job Preview Section */}
            <div className="job-preview">
              {selectedJob ? (
                <JobDetails job={selectedJob} />
              ) : (
                <div>Select a job to view its details</div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default FindJobs;
