import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const defaultImage = "/pre_profile/pre_photo.jpg";

const styles = {
 
  image: {
    height: "100px",
    width: "80px",
    objectFit: "cover",
    marginTop:"12px"
  },
  headerRow: {
    backgroundColor: "#2E58A6",
   
   
  },
  nameText: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  hireButton: {
    backgroundColor: "#f57c00",
    border: "none",
  },
};

const PersonalDetails = ({ candidate }) => {
  if (!candidate || !candidate.applicant) return <p>No candidate data available.</p>;

  const applicant = candidate.applicant;

  // Full name
  const rawNameParts = [applicant.first_name, applicant.middle_name, applicant.last_name];
  const fullName =
    rawNameParts.map(part => part?.trim()).filter(part => part && part !== "0").join(" ") || "No Name Record";

  // Position
  const position = applicant.positions?.[0]?.position?.position_name?.trim() || "No Position Record";

  // Location
  const locationParts = [
    // applicant.address?.sub_location,
    // applicant.address?.region?.region_name,
    applicant.address?.region?.country?.name,
  ];
  const location =
    locationParts.filter(Boolean).map(part => part.trim()).join(", ") || "Location not specified";

  // Availability
  const availabilityText =
    applicant.available === "1" ? "Available for Job Vacancies" : "Not Currently Available";

  // Profile Image
  const image = applicant.picture
    ? `http://127.0.0.1:8000/${applicant.picture.trim()}`
    : defaultImage;

  return (
    <Container className="border mb-1 bg-white" style={styles.container}>
      {/* Header / Picture */}
      <Row style={styles.headerRow} className="align-items-center ">
        <Col md={3}>
          <Image src={image} alt="Profile" rounded style={styles.image} fluid />
        </Col>
      </Row>

      {/* Name & Position */}
      <Row className="pt-2">
        <Col md={9}>
          <p className="text-primary" style={styles.nameText}>
            {fullName}
          </p>
          <p className="text-secondary mb-2">{position}</p>
        </Col>
      </Row>

      {/* Info Row */}
      <Row className="pt-2 align-items-center">
        <Col md={2} className="mb-2">
          <Button
            className="text-white w-100"
            style={styles.hireButton}
            disabled={availabilityText !== "Available for Job Vacancies"}
          >
            {availabilityText === "Available " ? "Hire Me" : "Unavailable"}
          </Button>
        </Col>

        <Col md={3} className="text-center mb-2">
          <p className="text-primary mb-0">{location}</p>
        </Col>

        <Col md={2} className="mb-2">
          <p className="text-primary mb-0" style={{ cursor: "pointer" }}>
            Contact Info
          </p>
        </Col>

        <Col md={5} className="mb-2">
          <p className="text-primary mb-0">
            {applicant.educations?.[0]?.college?.college_name || "No College Records"}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalDetails;
