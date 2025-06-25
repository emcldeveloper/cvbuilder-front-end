import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Container, Button, Spinner, Alert } from "react-bootstrap";
import useJobs from "../../hooks/Jobs/useJobs";
import "../../css/Jobs/SideBarListJobs.css";

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
  selectedIndustry,
  searchKeyword
}) => {
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasMore, loadMore, loadingMore } = useJobs(page);

  // 🟡 This ref tracks whether the first/default selection has already happened
  const hasUserSelected = useRef(false);

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
      const industryId = String(job.industry?.id || job.industry_id || "");

      if (searchKeyword?.trim() && !jobTitle.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
      if (selectedTime && selectedTime !== "Any Time") {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(selectedTime));
        if (publishDate < daysAgo) return false;
      }
      if (selectedJobType && selectedJobType !== "Any Type" && selectedJobType !== jobTypeId) return false;
      if (selectedPositionLevel && selectedPositionLevel !== "Any Level" && selectedPositionLevel !== positionLevelId) return false;
      if (selectedCountry && selectedCountry !== countryId) return false;
      if (selectedRegion && selectedRegion !== regionId) return false;
      if (selectedSubLocation && selectedSubLocation.toLowerCase() !== subLocation.toLowerCase()) return false;
      if (selectedIndustry && selectedIndustry !== industryId) return false;

      return true;
    });
  };

  const filteredJobs = applyFilters(jobs);

  // ✅ Auto-select first job once, unless the user has already selected manually
  useEffect(() => {
    if (filteredJobs.length > 0 && !hasUserSelected.current) {
      const firstJob = filteredJobs[0];
      setActiveJob(firstJob);
      setSelectedJob(firstJob);
    }
  }, [filteredJobs, setActiveJob, setSelectedJob]);

  const handleJobClick = (job) => {
    hasUserSelected.current = true; // Mark that the user has interacted
    setActiveJob(job);
    setSelectedJob(job);
  };

  const capitalizeWords = (text) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs. Please try again later.</div>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">{filteredJobs.length} Jobs Found</h5>
              <hr className="full-width" />
              <div
                style={{
                  maxHeight: "600px", // Increased height
                  overflowY: "auto",
                  marginBottom: "10px",
                  paddingRight: "10px",
                }}
              >
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-item mb-3 ${activeJob?.id === job.id ? "active" : ""}`}
                    onClick={() => handleJobClick(job)}
                    style={{ cursor: "pointer" }}
                  >
                    <Row className="d-flex align-items-center">
                      <Col xs={3}>
                        <img
                          src={`https://ekazi.co.tz/${job.client?.logo}` || "default-image-url.jpg"}
                          alt={job.title}
                          style={{
                            width: "100%",
                            height: "100px",
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </Col>
                      <Col xs={9}>
                        <p className="job-position">
                          <b>  {capitalizeWords(job.job_position?.position_name || "Position not provided")}</b>
                        
                        </p>
                        <p className="job-company">
                          {capitalizeWords(job.client?.client_name || "No company name")}
                        </p>
                        <p className="job-location">
                          {capitalizeWords(job.job_addresses[0]?.sub_location || "Address not provided")},{" "}
                          {capitalizeWords(job.job_addresses[0]?.region?.region_name || "Region not provided")},{" "}
                          {capitalizeWords(job.job_addresses[0]?.region?.country?.name || "Country not provided")}
                        </p>
                        <p className="job-posted">
                          {new Date(job.publish_date).toLocaleDateString()}
                        </p>
                      </Col>
                    </Row>
                    <hr className="full-width" />
                  </div>
                ))}

                {loading && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {!loading && hasMore && !loadingMore && (
                  <div className="text-center my-4">
                    <Button onClick={loadMore}>Load More</Button>
                  </div>
                )}

                {loadingMore && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

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
