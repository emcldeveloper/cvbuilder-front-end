import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiStar,
  FiCpu,
  FiGlobe,
  FiUser,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#ff6601";

export default function Template14() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(  `HTTP error! status: ${res.status} `);
       
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
        style={{ height: "70vh" }}
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

  // Extracted data
  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];
  const addresses = payload?.address ?? [];

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
  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";
  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };

  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start py-5 px-3 px-md-5"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card
        className="border-0 shadow-lg overflow-hidden w-100"
        style={{ maxWidth: "1000px", borderRadius: "12px" }}
      >
        {/* Font Load */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* ===== HERO SECTION ===== */}
        <div className="hero d-flex flex-column flex-md-row align-items-center justify-content-between p-4 p-md-5">
          <div className="text-white flex-grow-1 text-center text-md-start pe-md-4">
            <h1 className="fw-bold mb-1">
              {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                profile.last_name || ""
              }`.trim() || "—"}
            </h1>
            <h4 className="fw-normal mb-3">{currentPosition}</h4>
            <p className="mb-0">{intro}</p>
          </div>

          <div className="profileOctagon mt-4 mt-md-0">
            <img
              src={
                profile?.picture
                  ? `${cvUrl}/${profile.picture} `
                 
                  : "https://placehold.co/200x200?text=Photo"
              }
              alt="profile"
              className="profileImg"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/200x200?text=Photo")
              }
            />
          </div>
        </div>

        {/* ===== CONTACT SECTION ===== */}
        <div className="contact-bar d-flex flex-wrap justify-content-center gap-4 py-3">
          <span>
            <FiPhone className="me-2" />
            {phone}
          </span>
          <span>
            <FiMail className="me-2" />
            {email}
          </span>
          <span>
            <FiMapPin className="me-2" />
            {location}
          </span>
        </div>

        {/* ===== MAIN BODY ===== */}
        <Card.Body className="p-4 p-md-5">
          {/* Skills */}
          <SectionCard title="Skills & Traits">
            <Row className="g-4">
              <Col md={6}>
                <SkillCard title="Knowledge" icon={<FiStar />}>
                  {knowledge.length ? (
                    knowledge.map((k, i) => (
                      <Badge key={i} pill bg="secondary" className="me-1 mb-1">
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-secondary">—</span>
                  )}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Software" icon={<FiCpu />}>
                  {software.length ? (
                    software.map((s, i) => (
                      <Badge key={i} pill bg="dark" className="me-1 mb-1">
                        {s?.software?.software_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-secondary">—</span>
                  )}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Culture" icon={<FiGlobe />}>
                  {culture.length ? (
                    culture.map((c, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                        className="me-1 mb-1"
                      >
                        {c?.culture?.culture_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-secondary">—</span>
                  )}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Personality" icon={<FiUser />}>
                  {personalities.length ? (
                    personalities.map((p, i) => (
                      <Badge
                        key={i}
                        pill
                        bg="info"
                        text="dark"
                        className="me-1 mb-1"
                      >
                        {p?.personality?.personality_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-secondary">—</span>
                  )}
                </SkillCard>
              </Col>
              <Col md={12}>
                <SkillCard title="Languages" icon={<FiGlobe />}>
                  {languages.length ? (
                    languages.map((l, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                        className="me-1 mb-1"
                      >
                        {l?.language?.language_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-secondary">—</span>
                  )}
                </SkillCard>
              </Col>
            </Row>
          </SectionCard>

          {/* Experience & Education */}
          <Row className="mt-4">
            <Col md={6}>
              <SectionCard title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 border-0 shadow-sm"
                      style={{ borderLeft: `5px solid ${BRAND} ` }}
                    
                    >
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {exp?.position?.position_name || "Job Title"}{" "}
                        {exp?.employer?.employer_name && (
                          <span className="text-muted">
                            @ {exp.employer.employer_name}
                          </span>
                        )}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0 small text-muted">
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
            </Col>

            <Col md={6}>
              <SectionCard title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 border-0 shadow-sm"
                      style={{ borderLeft: `5px solid ${BRAND} ` }}
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
            </Col>
          </Row>

          {/* Referees */}
          {referees.length > 0 && (
            <SectionCard title="Referees">
              <Row>
                {referees.map((r, i) => {
                  const fullName = [r.first_name, r.middle_name, r.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <Col md={6} key={i} className="mb-3">
                      <Card
                        body
                        className="border-0 shadow-sm"
                        style={{
                          borderLeft: `4px solid ${BRAND} `,
                          borderRadius: 8,
                        }}
                      >
                        <strong style={{ color: BRAND }}>
                          {fullName || "—"}
                        </strong>
                        <div className="text-muted small">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </SectionCard>
          )}
        </Card.Body>
      </Card>

      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .hero {
          background-color: ${BRAND};
          color: #fff;
          border-radius: 12px 12px 0 0;
        }
        .profileOctagon {
          width: 180px;
          height: 180px;
          clip-path: polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);
          border: 5px solid #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          overflow: hidden;
          flex-shrink: 0;
        }
        .profileImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .contact-bar {
          background: #fff;
          font-size: 0.95rem;
          border-top: 1px solid #eee;
          border-bottom: 2px solid ${BRAND};
        }
        .section-heading {
          color: ${BRAND};
          font-weight: 700;
          border-bottom: 2px solid ${BRAND};
          padding-bottom: 0.3rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .hero {
            text-align: center;
            flex-direction: column;
          }
          .profileOctagon {
            width: 140px;
            height: 140px;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </Container>
  );
}

/* --- Section Components --- */
function SectionCard({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="section-heading">{title}</h3>
      {children}
    </div>
  );
}

function SkillCard({ title, icon, children }) {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h6
          className="fw-bold mb-3 d-flex align-items-center"
          style={{ color: BRAND }}
        >
          {icon} <span className="ms-2">{title}</span>
        </h6>
        <div>{children}</div>
      </Card.Body>
    </Card>
  );
}
