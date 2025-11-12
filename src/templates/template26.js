// Template26.jsx — Modern CV with Rubik font + Brand #cf470c (Improved Polish)
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
 

const BRAND = "#cf470c";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template26() {
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
    <Container fluid className="t26-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t26-root { font-family: 'Rubik', sans-serif; color: ${INK}; line-height: 1.65; background: #fff; }
        
        /* Hero */
        .t26-hero {
          display: flex; align-items: center; padding: 2.5rem 2rem;
          background: linear-gradient(90deg, ${BRAND}15, #fdfdfd);
          border-bottom: 4px solid ${BRAND};
        }
        .t26-photo {
          width: 140px; height: 140px; border-radius: 12px;
          object-fit: cover; margin-right: 2rem;
          border: 3px solid ${BRAND};
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
        }
        .t26-name { font-size: 2.5rem; font-weight: 700; margin-bottom: .3rem; }
        .t26-sub { font-size: 1.2rem; font-weight: 500; color: ${BRAND}; }
        .t26-intro { margin-top: .75rem; font-size: 1rem; max-width: 600px; color: #444; }
        
        /* Sections */
        .t26-section-title {
          font-size: 1.25rem; font-weight: 600; color: ${BRAND};
          border-left: 5px solid ${BRAND}; padding-left: .6rem;
          margin-bottom: 1rem;
        }
        .t26-section { margin-bottom: 2.5rem; }
        .t26-divider { border-top: 1px solid #eee; margin: 2rem 0; }
        
        /* Badges */
        .t26-badge {
          background: ${BRAND}; color: #fff; margin: .25rem;
          padding: .35rem .8rem; font-size: 0.85rem;
          border-radius: 20px; font-weight: 500;
        }
        
        /* Timeline */
        .t26-timeline { position: relative; border-left: 2px solid ${BRAND}33; padding-left: 1rem; }
        .t26-card-timeline { margin-bottom: 1.75rem; position: relative; }
        .t26-card-timeline::before {
          content: ""; position: absolute; left: -1.1rem; top: 5px;
          width: 12px; height: 12px; border-radius: 50%; background: ${BRAND};
        }
        .t26-date { font-size: .85rem; font-weight: 500; color: ${BRAND}; margin-bottom: .3rem; }
        .t26-entry-title { font-weight: 600; font-size: 1rem; }
        .t26-entry-sub { font-size: .9rem; color: #666; font-style: italic; }
        
        /* Referees */
        .t26-ref { border-left: 3px solid ${BRAND}; padding-left: .75rem; margin-bottom: 1rem; }
      `}</style>

      {/* Hero */}
      <div className="t26-hero">
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/140x140?text=Photo"
          }
          alt="profile"
          className="t26-photo"
        />
        <div>
          <div className="t26-name">{fullName}</div>
          <div className="t26-sub">{currentPosition}</div>
          <p className="t26-intro">{intro}</p>
        </div>
      </div>

      {/* Body */}
      <Container className="py-5">
        <Row className="g-5">
          {/* Main left */}
          <Col md={8}>
            <Section
              title={
                <>
                  <FiBriefcase className="me-2" /> Experience
                </>
              }
            >
              <div className="t26-timeline">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t26-card-timeline">
                      <div className="t26-date">
                        {formatMY(exp?.start_date)} –{" "}
                        {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                      </div>
                      <div className="t26-entry-title">
                        {exp?.position?.position_name || "—"}
                      </div>
                      <div className="t26-entry-sub">
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
                  ))
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </div>
            </Section>

            <div className="t26-divider"></div>

            <Section
              title={
                <>
                  <FiBookOpen className="me-2" /> Education
                </>
              }
            >
              <div className="t26-timeline">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t26-card-timeline">
                      <div className="t26-date">
                        {formatMY(edu?.started)} –{" "}
                        {edu?.ended ? formatMY(edu?.ended) : "Present"}
                      </div>
                      <div className="t26-entry-title">
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div className="t26-entry-sub">
                        {edu?.college?.college_name || edu?.institution || ""}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </div>
            </Section>

            {referees.length > 0 && (
              <>
                <div className="t26-divider"></div>
                <Section title="Referees">
                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className="t26-ref">
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
              </>
            )}
          </Col>

          {/* Sidebar right */}
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

            <div className="t26-divider"></div>

            <Section title="Skills">
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={`k-${i}`} className="t26-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={`s-${i}`} className="t26-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </Section>

            {languages.length > 0 && (
              <>
                <div className="t26-divider"></div>
                <Section title="Languages">
                  <div className="d-flex flex-wrap">
                    {languages.map((l, i) => (
                      <Badge key={`l-${i}`} className="t26-badge">
                        {l?.language?.language_name}
                      </Badge>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {(culture.length > 0 || personalities.length > 0) && (
              <>
                <div className="t26-divider"></div>
                <Section title="Culture & Personality">
                  <div className="d-flex flex-wrap">
                    {culture.map((c, i) => (
                      <Badge key={`c-${i}`} bg="info" text="dark">
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={`p-${i}`} bg="warning" text="dark">
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </Section>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="t26-section">
      <h5 className="t26-section-title">{title}</h5>
      {children}
    </div>
  );
}
