// Template16.jsx — Modern CV Template with Diamond Photo + Brand #b62424 + Chivo Font (Improved)
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
  FiCpu,
  FiStar,
  FiGlobe,
  FiUser,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
const BRAND = "#b62424";

export default function Template16() {
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
      <link
        href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ fontFamily: "'Chivo', sans-serif" }}
      >
        {/* Hero Header with gradient */}
        <div
          className="p-5 text-white position-relative"
          style={{
            background: `linear-gradient(135deg, ${BRAND}, #7d0f0f)`,
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          }}
        >
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h1 className="fw-bold mb-2">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h4 className="fw-light">{currentPosition}</h4>
              <p className="mt-3">{intro}</p>
            </Col>
            <Col
              md={4}
              className="d-flex justify-content-center justify-content-md-end"
            >
              {/* Diamond Image with hover zoom */}
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  transform: "rotate(45deg)",
                  overflow: "hidden",
                  border: "6px solid #fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,.3)",
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
                    transform: "rotate(-45deg) scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/200x200?text=Photo")
                  }
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform =
                      "rotate(-45deg) scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform =
                      "rotate(-45deg) scale(1)")
                  }
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Contact Info - pills */}
        <div
          className="d-flex flex-wrap justify-content-center gap-3 py-3 px-4"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <span className="badge rounded-pill bg-light text-dark px-3 py-2 shadow-sm">
            <FiPhone className="me-2" /> {phone}
          </span>
          <span className="badge rounded-pill bg-light text-dark px-3 py-2 shadow-sm">
            <FiMail className="me-2" /> {email}
          </span>
          <span className="badge rounded-pill bg-light text-dark px-3 py-2 shadow-sm">
            <FiMapPin className="me-2" /> {location}
          </span>
        </div>

        {/* Body */}
        <Card.Body className="p-5">
          {/* Languages */}
          {languages.length > 0 && (
            <SectionCard title="Languages">
              <div className="d-flex flex-wrap gap-2">
                {languages.map((l, i) => (
                  <Badge
                    key={i}
                    pill
                    style={{ backgroundColor: BRAND, color: "#fff" }}
                  >
                    {l?.language?.language_name || "Language"}
                  </Badge>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Skills Grid */}
          <SectionCard title="Skills & Traits">
            <Row className="g-4">
              <Col md={6} lg={3}>
                <SkillBlock title="Knowledge" icon={<FiStar />}>
                  {knowledge.map((k, i) => (
                    <Badge key={i} pill bg="secondary" className="me-1 mb-1">
                      {k?.knowledge?.knowledge_name}
                    </Badge>
                  ))}
                </SkillBlock>
              </Col>
              <Col md={6} lg={3}>
                <SkillBlock title="Software" icon={<FiCpu />}>
                  {software.map((s, i) => (
                    <Badge key={i} pill bg="dark" className="me-1 mb-1">
                      {s?.software?.software_name}
                    </Badge>
                  ))}
                </SkillBlock>
              </Col>
              <Col md={6} lg={3}>
                <SkillBlock title="Culture" icon={<FiGlobe />}>
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
                </SkillBlock>
              </Col>
              <Col md={6} lg={3}>
                <SkillBlock title="Personality" icon={<FiUser />}>
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
                </SkillBlock>
              </Col>
            </Row>
          </SectionCard>

          {/* Timeline Zig-Zag */}
          <SectionCard title="Experience & Education">
            {[...experiences, ...education].length ? (
              <Row className="g-4">
                {[...experiences, ...education].map((item, i) => (
                  <Col md={6} key={i}>
                    <Card
                      body
                      className="border-0 shadow-sm h-100"
                      style={{
                        borderTop: `4px solid ${BRAND}`,
                      }}
                    >
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {item?.position?.position_name ||
                          item?.level?.education_level ||
                          item?.degree ||
                          "—"}
                      </div>
                      <div className="text-muted small">
                        {item?.employer?.employer_name ||
                          item?.college?.college_name ||
                          item?.institution ||
                          ""}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatMY(item?.start_date || item?.started)} –{" "}
                        {formatMY(item?.end_date || item?.ended) || "Present"}
                      </div>
                      {item?.responsibility && (
                        <ul className="small mb-0">
                          {item.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-secondary">No records available.</div>
            )}
          </SectionCard>

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
                      <Card body className="border shadow-sm">
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
      <h3
        className="fw-bold mb-3 pb-2 border-bottom d-inline-block"
        style={{ color: BRAND, borderColor: BRAND }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SkillBlock({ title, icon, children }) {
  return (
    <Card className="border-0 shadow-sm h-100 hover-shadow">
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
