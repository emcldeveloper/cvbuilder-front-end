// Template29.jsx — Ultra Clean Magazine CV (Sofia Sans + Brand #13a4a6)

import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#13a4a6";
const INK = "#222";
const SOFT = "#555";
const BG = "#f7f9fa";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template29() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(HTTP error! status: ${res.status});
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
    <Container fluid className="t29-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t29-root { font-family:'Sofia Sans', sans-serif; color:${INK}; background:${BG}; }

        /* Hero */
        .t29-hero {
          background:#fff; padding:3rem 2rem; border-left:8px solid ${BRAND};
        }
        .t29-name { font-size:2.4rem; font-weight:700; margin-bottom:.4rem; color:${BRAND}; }
        .t29-role { font-size:1.2rem; font-weight:500; color:${SOFT}; margin-bottom:1rem; }
        .t29-intro { font-size:1rem; line-height:1.6; color:${INK}; }

        .t29-photo {
          width:150px; height:150px; border-radius:50%; object-fit:cover;
          border:5px solid ${BRAND}; box-shadow:0 4px 12px rgba(0,0,0,.15);
        }

        /* Sections */
        .t29-section { margin-bottom:2.5rem; }
        .t29-section h4 {
          font-size:1.1rem; font-weight:600; text-transform:uppercase;
          margin-bottom:1rem; border-bottom:2px solid ${BRAND}; padding-bottom:.3rem;
        }

        /* Cards */
        .t29-card {
          background:#fff; border-radius:6px; padding:1.2rem;
          margin-bottom:1.2rem; box-shadow:0 2px 6px rgba(0,0,0,.06);
        }
        .t29-card .date { font-size:.85rem; font-weight:600; color:${BRAND}; margin-bottom:.2rem; }
        .t29-card .title { font-size:1rem; font-weight:600; color:${INK}; }
        .t29-card .sub { font-size:.9rem; color:${SOFT}; margin-bottom:.4rem; }

        /* Badges */
        .t29-badge {
          background:${BRAND}; color:#fff; margin:.25rem; padding:.35rem .8rem;
          font-size:.8rem; border-radius:20px; font-weight:500;
        }

        /* Referee Card */
        .t29-referee {
          background:#fff; padding:1rem; border-radius:6px;
          box-shadow:0 2px 6px rgba(0,0,0,.05); margin-bottom:1rem;
        }
      `}</style>

      {/* Hero */}
      <div className="t29-hero">
        <Row className="align-items-center g-4">
          <Col md={3} className="text-center">
            <img
              src={
                profile?.picture
                  ? ${cvUrl}/${profile.picture}
                  : "https://placehold.co/150x150?text=Photo"
              }
              alt="profile"
              className="t29-photo"
            />
          </Col>
          <Col md={9}>
            <div className="t29-name">{fullName}</div>
            <div className="t29-role">{currentPosition}</div>
            <p className="t29-intro">{intro}</p>
            <div
              className="d-flex flex-wrap gap-3 mt-3"
              style={{ fontSize: ".9rem", color: SOFT }}
            >
              <span>
                <FiPhone /> {phone}
              </span>
              <span>
                <FiMail /> {email}
              </span>
              <span>
                <FiMapPin /> {location}
              </span>
              {payload?.user?.[0]?.website && (
                <span>
                  <FiGlobe /> {payload?.user?.[0]?.website}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Body */}
      <Container className="py-5">
        <Row className="g-5">
          {/* Left column */}
          <Col md={8}>
            <div className="t29-section">
              <h4>
                <FiBriefcase className="me-2" /> Experience
              </h4>
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="t29-card">
                    <div className="date">
                      {formatMY(exp?.start_date)} –{" "}
                      {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                    </div>
                    <div className="title">
                      {exp?.position?.position_name || "—"}
                    </div>
                    <div className="sub">
                      {exp?.employer?.employer_name || ""}
                    </div>
                    {exp?.responsibility && (
                      <ul className="small">
                        {exp.responsibility
                          .split("\n")
                          .map((t, k) =>
                            t.trim() ? (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ) : null
                          )}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No job experience available.</p>
              )}
            </div>

            <div className="t29-section">
              <h4>
                <FiBookOpen className="me-2" /> Education
              </h4>
              {education.length ? (
                education.map((edu, i) => (
                  <div key={i} className="t29-card">
                    <div className="date">
                      {formatMY(edu?.started)} –{" "}
                      {edu?.ended ? formatMY(edu?.ended) : "Present"}
                    </div>
                    <div className="title">
                      {edu?.level?.education_level || edu?.degree || "—"}
                    </div>
                    <div className="sub">
                      {edu?.college?.college_name || edu?.institution || ""}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No education records available.</p>
              )}
            </div>
          </Col>

          {/* Right column */}
          <Col md={4}>
            <div className="t29-section">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={i} className="t29-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={i} className="t29-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </div>

            {languages.length > 0 && (
              <div className="t29-section">
                <h4>Languages</h4>
                <div className="d-flex flex-wrap">
                  {languages.map((l, i) => (
                    <Badge key={i} className="t29-badge">
                      {l?.language?.language_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <div className="t29-section">
                <h4>Culture & Personality</h4>
                <div className="d-flex flex-wrap">
                  {culture.map((c, i) => (
                    <Badge key={i} className="t29-badge">
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                  {personalities.map((p, i) => (
                    <Badge key={i} className="t29-badge">
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {referees.length > 0 && (
              <div className="t29-section">
                <h4>
                  <FiUsers className="me-2" /> Referees
                </h4>
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t29-referee">
                      <strong>{rname || "—"}</strong>
                      <div className="sub">{r?.referee_position || "—"}</div>
                      <div>{r?.employer || "—"}</div>
                      <div className="small">{r?.phone || "—"}</div>
                      <div className="small">{r?.email || "—"}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
