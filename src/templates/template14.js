// Template14.jsx — Creative CV Template with Plus Jakarta Sans + Brand #ff6601
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
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const profiles = payload?.applicant_profile ?? [];
  const profile = profiles[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

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
    <Container fluid className="my-4">
      {/* Load font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Hero Header */}
        <div
          className="p-5 text-white d-flex flex-column flex-md-row align-items-center justify-content-between"
          style={{ backgroundColor: BRAND }}
        >
          <div className="text-center text-md-start mb-3 mb-md-0">
            <h1 className="fw-bold mb-1">
              {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                profile.last_name || ""
              }`.trim() || "—"}
            </h1>
            <h4 className="fw-light">{currentPosition}</h4>
            <p className="mt-3">{intro}</p>
          </div>

          {/* Octagon Profile Image */}
          <div
            style={{
              width: "170px",
              height: "170px",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              overflow: "hidden",
              border: "5px solid #fff",
              boxShadow: "0 4px 15px rgba(0,0,0,.3)",
            }}
          >
            <img
              src={
                profile?.picture
                  ? `${cvUrl}/${profile.picture}`
                  : "https://placehold.co/200x200?text=Photo"
              }
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/200x200?text=Photo")
              }
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="d-flex flex-wrap justify-content-center gap-4 p-3 bg-light">
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

        {/* Body */}
        <Card.Body className="p-5">
          {/* Skills & Traits Section */}
          <SectionCard title="Skills & Traits">
            <Row className="g-3">
              <Col md={6}>
                <SkillCard title="Knowledge" icon={<FiStar />}>
                  {knowledge.map((k, i) => (
                    <Badge key={i} pill bg="secondary" className="me-1 mb-1">
                      {k?.knowledge?.knowledge_name}
                    </Badge>
                  ))}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Software" icon={<FiCpu />}>
                  {software.map((s, i) => (
                    <Badge key={i} pill bg="dark" className="me-1 mb-1">
                      {s?.software?.software_name}
                    </Badge>
                  ))}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Culture" icon={<FiGlobe />}>
                  {culture.map((c, i) => (
                    <Badge
                      key={i}
                      pill
                      style={{ backgroundColor: BRAND, color: "#fff" }}
                      className="me-1 mb-1"
                    >
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                </SkillCard>
              </Col>
              <Col md={6}>
                <SkillCard title="Personality" icon={<FiUser />}>
                  {personalities.map((p, i) => (
                    <Badge
                      key={i}
                      pill
                      bg="info"
                      text="dark"
                      className="me-1 mb-1"
                    >
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </SkillCard>
              </Col>
              {languages.length > 0 && (
                <Col md={12}>
                  <SkillCard title="Languages" icon={<FiGlobe />}>
                    {languages.map((l, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                        className="me-1 mb-1"
                      >
                        {l?.language?.language_name}
                      </Badge>
                    ))}
                  </SkillCard>
                </Col>
              )}
            </Row>
          </SectionCard>

          {/* Experience & Education */}
          <Row>
            <Col md={6}>
              <SectionCard title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 border-0 shadow-sm"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
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
            </Col>
            <Col md={6}>
              <SectionCard title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 border-0 shadow-sm"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
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
                    <Col md={6} key={r.id ?? i} className="mb-3">
                      <Card body className="border-0 shadow-sm">
                        <strong>{fullName || "—"}</strong>
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
    </Container>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="fw-bold mb-3" style={{ color: BRAND }}>
        {title}
      </h3>
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
