// Template25.jsx — CV Template
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#313f97";
const INK = "#333";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template25() {
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
    <Container fluid className="t25-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t25-root { font-family: 'Poiret One', sans-serif; color: ${INK}; line-height: 1.6; }
        .t25-hero {
          background: ${BRAND}; color: #fff; padding: 3rem 2rem; text-align: center;
        }
        .t25-photo {
          width: 150px; height: 150px; border-radius: 50%;
          border: 5px solid #fff; object-fit: cover;
          box-shadow: 0 4px 12px rgba(0,0,0,.3);
          margin-bottom: 1rem;
        }
        .t25-name { font-size: 2.8rem; font-weight: 700; }
        .t25-sub { font-size: 1.3rem; opacity: .9; }
        .t25-section-title {
          font-size: 1.3rem; font-weight: 700; color: ${BRAND};
          border-bottom: 2px solid ${BRAND}; padding-bottom: .3rem;
          margin-bottom: 1.25rem; text-transform: uppercase; letter-spacing: 1px;
        }
        .t25-badge { background: ${BRAND}; color: #fff; margin: .2rem; }
        
        /* Timeline Cards */
        .t25-timeline { position: relative; }
        .t25-card-timeline {
          display: flex; gap: 1rem; margin-bottom: 2rem; align-items: flex-start;
        }
        .t25-timeline-badge {
          min-width: 120px; text-align: right; font-size: 0.9rem;
          font-weight: 600; color: ${BRAND}; padding-right: 1rem;
          border-right: 2px solid ${BRAND};
        }
        .t25-entry-content {
          flex: 1; background: #fff; border: 1px solid rgba(0,0,0,.08);
          border-radius: 8px; padding: 1rem 1.25rem;
          box-shadow: 0 3px 10px rgba(0,0,0,.05);
          transition: transform .2s ease;
        }
        .t25-entry-content:hover { transform: translateY(-3px); }
        .t25-entry-title { font-weight: 600; color: ${BRAND}; font-size: 1.05rem; }
        .t25-entry-sub { font-size: .9rem; color: #555; font-style: italic; }
        .t25-ref {
          border-left: 3px solid ${BRAND}; padding-left: .75rem; margin-bottom: 1rem;
        }
      `}</style>

      {/* Hero */}
      <div className="t25-hero">
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/150x150?text=Photo"
          }
          alt="profile"
          className="t25-photo"
        />
        <div className="t25-name">{fullName}</div>
        <div className="t25-sub">{currentPosition}</div>
        <p className="mt-3 mb-0">{intro}</p>
      </div>

      {/* Body */}
      <Container className="py-4">
        <Row className="g-4">
          {/* Sidebar */}
          <Col md={4}>
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

            <Section title="Skills">
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={`k${i}`} className="t25-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={`s${i}`} className="t25-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </Section>

            {languages.length > 0 && (
              <Section title="Languages">
                <div className="d-flex flex-wrap">
                  {languages.map((l, i) => (
                    <Badge key={`l${i}`} className="t25-badge">
                      {l?.language?.language_name}
                    </Badge>
                  ))}
                </div>
              </Section>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <Section title="Culture & Personality">
                <div className="d-flex flex-wrap">
                  {culture.map((c, i) => (
                    <Badge key={`c${i}`} bg="info" text="dark">
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                  {personalities.map((p, i) => (
                    <Badge key={`p${i}`} bg="warning" text="dark">
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </div>
              </Section>
            )}
          </Col>

          {/* Main */}
          <Col md={8}>
            {/* Experience */}
            <Section
              title={
                <>
                  <FiBriefcase className="me-2" /> Experience
                </>
              }
            >
              <div className="t25-timeline">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t25-card-timeline">
                      <div className="t25-timeline-badge">
                        {formatMY(exp?.start_date)} –{" "}
                        {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                      </div>
                      <div className="t25-entry-content">
                        <div className="t25-entry-title">
                          {exp?.position?.position_name || "—"}
                        </div>
                        <div className="t25-entry-sub">
                          {exp?.employer?.employer_name || ""}
                        </div>
                        {exp?.responsibility && (
                          <ul className="small mt-2">
                            {exp.responsibility
                              .split("\n")
                              .map(
                                (t, k) =>
                                  t.trim() && (
                                    <li key={k}>{t.replace(/^•\s*/, "")}</li>
                                  )
                              )}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </div>
            </Section>

            {/* Education */}
            <Section
              title={
                <>
                  <FiBookOpen className="me-2" /> Education
                </>
              }
            >
              <div className="t25-timeline">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t25-card-timeline">
                      <div className="t25-timeline-badge">
                        {formatMY(edu?.started)} –{" "}
                        {edu?.ended ? formatMY(edu?.ended) : "Present"}
                      </div>
                      <div className="t25-entry-content">
                        <div className="t25-entry-title">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="t25-entry-sub">
                          {edu?.college?.college_name || edu?.institution || ""}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </div>
            </Section>

            {/* Referees */}
            {referees.length > 0 && (
              <Section title="Referees">
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t25-ref">
                      <strong>{rname || "—"}</strong>
                      <div className="text-muted small">
                        {r?.referee_position || "—"}
                      </div>
                      <div>{r?.employer || "—"}</div>
                      <div className="small">{r?.phone || "—"}</div>
                      <div className="small">{r?.email || "—"}</div>
                    </div>
                  );
                })}
              </Section>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h5 className="t25-section-title">{title}</h5>
      {children}
    </div>
  );
}
