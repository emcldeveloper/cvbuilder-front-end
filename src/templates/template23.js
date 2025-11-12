// Template23.jsx — Premium Editorial CV Layout
// Brand: #ca2b3d | Font: Marcellus
import { useEffect, useState, useMemo } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;

const BRAND = "#ca2b3d";
const INK = "#333";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template23() {
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
    <Container fluid className="t23-root p-0">
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t23-root { font-family: 'Marcellus', serif; color: ${INK}; line-height: 1.7; }
        .t23-hero {
          text-align: center; background: #fff;
          border-bottom: 6px solid ${BRAND};
          padding: 4rem 2rem 6rem; margin-bottom: 4rem;
          position: relative;
        }
        .t23-photo {
          width: 160px; height: 160px; border-radius: 50%;
          object-fit: cover; border: 6px solid #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.25);
          position: absolute; left: 50%; bottom: -80px;
          transform: translateX(-50%);
        }
        .t23-name { font-size: 2.8rem; font-weight: 700; color: ${BRAND}; }
        .t23-sub { font-size: 1.3rem; color: #555; margin-bottom: 1rem; }
        .t23-intro { max-width: 700px; margin: 0 auto; font-size: 1rem; color: #444; }

        .t23-section {
          background: #fafafa; border-left: 4px solid ${BRAND};
          padding: 2rem 1.5rem; margin-bottom: 2.5rem; border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
        .t23-section-title {
          font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; margin-bottom: 1.2rem;
          color: ${BRAND}; font-size: 1.1rem;
          border-bottom: 1px solid rgba(0,0,0,.1); padding-bottom: .4rem;
        }

        .t23-entry { margin-bottom: 1.5rem; }
        .t23-entry-title { font-weight: 600; color: ${BRAND}; }
        .t23-entry-sub { font-size: .9rem; font-style: italic; color: #666; }
        .t23-ref {
          border-left: 3px solid ${BRAND}; padding-left: .75rem; margin-bottom: 1rem;
        }

        .t23-badge {
          background: linear-gradient(135deg, rgba(202,43,61,.15), rgba(202,43,61,.05));
          color: ${BRAND}; font-size: .85rem; margin: .25rem;
          border-radius: 20px; padding: .35rem 1rem; font-weight: 500;
          box-shadow: 0 1px 3px rgba(0,0,0,.1);
        }
      `}</style>

      {/* Hero */}
      <div className="t23-hero">
        <div className="t23-name">{fullName}</div>
        <div className="t23-sub">{currentPosition}</div>
        <p className="t23-intro">{intro}</p>
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/160x160?text=Photo"
          }
          alt="profile"
          className="t23-photo"
        />
      </div>

      {/* Sections */}
      <Container className="pb-5">
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
              <span key={i} className="t23-badge">
                {k?.knowledge?.knowledge_name}
              </span>
            ))}
            {software.map((s, i) => (
              <span key={i} className="t23-badge">
                {s?.software?.software_name}
              </span>
            ))}
          </div>
        </Section>

        {languages.length > 0 && (
          <Section title="Languages">
            <div className="d-flex flex-wrap">
              {languages.map((l, i) => (
                <span key={i} className="t23-badge">
                  {l?.language?.language_name}
                </span>
              ))}
            </div>
          </Section>
        )}

        {(culture.length > 0 || personalities.length > 0) && (
          <Section title="Culture & Personality">
            <div className="d-flex flex-wrap">
              {culture.map((c, i) => (
                <span key={i} className="t23-badge">
                  {c?.culture?.culture_name}
                </span>
              ))}
              {personalities.map((p, i) => (
                <span key={i} className="t23-badge">
                  {p?.personality?.personality_name}
                </span>
              ))}
            </div>
          </Section>
        )}

        <Section title="Experience">
          {experiences.length ? (
            experiences.map((exp, i) => (
              <div key={i} className="t23-entry">
                <div className="t23-entry-title">
                  {exp?.position?.position_name || "—"}
                </div>
                <div className="t23-entry-sub">
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
                          t.trim() && <li key={k}>{t.replace(/^•\s*/, "")}</li>
                      )}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">No job experience available.</p>
          )}
        </Section>

        <Section title="Education">
          {education.length ? (
            education.map((edu, i) => (
              <div key={i} className="t23-entry">
                <div className="t23-entry-title">
                  {edu?.level?.education_level || edu?.degree || "—"}
                </div>
                <div className="t23-entry-sub">
                  {edu?.college?.college_name || edu?.institution || ""} |{" "}
                  {formatMY(edu?.started)} – {formatMY(edu?.ended) || "Present"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No education records available.</p>
          )}
        </Section>

        {referees.length > 0 && (
          <Section title="Referees">
            {referees.map((r, i) => {
              const rname = [r?.first_name, r?.middle_name, r?.last_name]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={i}>
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
      </Container>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="t23-section">
      <h5 className="t23-section-title">{title}</h5>
      {children}
    </div>
  );
}
