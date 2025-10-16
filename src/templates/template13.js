// Template13.jsx — Refined Crimson Text CV Template with brand #32489e
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#32489e";

export default function Template12() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error( `HTTP error! status: ${res.status} `);
        
        return res.json();
      })
      .then((json) => {
        setPayload(json?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );

  if (error)
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  // Extract sections
  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const education = payload?.education ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

  // Contact details
  const phone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    payload?.user?.[0]?.phone ||
    "—";
  const email = payload?.user?.[0]?.email || payload?.email?.email || "—";
  const location = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0].name : ""
      }`
    : "—";

  // Intro and position
  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";
  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  // Helpers
  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };
  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container fluid className="my-4 px-md-5">
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: "Crimson Text", serif; }
        .banner {
          background-color: ${BRAND};
          color: #fff;
          border-radius: 12px 12px 0 0;
        }
        .section-title {
          color: ${BRAND};
          border-bottom: 2px solid ${BRAND};
          display: inline-block;
          margin-bottom: 1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .contact-info p {
          margin-bottom: .4rem;
          font-size: 1rem;
        }
        .badge-skill {
          background-color: ${BRAND};
          color: #fff;
          font-size: 0.85rem;
          padding: 0.4em 0.75em;
        }
        .shadow-soft {
          box-shadow: 0 3px 10px rgba(50,72,158,0.12);
        }
      `}</style>

      <Card className="border-0 shadow-soft overflow-hidden">
        {/* Header */}
        <div className="banner py-5 px-4">
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <Image
                src={
                  profile?.picture
                    ?  `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                
                alt="profile"
                roundedCircle
                fluid
                className="shadow"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  border: "4px solid #fff",
                }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
              />
            </Col>
            <Col md={9} className="text-center text-md-start">
              <h1 className="fw-bold mb-1">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h4 className="fw-light">{currentPosition}</h4>
            </Col>
          </Row>
        </div>

        {/* Body */}
        <Card.Body className="p-4">
          <Row>
            {/* Left Column */}
            <Col md={4} className="mb-4 mb-md-0">
              <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="contact-info">
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Contact
                  </h5>
                  <p>
                    <FiPhone className="me-2" />
                    {phone}
                  </p>
                  <p>
                    <FiMail className="me-2" />
                    {email}
                  </p>
                  <p className="mb-0">
                    <FiMapPin className="me-2" />
                    {location}
                  </p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Languages
                  </h5>
                  {languages.length ? (
                    <div className="d-flex flex-wrap gap-2">
                      {languages.map((l, i) => (
                        <Badge key={i} pill className="badge-skill">
                          {l?.language?.language_name || "Language"}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Skills & Tools
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {knowledge.map((k, i) => (
                      <Badge key={i} pill className="badge-skill">
                        {k?.knowledge?.knowledge_name || "Skill"}
                      </Badge>
                    ))}
                    {software.map((s, i) => (
                      <Badge key={i} pill className="badge-skill">
                        {s?.software?.software_name || "Software"}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Culture & Personality
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {culture.map((c, i) => (
                      <Badge key={i} pill className="badge-skill">
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} pill className="badge-skill">
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column */}
            <Col md={8}>
              <SectionCard title="About Me">
                <p style={{ textAlign: "justify" }}>{intro}</p>
              </SectionCard>

              <SectionCard title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft:`5px solid ${BRAND}` }}
                       
                    >
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {exp?.position?.position_name || "Job Title"}
                        {exp?.employer?.employer_name && (
                          <span className="text-muted">
                            {" "}
                            @ {exp.employer.employer_name}
                          </span>
                        )}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0 small">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">No job experience added.</div>
                )}
              </SectionCard>

              <SectionCard title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                   
                    >
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div>
                        {edu?.college?.college_name || edu?.institution || "—"}
                      </div>
                      <div className="text-muted small">
                        {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">
                    No education records available.
                  </div>
                )}
              </SectionCard>

              {referees.length > 0 && (
                <SectionCard title="Referees">
                  {referees.map((r, i) => {
                    const fullName = [r.first_name, r.middle_name, r.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Card
                        key={r.id ?? i}
                        body
                        className="mb-3 shadow-sm border-0"
                        style={{ borderLeft: `5px solid ${BRAND}` }}
                      >
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {fullName || "—"}
                        </div>
                        <div className="text-muted">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </Card>
                    );
                  })}
                </SectionCard>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="section-title">{title}</h4>
      {children}
    </div>
  );
}
 
