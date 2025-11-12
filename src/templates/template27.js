// Template27.jsx — Premium Executive CV Layout (Rubik + Brand #224559)
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
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
 

const BRAND = "#224559";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template27() {
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
    <Container fluid className="t27-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t27-root { font-family: 'Rubik', sans-serif; color: ${INK}; background: #f5f7fa; }

        /* Header */
        .t27-header {
          background: linear-gradient(135deg, ${BRAND}, #1b3340);
          color: #fff; text-align: center; padding: 4rem 2rem 6rem;
          position: relative; margin-bottom: 5rem;
        }
        .t27-photo {
          width: 150px; height: 150px; border-radius: 50%;
          object-fit: cover; border: 5px solid #fff;
          position: absolute; bottom: -75px; left: 50%; transform: translateX(-50%);
          box-shadow: 0 4px 20px rgba(0,0,0,.4);
        }
        .t27-name { font-size: 2.6rem; font-weight: 700; margin-bottom: .5rem; }
        .t27-role { font-size: 1.2rem; opacity: .9; margin-bottom: 1rem; }
        .t27-intro { max-width: 700px; margin: 0 auto; font-size: 1rem; opacity: .95; }

        /* Body */
        .t27-body { padding: 2rem; }
        .t27-section { margin-bottom: 2.5rem; }
        .t27-section h4 {
          font-size: 1.15rem; font-weight: 600; color: ${BRAND};
          text-transform: uppercase; border-bottom: 2px solid ${BRAND};
          margin-bottom: 1rem; padding-bottom: .3rem;
        }

        /* Sidebar cards */
        .t27-side-card {
          background: #fff; padding: 1rem 1.2rem; border-radius: 8px;
          margin-bottom: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }

        /* Timeline */
        .t27-timeline { position: relative; margin-left: 1rem; }
        .t27-timeline::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: ${BRAND};
        }
        .t27-item { position: relative; padding-left: 2rem; margin-bottom: 2rem; }
        .t27-dot {
          position: absolute; left: -7px; top: 6px; width: 14px; height: 14px;
          background: ${BRAND}; border-radius: 50%; border: 2px solid #fff;
        }
        .t27-item .date { font-size: .85rem; font-weight: 500; color: ${BRAND}; margin-bottom: .2rem; }
        .t27-item .title { font-size: 1rem; font-weight: 600; color: ${BRAND}; }
        .t27-item .sub { font-size: .9rem; color: #666; font-style: italic; margin-bottom: .4rem; }

        /* Badges */
        .t27-badge {
          background: ${BRAND}; color: #fff; margin: .2rem;
          padding: .3rem .7rem; border-radius: 20px; font-size: .8rem;
          font-weight: 500;
        }
      `}</style>

      {/* Header */}
      <div className="t27-header">
        <div className="t27-name">{fullName}</div>
        <div className="t27-role">{currentPosition}</div>
        <p className="t27-intro">{intro}</p>
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/150x150?text=Photo"
          }
          alt={fullName}
          className="t27-photo"
        />
      </div>

      {/* Body */}
      <Container className="t27-body">
        <Row className="g-4">
          {/* Sidebar */}
          <Col md={4}>
            <div className="t27-side-card">
              <h4>Contact</h4>
              <p>
                <FiPhone className="me-2" />{" "}
                <a href={`tel:${phone}`} style={{ color: INK }}>
                  {phone}
                </a>
              </p>
              <p>
                <FiMail className="me-2" />{" "}
                <a href={`mailto:${email}`} style={{ color: INK }}>
                  {email}
                </a>
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

            <div className="t27-side-card">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={i} className="t27-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={i} className="t27-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </div>

            {languages.length > 0 && (
              <div className="t27-side-card">
                <h4>Languages</h4>
                <div className="d-flex flex-wrap">
                  {languages.map((l, i) => (
                    <Badge key={i} className="t27-badge">
                      {l?.language?.language_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <div className="t27-side-card">
                <h4>Culture & Personality</h4>
                <div className="d-flex flex-wrap">
                  {culture.map((c, i) => (
                    <Badge key={i} className="t27-badge">
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                  {personalities.map((p, i) => (
                    <Badge key={i} className="t27-badge">
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Col>

          {/* Main Content */}
          <Col md={8}>
            <div className="t27-section">
              <h4>
                <FiBriefcase className="me-2" /> Experience
              </h4>
              <div className="t27-timeline">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t27-item">
                      <div className="t27-dot"></div>
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
            </div>

            <div className="t27-section">
              <h4>
                <FiBookOpen className="me-2" /> Education
              </h4>
              <div className="t27-timeline">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t27-item">
                      <div className="t27-dot"></div>
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

            {referees.length > 0 && (
              <div className="t27-section">
                <h4>Referees</h4>
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t27-item">
                      <div className="t27-dot"></div>
                      <div>
                        <strong>{rname || "—"}</strong>
                      </div>
                      <div className="text-muted small">
                        {r?.referee_position || "—"}
                      </div>
                      <div>{r?.employer || "—"}</div>
                      <div className="small">
                        <a href={`tel:${r?.phone}`}>{r?.phone || "—"}</a>
                      </div>
                      <div className="small">
                        <a href={`mailto:${r?.email}`}>{r?.email || "—"}</a>
                      </div>
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
