import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  CardBody,
  CardTitle,
} from "react-bootstrap";
import "../App.css";

const Template1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ekazi.co.tz/api/cv/cv_builder/30750")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const payload = data?.data || {};

  const profiles = payload?.applicant_profile || [];
  const personalities = payload?.applicant_personality || [];
  const experiences = payload.experience || [];
  const referees = payload.referees || [];
  const languages = payload.language || [];
  const users = payload.user || [];
  const addresses = payload.address || [];
  const education = payload.education || [];
  const skills = payload.knowledge || [];

  return (
    <Container
      fluid
      style={{
        width: "210mm",
        margin: "auto",
        backgroundColor: "#000",
        padding: "5mm",
        fontFamily: "sans-serif",
        color: "#333",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <Row className="text-start">
        {/* LEFT SECTION */}
        <Col md={8} className="bg-white shadow-sm p-4">
          {profiles.map((profile, index) => (
            <div key={index}>
              <h2
                className="fw-bold text-uppercase"
                style={{ fontSize: "1rem" }}
              >
                {`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}
              </h2>
              <h2 className="h3 mb-3" style={{ fontSize: "0.9rem" }}>
                {payload?.current_position ||
                  payload?.experience?.[0]?.position?.position_name ||
                  "No Position Available"}
              </h2>
            </div>
          ))}

          {/* About */}
          <Card className="border-0 p-0">
            <CardTitle
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem" }}
            >
              About
            </CardTitle>
            <CardBody className="p-0">
              <p className="lead mb-3" style={{ fontSize: "0.9rem" }}>
                {payload?.careers?.[0]?.career || "No career information"}
              </p>
            </CardBody>
          </Card>

          {/* Career Objective */}
          <Card className="border-0 p-0">
            <CardTitle
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem" }}
            >
              Career Objective
            </CardTitle>
            <CardBody className="p-0">
              <p style={{ fontSize: "0.9rem" }}>
                {payload.objective?.objective || "No objective provided."}
              </p>
            </CardBody>
          </Card>

          {/* Job Experience */}
          <Card className="border-0 p-0">
            <Card.Title
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem" }}
            >
              Job Experience
            </Card.Title>
            <Card.Body className="p-0" style={{ fontSize: "0.9rem" }}>
              {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={index} className="mb-4 text-start">
                    <div className=" d-flex justify-content-between">
                      <h6 className="fw-bold text-capitalize">
                        {exp.position?.position_name || "Job Title"}
                      </h6>
                      <p className="small text-muted">
                        {exp?.start_date
                          ? new Date(exp.start_date).getFullYear()
                          : ""}{" "}
                        -{" "}
                        {exp?.end_date
                          ? new Date(exp.end_date).getFullYear()
                          : "Present"}
                      </p>
                    </div>
                    <p className="mb-1 small text-muted ">
                      {exp.employer?.employer_name} /{" "}
                      {exp.industry?.industry_name}
                    </p>
                    <p className="text-muted small">
                      {exp?.employer?.region?.region_name},{" "}
                      {exp?.employer?.sub_location}
                    </p>

                    {exp.responsibility && (
                      <ul className="small mb-0">
                        {exp.responsibility
                          .split("\n")
                          .map((item) => item.trim())
                          .filter((item) => item.length > 0)
                          .map((item, i) => (
                            <li key={i}>{item.replace(/^•\s*/, "")}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p>No job experience added.</p>
              )}
            </Card.Body>
          </Card>

          {/* Skills and Endorsment */}
          <Card className="border-0 p-0">
            <CardTitle
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem" }}
            >
              Skills & Endorsements
            </CardTitle>
            <CardBody className="p-0" style={{ fontSize: "0.9rem" }}>
              <div className="d-flex align-items-center gap-5 mb-2">
                <p className="fw-semibold mb-0">Culture Fit:</p>
                {payload.culture?.map((c, i) => (
                  <p key={i} className="small mb-0">
                    {c.culture.culture_name}
                  </p>
                ))}
              </div>
              <div className="d-flex align-items-center gap-5 mb-2">
                <p className="fw-semibold mb-0">Personality:</p>
                <p className="small mb-0">
                  {personalities
                    .map(
                      (personality) => personality.personality.personality_name
                    )
                    .join(", ")}
                </p>
              </div>
              <div className="d-flex align-items-center gap-5 mb-2">
                <p className="fw-semibold mb-0">Software</p>
                <p className="small mb-0">
                  {payload.software
                    ?.map((s) => s.software.software_name)
                    .join(", ")}
                </p>
              </div>
              <div className="d-flex align-items-center gap-5 mb-2">
                <p className="fw-semibold mb-0">Skills & Knowledge</p>
                <p className="small mb-0">
                  {payload.knowledge
                    ?.map((k) => k.knowledge.knowledge_name)
                    .join(", ")}
                </p>
              </div>
              <div className="d-flex align-items-center gap-5 mb-2">
                <p className="fw-semibold mb-0">Tools</p>
                <p className="small mb-0">
                  {payload.tools?.map((k) => k.tool.tool_name).join(", ") ||
                    "No tools added"}
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* RIGHT SECTION */}
        <Col md={4} className="bg-dark text-light p-4">
          {profiles.map((profile, index) => (
            <div key={index} className="text-center mb-4">
              <img
                src={`https://ekazi.co.tz/${profile.picture}`}
                alt="profile"
                className=" border border-3 border-white"
                width="100"
                height="100"
              />
            </div>
          ))}

          {/* Language */}
          <div className="small mb-4">
            <h5
              className="border-bottom fw-bold pb-1 text-uppercase"
              style={{ fontSize: "1rem" }}
            >
              Language
            </h5>
            <ul>
              {languages.map((language, i) => (
                <li key={i} className="small text-start">
                  {language.language.language_name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="small mb-4">
            <h5
              className="fw-bold border-bottom text-uppercase mb-2"
              style={{ fontSize: "1rem" }}
            >
              Contact Me
            </h5>
            <ul>
              <li>{payload.phone?.phone_number}</li>
              {users.map((user, i) => (
                <li key={i}>{user?.email}</li>
              ))}
              {addresses.map((address, i) => (
                <li key={i}>{`${address.region_name}, ${address.name}`}</li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h5
              className="fw-bold border-bottom pb-1 text-uppercase"
              style={{ fontSize: "1rem" }}
            >
              Education
            </h5>
            {education.length > 0 ? (
              <ul className="small ps-3 text-start">
                {education.map((edu, i) => (
                  <li key={i} className="mt-2">
                    <strong>
                      {edu.qualification?.qualification || "Degree"}
                    </strong>{" "}
                    <br />
                    {edu.institution} ({edu.start_date} - {edu.end_date})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No education records available.</p>
            )}
          </div>

          {/* Referees */}
          <div className="border-0 p-0">
            <div
              className="fw-bold text-uppercase border-bottom mb-2"
              style={{ fontSize: "1rem" }}
            >
              Referees
            </div>
            <ul className="p-0" style={{ fontSize: "0.9rem" }}>
              {referees.length > 0 ? (
                referees.map((referee, index) => (
                  <li key={index} className="mb-2 text-start">
                    <h6 className="d-flex justify-content-between">
                      {`${referee.first_name} ${referee.middle_name} ${referee.last_name}`}
                    </h6>
                    <p className="small mb-1">
                      <em>{referee.referee_position}</em>
                    </p>
                    <p className="small mb-0">{referee.employer}</p>
                    <p className="small mb-0">{referee.email}</p>
                    <p className="small mb-0">{referee.phone}</p>
                  </li>
                ))
              ) : (
                <p>No referees added.</p>
              )}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Template1;
