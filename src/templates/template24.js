// Template24.jsx — Premium Editorial CV Layout
// Brand: #0095d2 | Font: Noto Sans
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBook,
  FiUser,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#0095d2";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template24() {
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
    <Container fluid className="t24-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t24-root { font-family: 'Noto Sans', sans-serif; color: ${INK}; }

        /* Hero */
        .t24-hero { background: ${BRAND}; color: #fff; padding: 3rem 2rem 5rem; position: relative; }
        .t24-photo {
          width: 160px; height: 160px; border-radius: 50%;
          object-fit: cover; border: 5px solid #fff;
          position: absolute; bottom: -80px; right: 2rem;
          box-shadow: 0 6px 18px rgba(0,0,0,.3);
        }
        .t24-name { font-size: 2.6rem; font-weight: 700; margin-bottom: .5rem; }
        .t24-sub { font-size: 1.2rem; opacity: 0.9; }
        .t24-intro { margin-top: 1rem; max-width: 70%; font-size: 1rem; line-height: 1.6; }

        /* Sections */
        .t24-section { margin-bottom: 2rem; }
        .t24-section-title {
          font-weight: 700; font-size: 1rem; color: ${BRAND};
          text-transform: uppercase; margin-bottom: 1.2rem; letter-spacing: 1px;
          display: flex; align-items: center; gap: .5rem;
        }

        /* Entries */
        .t24-entry {
          border-left: 4px solid ${BRAND};
          padding-left: 1rem; margin-bottom: 1.5rem;
        }
        .t24-entry-title { font-weight: 600; color: ${BRAND}; }
        .t24-entry-sub { font-size: .9rem; color: #555; font-style: italic; }

        /* Badges */
        .t24-badge {
          background: rgba(0,149,210,.1); color: ${BRAND};
          padding: .4rem .9rem; border-radius: 20px;
          font-size: .85rem; font-weight: 600; margin: .25rem;
          display: inline-block; box-shadow: 0 1px 3px rgba(0,0,0,.1);
        }

        /* Referees */
        .t24-ref-card {
          border: 1px solid #ddd; border-left: 4px solid ${BRAND};
          padding: 1rem; margin-bottom: 1rem; border-radius: 6px;
          background: #fafafa;
        }
      `}</style>

      {/* Hero */}
      <div className="t24-hero">
        <h1 className="t24-name">{fullName}</h1>
        <div className="t24-sub">{currentPosition}</div>
        <p className="t24-intro">{intro}</p>
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/160x160?text=Photo"
          }
          alt="profile"
          className="t24-photo"
        />
      </div>

      {/* Body */}
      <Container className="py-5">
        <Row>
          {/* Left */}
          <Col md={4}>
            <div className="t24-section">
              <h5 className="t24-section-title">
                <FiUser /> Contact
              </h5>
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

            <div className="t24-section">
              <h5 className="t24-section-title">
                <FiBriefcase /> Skills
              </h5>
              {knowledge.map((k, i) => (
                <span key={i} className="t24-badge">
                  {k?.knowledge?.knowledge_name}
                </span>
              ))}
              {software.map((s, i) => (
                <span key={i} className="t24-badge">
                  {s?.software?.software_name}
                </span>
              ))}
            </div>

            {languages.length > 0 && (
              <div className="t24-section">
                <h5 className="t24-section-title">
                  <FiGlobe /> Languages
                </h5>
                {languages.map((l, i) => (
                  <span key={i} className="t24-badge">
                    {l?.language?.language_name}
                  </span>
                ))}
              </div>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <div className="t24-section">
                <h5 className="t24-section-title">Culture & Personality</h5>
                {culture.map((c, i) => (
                  <span key={i} className="t24-badge">
                    {c?.culture?.culture_name}
                  </span>
                ))}
                {personalities.map((p, i) => (
                  <span key={i} className="t24-badge">
                    {p?.personality?.personality_name}
                  </span>
                ))}
              </div>
            )}
          </Col>

          {/* Right */}
          <Col md={8}>
            <div className="t24-section">
              <h5 className="t24-section-title">
                <FiBriefcase /> Experience
              </h5>
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="t24-entry">
                    <div className="t24-entry-title">
                      {exp?.position?.position_name || "—"}
                    </div>
                    <div className="t24-entry-sub">
                      {exp?.employer?.employer_name || ""} |{" "}
                      {formatMY(exp?.start_date)} –{" "}
                      {formatMY(exp?.end_date) || "Present"}
                    </div>
                    {exp?.responsibility && (
                      <ul className="small mt-1">
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
                ))
              ) : (
                <p className="text-muted">No job experience available.</p>
              )}
            </div>

            <div className="t24-section">
              <h5 className="t24-section-title">
                <FiBook /> Education
              </h5>
              {education.length ? (
                education.map((edu, i) => (
                  <div key={i} className="t24-entry">
                    <div className="t24-entry-title">
                      {edu?.level?.education_level || edu?.degree || "—"}
                    </div>
                    <div className="t24-entry-sub">
                      {edu?.college?.college_name || edu?.institution || ""} |{" "}
                      {formatMY(edu?.started)} –{" "}
                      {formatMY(edu?.ended) || "Present"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No education records available.</p>
              )}
            </div>

            {referees.length > 0 && (
              <div className="t24-section">
                <h5 className="t24-section-title">Referees</h5>
                <Row>
                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Col md={6} key={i}>
                        <Card className="t24-ref-card">
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
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
