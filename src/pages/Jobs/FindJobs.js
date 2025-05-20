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

  // Filter states to be lifted to the parent component (FindJobs)
  const [selectedTime, setSelectedTime] = useState("Any Time");
  const [selectedJobType, setSelectedJobType] = useState("Any Type");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedPositionLevel, setSelectedPositionLevel] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");


  return (
    <MainLayout1>
      <PageHeader title="Find Jobs" />
      <Container className="mt-4" style={{ minHeight: "100vh" }}> {/* Ensures the container has enough height for scrolling */}
        {/* Filter Section */}
        <Row className="mb-4">
          <Col>
            <FilterJobs
              searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
              selectedTime={selectedTime} setSelectedTime={setSelectedTime}
              selectedJobType={selectedJobType} setSelectedJobType={setSelectedJobType}
              selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
              selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}
              selectedSubLocation={selectedSubLocation} setSelectedSubLocation={setSelectedSubLocation}
              selectedPositionLevel={selectedPositionLevel} setSelectedPositionLevel={setSelectedPositionLevel}
            />
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
              selectedTime={selectedTime} // Pass filter state
              setSelectedTime={setSelectedTime}
              selectedJobType={selectedJobType}
              setSelectedJobType={setSelectedJobType}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedSubLocation={selectedSubLocation}
              setSelectedSubLocation={setSelectedSubLocation}
              selectedPositionLevel={selectedPositionLevel}
              setSelectedPositionLevel={setSelectedPositionLevel}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
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
