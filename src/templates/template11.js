// Template11.jsx — Final Polished Layout (Same Design, Improved Spacing & Readability)
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#009485";

export default function Template11() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error( `HTTP error! status: ${res.status}`);
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

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );

  if (error)
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

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

  return (
    <Container fluid className="my-4 px-3 px-md-5">
      <link
        href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: "Dosis", sans-serif; }
        h1,h4,h6 { letter-spacing: 0.5px; }
        .header-section {
          background-color: ${BRAND};
          color: #fff;
          border-radius: 12px 12px 0 0;
        }
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          font-size: 0.95rem;
          max-width: 700px;
          margin: 0 auto;
          word-break: break-word;
        }
        .contact-info span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          line-height: 1.3;
        }
        .section-title {
          color: ${BRAND};
          border-bottom: 2px solid ${BRAND};
          display: inline-block;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .bg-light {
          background-color: #f8f9fa !important;
        }
        @media (max-width: 768px) {
          .contact-info { flex-direction: column; align-items: center; gap: .6rem; }
        }
      `}</style>

      <Row className="justify-content-center">
        <Col md={11} lg={10}>
          <Card className="shadow border-0 overflow-hidden rounded-3">
            {/* Header */}
            <div className="header-section text-center py-5">
              <h1 className="fw-bold mb-1" style={{ fontSize: "2.2rem" }}>
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h5 className="mb-3 fw-light">{currentPosition}</h5>
              <div className="contact-info">
                <span>
                  <FiPhone /> {phone}
                </span>
                <span>
                  <FiMail /> {email}
                </span>
                <span>
                  <FiMapPin /> {location}
                </span>
              </div>
            </div>

            {/* Body */}
            <Row className="g-0">
              {/* Sidebar */}
              <Col md={4} className="bg-light p-4 text-center text-md-start">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <Image
                    src={
                      profile?.picture
                        ? `${cvUrl}/${profile.picture} `
                        : "https://placehold.co/200x200?text=Photo"
                    }
                     
                    alt="profile"
                    roundedCircle
                    fluid
                    className="mb-4 shadow-sm"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      border:  `4px solid ${BRAND} ` ,
                   
                    }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/200x200?text=Photo")
                    }
                  />

                  <SidebarSection title="Languages">
                    <SkillChips
                      items={languages}
                      keyName="language"
                      nestedKey="language_name"
                    />
                  </SidebarSection>

                  <SidebarSection title="Skills">
                    <SkillChips
                      items={knowledge}
                      keyName="knowledge"
                      nestedKey="knowledge_name"
                    />
                  </SidebarSection>

                  <SidebarSection title="Software">
                    <SkillChips
                      items={software}
                      keyName="software"
                      nestedKey="software_name"
                    />
                  </SidebarSection>

                  <SidebarSection title="Culture & Personality">
                    <SkillChips
                      items={culture}
                      keyName="culture"
                      nestedKey="culture_name"
                    />
                    <SkillChips
                      items={personalities}
                      keyName="personality"
                      nestedKey="personality_name"
                    />
                  </SidebarSection>
                </div>
              </Col>

              {/* Main */}
              <Col md={8} className="p-4 bg-white">
                <Section title="About Me">
                  <p
                    className="mb-0 text-muted"
                    style={{ textAlign: "justify" }}
                  >
                    {intro}
                  </p>
                </Section>

                <Section title="Experience">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{
                          borderLeft: `5px solid ${BRAND} `,
                          borderRadius: 8,
                          background: "#fff",
                        }}
                      >
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {exp?.position?.position_name || "Job Title"}
                          {exp?.employer?.employer_name && (
                            <span className="text-muted">
                              {" "}
                              — {exp.employer.employer_name}
                            </span>
                          )}
                        </div>
                        <div className="text-muted small mb-2">
                          {formatMY(exp?.start_date)} –{" "}
                          {formatMY(exp?.end_date) || "Present"}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mb-0 small text-muted">
                            {exp.responsibility
                              .split("\n")
                              .map((t) => t.trim())
                              .filter(Boolean)
                              .map((t, k) => (
                                <li key={k}>{t.replace(/^•\s*/, "")}</li>
                              ))}
                          </ul>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="text-secondary">
                      No job experience added.
                    </div>
                  )}
                </Section>

                <Section title="Education">
                  {education.length ? (
                    education.map((edu, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{
                          borderLeft: `5px solid ${BRAND} `,
                          borderRadius: 8,
                        }}
                      >
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="text-muted">
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            "—"}
                        </div>
                        <div className="small text-muted">
                          {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-secondary">
                      No education records available.
                    </div>
                  )}
                </Section>

                {referees.length > 0 && (
                  <Section title="Referees">
                    {referees.map((r, i) => {
                      const fullName = [
                        r.first_name,
                        r.middle_name,
                        r.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Card
                          body
                          className="mb-3 border-0 shadow-sm"
                          key={r.id ?? i}
                          style={{
                            borderLeft: `5px solid ${BRAND} `,
                            borderRadius: 8,
                          }}
                        >
                          <div className="fw-semibold" style={{ color: BRAND }}>
                            {fullName || "—"}
                          </div>
                          <div className="text-muted small">
                            {r?.referee_position || "—"}
                          </div>
                          <div className="small">{r?.employer || "—"}</div>
                          <div className="small">{r?.phone || "—"}</div>
                          <div className="small">{r?.email || "—"}</div>
                        </Card>
                      );
                    })}
                  </Section>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// ----- Subcomponents -----
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4 w-100">
      <h6 className="fw-semibold mb-2" style={{ color: BRAND }}>
        {title}
      </h6>
      <div>{children || "—"}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="section-title">{title}</h4>
      {children}
    </div>
  );
}

function SkillChips({ items, keyName, nestedKey }) {
  if (!items?.length) return "—";
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((it, i) => (
        <Badge
          key={i}
          pill
          style={{
            backgroundColor: BRAND,
            color: "#fff",
            fontSize: "0.85rem",
            padding: "0.4em 0.75em",
            margin: "0.2em",
          }}
        >
          {it?.[keyName]?.[nestedKey] || "Skill"}
        </Badge>
      ))}
    </div>
  );
}
