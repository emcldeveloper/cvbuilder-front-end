template 30 // Template30.jsx — Elegant Timeline CV (Fredoka + Brand #dd8321)

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

const BRAND = "#dd8321";
const INK = "#222";
const SOFT = "#555";
const BG = "#fdfdfd";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template30() {
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
    <Container fluid className="t30-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t30-root { font-family:'Fredoka', sans-serif; background:${BG}; color:${INK}; }

        /* Hero */
        .t30-hero {
          background:#fff; border-bottom:4px solid ${BRAND};
          padding:2.5rem 2rem; display:flex; align-items:center; gap:2rem;
        }
        .t30-photo {
          width:140px; height:140px; border-radius:50%; object-fit:cover;
          border:5px solid ${BRAND}; box-shadow:0 4px 15px rgba(0,0,0,.15);
        }
        .t30-name { font-size:2.2rem; font-weight:700; color:${BRAND}; }
        .t30-role { font-size:1.1rem; color:${SOFT}; margin-bottom:.5rem; }
        .t30-intro { font-size:.95rem; line-height:1.6; max-width:500px; }

        /* Contact Bar */
        .t30-contact {
          background:#fff; margin-top:0; padding:1rem 2rem;
          display:flex; justify-content:center; gap:2rem; flex-wrap:wrap;
          border-bottom:2px solid #eee;
        }
        .t30-contact p { margin:0; font-size:.9rem; color:${SOFT}; display:flex; align-items:center; gap:.4rem; }

        /* Body */
        .t30-body { padding:3rem 2rem; }
        .t30-section { margin-bottom:2.8rem; }
        .t30-section h4 {
          font-size:1rem; font-weight:600; color:${BRAND};
          text-transform:uppercase; margin-bottom:1.5rem;
          border-left:4px solid ${BRAND}; padding-left:.6rem;
        }

        /* Timeline */
        .t30-timeline { position:relative; margin-left:1.5rem; }
        .t30-timeline::before {
          content:""; position:absolute; left:0; top:0; bottom:0;
          width:2px; background:${BRAND};
        }
        .t30-entry {
          margin-bottom:2rem; padding-left:1.5rem; position:relative;
        }
        .t30-entry::before {
          content:""; position:absolute; left:-9px; top:5px;
          width:16px; height:16px; border-radius:50%; background:${BRAND};
          border:3px solid #fff; box-shadow:0 0 0 2px ${BRAND};
        }
        .t30-entry .date { font-size:.8rem; font-weight:600; color:${BRAND}; }
        .t30-entry .title { font-size:1rem; font-weight:600; margin-top:.2rem; }
        .t30-entry .sub { font-size:.9rem; color:${SOFT}; font-style:italic; margin-bottom:.4rem; }

        /* Badges */
        .t30-badge {
          background:${BRAND}; color:#fff; margin:.25rem; padding:.4rem .9rem;
          font-size:.85rem; border-radius:20px; font-weight:500;
        }

        /* Referees */
        .t30-ref {
          background:#fff; padding:1rem; border-radius:8px;
          box-shadow:0 2px 8px rgba(0,0,0,.06); margin-bottom:1rem;
          border-left:4px solid ${BRAND};
        }
      `}</style>

      {/* Hero */}
      <div className="t30-hero">
        <img
          src={
            profile?.picture
              ? ${cvUrl}/${profile.picture}
              : "https://placehold.co/140x140?text=Photo"
          }
          alt="profile"
          className="t30-photo"
        />
        <div>
          <div className="t30-name">{fullName}</div>
          <div className="t30-role">{currentPosition}</div>
          <p className="t30-intro">{intro}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="t30-contact">
        <p>
          <FiPhone /> {phone}
        </p>
        <p>
          <FiMail /> {email}
        </p>
        <p>
          <FiMapPin /> {location}
        </p>
        {payload?.user?.[0]?.website && (
          <p>
            <FiGlobe /> {payload?.user?.[0]?.website}
          </p>
        )}
      </div>

      {/* Body */}
      <Container className="t30-body">
        <Row className="g-5">
          {/* Left Column: Timeline */}
          <Col md={8}>
            <div className="t30-section">
              <h4>
                <FiBriefcase /> Experience
              </h4>
              <div className="t30-timeline">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t30-entry">
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
            </div>

            <div className="t30-section">
              <h4>
                <FiBookOpen /> Education
              </h4>
              <div className="t30-timeline">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t30-entry">
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
            </div>
          </Col>

          {/* Right Column */}
          <Col md={4}>
            <div className="t30-section">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={i} className="t30-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={i} className="t30-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </div>

            {languages.length > 0 && (
              <div className="t30-section">
                <h4>Languages</h4>
                <div className="d-flex flex-wrap">
                  {languages.map((l, i) => (
                    <Badge key={i} className="t30-badge">
                      {l?.language?.language_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <div className="t30-section">
                <h4>Culture & Personality</h4>
                <div className="d-flex flex-wrap">
                  {culture.map((c, i) => (
                    <Badge key={i} className="t30-badge">
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                  {personalities.map((p, i) => (
                    <Badge key={i} className="t30-badge">
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {referees.length > 0 && (
              <div className="t30-section">
                <h4>
                  <FiUsers /> Referees
                </h4>
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t30-ref">
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
