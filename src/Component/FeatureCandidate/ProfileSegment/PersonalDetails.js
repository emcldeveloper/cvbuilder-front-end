import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const PersonalDetails = ({ candidate }) => {
  if (!candidate) return <p>No candidate data available.</p>;

  const fullName = `${candidate.first_name || ""} ${candidate.middle_name !== "0" ? candidate.middle_name : ""} ${candidate.last_name !== "0" ? candidate.last_name : ""}`.trim();

  const position =
    candidate.positions && candidate.positions.length > 0
      ? candidate.positions[0].position?.position_name?.trim()
      : "No Position Record";

  const regionName = candidate.address?.region?.region_name;
  const countryName = candidate.address?.region?.country?.name;
  const location = regionName
    ? `${regionName}${countryName ? " - " + countryName : ""}`
    : "No Region Record";

  const collegeName =
    candidate.educations && candidate.educations.length > 0
      ? candidate.educations[0].college?.college_name || "No College Records"
      : "No College Records";

  const pictureSrc = candidate.picture
    ? candidate.picture
    : "/pre_profile/pre_photo.jpg";

  const isAvailable = candidate.available === "1";

  return (
    <Container className="border  mb-4">
      {/* Picture */}
      <Row className="text-white"style={{ backgroundColor:'#2E58A6'}}>
        <Col md={3}>
          <Image
            height="80"
            width="100"
            src={pictureSrc}
            alt="Profile"
            rounded
          />
        </Col>
      </Row>

      {/* Name and Position */}
      <Row className="pt-3">
        <Col md={9}>
          <p style={{ fontWeight: "bold", fontSize: 18 }} className="text-primary">
            {fullName || "No Name Record"}
          </p>
          <p className="text-secondary">{position}</p>
        </Col>
      </Row>

      {/* Buttons and Info */}
      <Row className="pt-2 align-items-center">
        <Col md={2}>
          <Button
            className="text-white"
            style={{ backgroundColor: "#f57c00", border: "none" }}
            disabled={!isAvailable}
          >
            {isAvailable ? "Hire Me" : "Unavailable for hire"}
          </Button>
        </Col>

        <Col md={3} className="d-flex justify-content-center">
          <p className="text-primary">{location}</p>
        </Col>

        <Col md={3}>
          <p className="text-primary" style={{ cursor: "pointer" }}>
            Contact Info
          </p>
        </Col>

        <Col md={4}>
          <p className="text-primary">{collegeName}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalDetails;
