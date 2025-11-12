// Template20.jsx — Diagonal Hero CV | Brand #ff511a + Space Grotesk
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin, FiGlobe, FiUser } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
 

const BRAND = "#ff511a";
const INK = "#222";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template20() {
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

  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const education = payload?.education ?? [];
  const addresses = payload?.address ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

  const phone =
    payload?.phone?.phone_number || payload?.user?.[0]?.phone || "—";
  const email = payload?.user?.[0]?.email || "—";
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
    experiences?.[0]?.position?.position_name ||
    "—";

  const fullName = useMemo(
    () =>
      `${profile.first_name || ""} ${profile.middle_name || ""} ${
        profile.last_name || ""
      }`
        .replace(/\s+/g, " ")
        .trim() || "—",
    [profile]
  );

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

  return (
    <Container fluid className="my-4">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t20-root { font-family: 'Space Grotesk', sans-serif; color: ${INK}; }
        .t20-hero {
          background: linear-gradient(135deg, ${BRAND} 60%, #fff 40%);
          color: #fff; padding: 3rem 2rem; position: relative; overflow: hidden;
        }
        .t20-photo {
          width: 160px; height: 180px; border-radius: 16px; overflow: hidden;
          border: 5px solid #fff; box-shadow: 0 6px 18px rgba(0,0,0,.25);
        }
        .t20-name { font-size: 2.4rem; font-weight: 700; margin-bottom: .25rem; }
        .t20-sub { font-size: 1.2rem; opacity: 0.9; }
        .t20-section-title {
          font-weight: 700; color: ${BRAND}; margin-bottom: 1rem;
          border-bottom: 2px solid ${BRAND}; padding-bottom: .25rem;
          text-transform: uppercase;
        }
        .t20-card { border: 0; box-shadow: 0 4px 14px rgba(0,0,0,.08); margin-bottom: 1.5rem; }
        .t20-badge { background: ${BRAND}; color: #fff; }
        .t20-exp-card {
          border-left: 5px solid ${BRAND}; padding-left: 1rem;
          margin-bottom: 1.5rem; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,.05);
        }
      `}</style>

      <div className="t20-root">
        {/* Hero */}
        <div className="t20-hero">
          <Row className="align-items-center g-4">
            <Col md={3} className="text-center">
              <div className="t20-photo">
                <img
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}`
                      : "https://placehold.co/160x180?text=Photo"
                  }
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col md={9}>
              <div className="t20-name">{fullName}</div>
              <div className="t20-sub">{currentPosition}</div>
            </Col>
          </Row>
        </div>

        {/* Body */}
        <Row className="g-4 mt-4 px-3 px-md-5">
          {/* Sidebar */}
          <Col md={4}>
            <Card body className="t20-card">
              <Section title="Contact">
                <p>
                  <FiPhone className="me-2" /> {phone}
                </p>
                <p>
                  <FiMail className="me-2" /> {email}
                </p>
                <p>
                  <FiMapPin className="me-2" /> {location}
                </p>
                {payload?.user?.[0]?.website && (
                  <p>
                    <FiGlobe className="me-2" /> {payload?.user?.[0]?.website}
                  </p>
                )}
              </Section>
            </Card>

            <Card body className="t20-card">
              <Section title="Skills">
                <div className="d-flex flex-wrap gap-2">
                  {knowledge.map((k, i) => (
                    <Badge key={i} bg="secondary" pill>
                      {k?.knowledge?.knowledge_name}
                    </Badge>
                  ))}
                  {software.map((s, i) => (
                    <Badge key={i} bg="dark" pill>
                      {s?.software?.software_name}
                    </Badge>
                  ))}
                </div>
              </Section>
            </Card>

            {languages.length > 0 && (
              <Card body className="t20-card">
                <Section title="Languages">
                  <div className="d-flex flex-wrap gap-2">
                    {languages.map((l, i) => (
                      <Badge key={i} className="t20-badge" pill>
                        {l?.language?.language_name}
                      </Badge>
                    ))}
                  </div>
                </Section>
              </Card>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <Card body className="t20-card">
                <Section title="Culture & Personality">
                  <div className="d-flex flex-wrap gap-2">
                    {culture.map((c, i) => (
                      <Badge key={i} bg="info" text="dark" pill>
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} bg="warning" text="dark" pill>
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </Section>
              </Card>
            )}
          </Col>

          {/* Main */}
          <Col md={8}>
            <Card body className="t20-card">
              <Section title="Profile">
                <p>{intro}</p>
              </Section>
            </Card>

            <Card body className="t20-card">
              <Section title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t20-exp-card">
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {exp?.position?.position_name || "—"}
                      </div>
                      <div className="text-muted small">
                        {exp?.employer?.employer_name || ""}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatMY(exp?.start_date)} –{" "}
                        {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="small mb-0 ps-3">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </Section>
            </Card>

            <Card body className="t20-card">
              <Section title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t20-exp-card">
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div className="text-muted small">
                        {edu?.college?.college_name || edu?.institution || ""}
                      </div>
                      <div className="text-muted small">
                        {formatMY(edu?.started)} –{" "}
                        {edu?.ended ? formatMY(edu?.ended) : "Present"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </Section>
            </Card>

            {referees.length > 0 && (
              <Card body className="t20-card">
                <Section title="Referees">
                  <Row>
                    {referees.map((r, i) => {
                      const rname = [
                        r?.first_name,
                        r?.middle_name,
                        r?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Col md={6} key={i} className="mb-3">
                          <Card body className="shadow-sm border-0">
                            <strong>{rname || "—"}</strong>
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
                </Section>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-3">
      <h5 className="t20-section-title">{title}</h5>
      {children}
    </div>
  );
}
