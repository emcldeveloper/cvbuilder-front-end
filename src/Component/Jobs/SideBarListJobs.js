import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container, Button, Spinner, Alert } from "react-bootstrap";
import useJobs from "../../hooks/Jobs/useJobs"; // Assuming the path is correct
import "../../css/Jobs/SideBarListJobs.css"; // Import your CSS file

const SideBarListJobs = ({
  setSelectedJob,
  setActiveJob,
  activeJob,
  selectedTime,
  selectedJobType,
  selectedCountry,
  selectedRegion,
  selectedSubLocation,
  selectedPositionLevel,
  searchKeyword
}) => {
  const [page, setPage] = useState(1);
  const {
    jobs,
    loading,
    error,
    hasMore,
    loadMore,
    loadingMore, // Track the "Load More" loading state
  } = useJobs(page); // Use the custom hook, passing the current page

  // Function to apply all filters
const applyFilters = (jobs) => {
  return jobs.filter((job) => {
    const jobTitle = job.job_position?.position_name || "";
    const jobTypeId = String(job.job_type?.id || job.type_id || "");
    const positionLevelId = String(job.position_level?.id || job.position_level_id || "");
    const publishDate = new Date(job.publish_date);

    const address = job.job_addresses?.[0] || {};
    const subLocation = address.sub_location || "";
    const regionId = String(address.region?.id || "");
    const countryId = String(address.region?.country?.id || "");

    // === Search Keyword ===
    if (searchKeyword?.trim() && !jobTitle.toLowerCase().includes(searchKeyword.toLowerCase())) return false;

    // === Time Filter ===
    if (selectedTime && selectedTime !== "" && selectedTime !== "Any Time") {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(selectedTime));
      if (publishDate < daysAgo) return false;
    }

    // === Job Type ===
    if (selectedJobType && selectedJobType !== "" && selectedJobType !== "Any Type" && selectedJobType !== jobTypeId) return false;

    // === Position Level ===
    if (selectedPositionLevel && selectedPositionLevel !== "" && selectedPositionLevel !== "Any Level" && selectedPositionLevel !== positionLevelId) return false;

    // === Country ===
    if (selectedCountry && selectedCountry !== "" && selectedCountry !== countryId) return false;

    // === Region ===
    if (selectedRegion && selectedRegion !== "" && selectedRegion !== regionId) return false;

    // === Sub-location ===
    if (selectedSubLocation && selectedSubLocation !== "" && selectedSubLocation.toLowerCase() !== subLocation.toLowerCase()) return false;

    return true;
  });
};


  // Filtered jobs
  const filteredJobs = applyFilters(jobs);

  // Handle job click for details
  const handleJobClick = (job) => {
    setActiveJob(job); // Set the clicked job as active for highlighting
    setSelectedJob(job); // Set the clicked job as selected to pass to parent component
  };

  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Handle loading and error states
  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs. Please try again later.</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          {/* Wrapper Card for job listings */}
          <Card className="sticky-card">
            <Card.Body>
              <h5 className="mb-3">{filteredJobs.length} Jobs Found.</h5>
              <hr className="full-width" />

              {/* Scrollable container for job list */}
              <div
                style={{
                  maxHeight: "400px", // Keep this value for scrollable container
                  overflowY: "auto",
                  marginBottom: "10px",
                  paddingRight: "10px",
                }}
              >
                {/* Mapping through the filtered job list */}
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-item mb-3 ${activeJob?.id === job.id ? "active" : ""}`} // Add active class for selected job
                    onClick={() => handleJobClick(job)} // Handle job click
                  >
                    <Row className="d-flex align-items-center">
                      {/* Job Image */}
                      <Col xs={3}>
                        <img
                          src={`https://ekazi.co.tz/${job.client.logo}` || "default-image-url.jpg"} // Use default image if no logo available
                          alt={job.title}
                          style={{
                            width: "100%", // Set width to 100% of the column
                            height: "100px", // Set fixed height to keep logos consistent
                            objectFit: "contain", // Maintain aspect ratio
                            objectPosition: "center", // Center the image
                          }}
                        />
                      </Col>

                      {/* Job Details */}
                      <Col xs={9}>
                        <p className="job-position">
                          {capitalizeWords(job.job_position.position_name || "Position not provided")}
                        </p>
                        <p className="job-company">{capitalizeWords(job.client.client_name || "No company name")}</p>

                        {/* Displaying job location and country */}
                        <p className="job-location">
                          {capitalizeWords(job.job_addresses[0]?.sub_location || "Address not provided")}, 
                          {capitalizeWords(job.job_addresses[0]?.region?.region_name || "Location not provided")}, 
                          {capitalizeWords(job.job_addresses[0]?.region?.country?.name || "Country not provided")}
                        </p>
                        <p className="job-posted">{new Date(job.publish_date).toLocaleDateString()}</p>
                      </Col>
                    </Row>
                    <hr className="full-width" />
                  </div>
                ))}

                {/* Show loading spinner when more jobs are being fetched */}
                {loading && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {/* Show Load More button if there are more jobs to load */}
                {!loading && hasMore && !loadingMore && (
                  <div className="text-center my-4">
                    <Button onClick={loadMore}>Load More</Button>
                  </div>
                )}

                {/* Show the spinner when loading more jobs */}
                {loadingMore && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {/* Show a message if no more jobs are available */}
                {!loading && !hasMore && (
                  <div className="text-center my-4">
                    <Alert variant="info">No more jobs to load.</Alert>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarListJobs;
