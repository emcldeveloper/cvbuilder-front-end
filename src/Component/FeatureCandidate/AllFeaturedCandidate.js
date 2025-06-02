import React, { useState } from "react";
import { Row, Col, Container, Spinner, Alert, Form, Button } from "react-bootstrap";
import AllFeatureCandidateCard from "./AllFeatureCandidateCard";
import useFeaturedJobSeekers from "../../hooks/Candidate/FeaturedJobSeeker";

const AllFeaturedCandidate = () => {
  const { jobSeekers, loading, error } = useFeaturedJobSeekers();
  const [visibleCount, setVisibleCount] = useState(9);

  const [filters, setFilters] = useState({
    skills: [],
    level: "",
    experience: "",
    industry: "",
    title: "",
    education: "",
    ageFrom: "",
    ageTo: "",
    gender: "",
    region: "",
    country: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFilters({ ...filters, skills: selectedOptions });
  };

  const clearFilters = () => {
    setFilters({
      skills: [],
      level: "",
      experience: "",
      industry: "",
      title: "",
      education: "",
      ageFrom: "",
      ageTo: "",
      gender: "",
      region: "",
      country: ""
    });
  };

  const filteredCandidates = jobSeekers.filter(candidate => {
    return (
      (filters.skills.length === 0 || candidate.applicant.skills?.some(skill => filters.skills.includes(skill.id.toString()))) &&
     (!filters.title || candidate.applicant?.positions?.some(pos =>
        pos.position_name?.toLowerCase().includes(filters.title.toLowerCase())
))
&&
      (!filters.level || candidate.applicant.positions?.some(pos => pos.level?.id?.toString() === filters.level)) &&
      (!filters.experience || candidate.applicant.experience?.toString() === filters.experience) &&
      (!filters.industry || candidate.applicant.positions?.some(pos => pos.industry?.id?.toString() === filters.industry)) &&
      (!filters.education || candidate.applicant.education?.toString() === filters.education) &&
      (!filters.gender || candidate.applicant.gender_id?.toString() === filters.gender) &&
      (!filters.region || candidate.applicant.address?.region_id?.toString() === filters.region) &&
      (!filters.country || candidate.applicant.address?.region?.country_id?.toString() === filters.country) &&
      (!filters.ageFrom || candidate.applicant.age >= parseInt(filters.ageFrom)) &&
      (!filters.ageTo || candidate.applicant.age <= parseInt(filters.ageTo))
    );
  });

  return (
    <Container>
      <h4 className="text-center" style={{ color: "#2E58A6", marginTop: "2%" }}>
        Featured Candidate
      </h4>
      <br />
      <Row>
        <Col md={3}>
          <div className="bg-white p-3" style={{ borderRadius: 8, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-primary fw-bold">Filters</h6>
              <span
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={clearFilters}
              >
                Clear All
              </span>
            </div>
            <hr />

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Skills</Form.Label>
              <Form.Select name="skills" multiple value={filters.skills} onChange={handleMultiSelectChange}>
                <option value="1">React</option>
                <option value="2">Node.js</option>
                <option value="3">Python</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Position Level</Form.Label>
              <Form.Select name="level" value={filters.level} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="9">Senior</option>
                <option value="7">Junior</option>
                <option value="8">Mid level</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Experience</Form.Label>
              <Form.Select name="experience" value={filters.experience} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3+ years</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Industry</Form.Label>
              <Form.Select name="industry" value={filters.industry} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="19736">Tech</option>
                <option value="19723">Health</option>
                <option value="41972">Finance</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Title</Form.Label>
              <Form.Control
                name="title"
                value={filters.title}
                onChange={handleInputChange}
                placeholder="Type position title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Education</Form.Label>
              <Form.Select name="education" value={filters.education} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="1">Diploma</option>
                <option value="2">Bachelor</option>
                <option value="3">Master</option>
              </Form.Select>
            </Form.Group>

         

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Gender</Form.Label>
              <Form.Select name="gender" value={filters.gender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Region</Form.Label>
              <Form.Select name="region" value={filters.region} onChange={handleInputChange}>
                <option value="">Select Region</option>
                <option value="1">East</option>
                <option value="2">West</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary fw-bold">Country</Form.Label>
              <Form.Select name="country" value={filters.country} onChange={handleInputChange}>
                <option value="">Select Country</option>
                <option value="1">USA</option>
                <option value="2">Canada</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        <Col md={9}>
          {loading && <div className="text-center"><Spinner animation="border" /></div>}
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Row>
            {filteredCandidates.slice(0, visibleCount).map((candidate) => (
              <AllFeatureCandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </Row>

          {visibleCount < filteredCandidates.length && (
            <div className="text-center mt-4">
              <Button variant="outline-primary" onClick={() => setVisibleCount(visibleCount + 9)}>
                Load More
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllFeaturedCandidate;
