// Template28.jsx — Creative Premium CV (Zilla Slab + Inter, Brand #146990 + Gold Accents)

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

const BRAND = "#146990";
const GOLD = "#d4af37";
const INK = "#1f2a33";
const INK_SOFT = "#6c7a84";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template28() {
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
    <Container fluid className="t28-root p-0">
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t28-root { font-family: 'Inter', sans-serif; color:${INK}; background:#f6f8f9; }

        /* Hero */
        .t28-hero{
          background:linear-gradient(135deg, ${BRAND}, #0f4d5d);
          text-align:center; padding:4rem 2rem 6rem;
          border-bottom-left-radius:80px; border-bottom-right-radius:80px;
          color:#fff;
        }
        .t28-photo{
          width:160px; height:160px; border-radius:50%; object-fit:cover;
          border:6px solid ${GOLD}; box-shadow:0 6px 20px rgba(0,0,0,.3);
          margin-bottom:1rem; background:#eee;
        }
        .t28-name{ font-family:'Zilla Slab',serif; font-size:2.8rem; font-weight:700; }
        .t28-role{ font-size:1.2rem; opacity:.9; margin-bottom:1rem; }
        .t28-intro{ max-width:650px; margin:0 auto; font-size:1rem; opacity:.95; }

        /* Body */
        .t28-body{ margin-top:-3rem; }
        .t28-sidebar{
          background:#fff; padding:2rem; border-radius:20px;
          box-shadow:0 8px 20px rgba(0,0,0,.05);
        }
        .t28-section{ margin-bottom:2rem; }
        .t28-section h4{
          font-family:'Zilla Slab',serif; font-size:1rem; font-weight:700;
          color:${BRAND}; margin-bottom:1rem;
          border-bottom:2px solid ${GOLD}; padding-bottom:.3rem;
          position:relative;
        }
        .t28-badge{
          background:${BRAND}; color:#fff; margin:.25rem;
          padding:.35rem .8rem; border-radius:20px;
          font-size:.8rem; font-weight:500;
        }

        /* Main content cards */
        .t28-card{
          background:#fff; border-radius:20px;
          padding:1.5rem; margin-bottom:1.5rem;
          box-shadow:0 6px 20px rgba(0,0,0,.06);
          border-left:5px solid ${BRAND};
        }
        .t28-card .date{ font-size:.85rem; font-weight:600; color:${BRAND}; margin-bottom:4px; }
        .t28-card .title{ font-weight:700; font-size:1rem; color:${BRAND}; }
        .t28-card .sub{ font-size:.9rem; color:${INK_SOFT}; font-style:italic; margin-bottom:6px; }
      `}</style>

      {/* Hero */}
      <div className="t28-hero">
          <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/150x150?text=Photo"
          }
          alt={fullName}
          className="t27-photo"
        />
        <div className="t28-name">{fullName}</div>
        <div className="t28-role">{currentPosition}</div>
        <p className="t28-intro">{intro}</p>
      </div>

      {/* Body */}
      <Container className="t28-body">
        <Row className="g-4">
          {/* Sidebar */}
          <Col md={4}>
            <div className="t28-sidebar">
              <div className="t28-section">
                <h4>Contact</h4>
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
              </div>
              <div className="t28-section">
                <h4>Skills</h4>
                <div className="d-flex flex-wrap">
                  {knowledge.map((k, i) => (
                    <Badge key={i} className="t28-badge">
                      {k?.knowledge?.knowledge_name}
                    </Badge>
                  ))}
                  {software.map((s, i) => (
                    <Badge key={i} className="t28-badge">
                      {s?.software?.software_name}
                    </Badge>
                  ))}
                </div>
              </div>
              {languages.length > 0 && (
                <div className="t28-section">
                  <h4>Languages</h4>
                  <div className="d-flex flex-wrap">
                    {languages.map((l, i) => (
                      <Badge key={i} className="t28-badge">
                        {l?.language?.language_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {(culture.length > 0 || personalities.length > 0) && (
                <div className="t28-section">
                  <h4>Culture & Personality</h4>
                  <div className="d-flex flex-wrap">
                    {culture.map((c, i) => (
                      <Badge key={i} className="t28-badge">
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} className="t28-badge">
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>

          {/* Main */}
          <Col md={8}>
            <div className="t28-section">
              <h4>
                <FiBriefcase className="me-2" /> Experience
              </h4>
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="t28-card">
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

            <div className="t28-section">
              <h4>
                <FiBookOpen className="me-2" /> Education
              </h4>
              {education.length ? (
                education.map((edu, i) => (
                  <div key={i} className="t28-card">
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

            {referees.length > 0 && (
              <div className="t28-section">
                <h4>
                  <FiUsers className="me-2" /> Referees
                </h4>
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t28-card">
                      <div className="title">{rname || "—"}</div>
                      <div className="sub">{r?.referee_position || "—"}</div>
                      <div className="mb-1">{r?.employer || "—"}</div>
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

