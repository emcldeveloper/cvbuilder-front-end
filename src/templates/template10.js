// Template10.jsx — CV layout with all fields (skills, software, culture, personality)
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
 
 const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
export default function Template10() {
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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" role="status" />
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

  // ====== Extract Data ======
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

  // Helpers
  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };
  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  const capitalizeWords = (str) =>
    str
      ? str
          .toLowerCase()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";

  return (
    <Container className="my-4">
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ borderRadius: "16px" }}
      >
        <Row className="g-0">
          {/* Left Sidebar */}
          <Col
            md={4}
            className="text-white p-4"
            style={{ backgroundColor: "#ed9735" }}
          >
            <div className="text-center mb-4">
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                className="rounded-circle border border-3 border-light mb-3 shadow"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="fw-bold mb-0">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h3>
              <p className="opacity-90">{currentPosition}</p>
            </div>

            <SidebarSection title="CONTACT">
              <div className="d-flex align-items-center mb-2">
                <FiPhone className="me-2" /> {phone}
              </div>
              <div className="d-flex align-items-center mb-2">
                <FiMail className="me-2" /> {email}
              </div>
              <div className="d-flex align-items-center">
                <FiMapPin className="me-2" /> {location}
              </div>
            </SidebarSection>

            <SidebarSection title="PROFILE">
              <small>{intro}</small>
            </SidebarSection>

            <SidebarSection title="LANGUAGES">
              {languages.length ? (
                <ul className="list-unstyled mb-0">
                  {languages.map((l, i) => (
                    <li key={i} className="mb-1">
                      <span className="fw-semibold">
                        {l?.language?.language_name}
                      </span>{" "}
                      <span className="small text-light opacity-75">
                        ({l?.proficiency?.proficiency_level})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                "—"
              )}
            </SidebarSection>

            <SidebarSection title="SKILLS">
              {knowledge.length ? (
                <div className="d-flex flex-wrap gap-1">
                  {knowledge.map((k, i) => (
                    <Badge
                      key={i}
                      bg="light"
                      text="dark"
                      className="rounded-pill"
                    >
                      {capitalizeWords(k?.knowledge?.knowledge_name)}
                    </Badge>
                  ))}
                </div>
              ) : (
                "—"
              )}
            </SidebarSection>

            <SidebarSection title="SOFTWARE">
              {software.length ? (
                <div className="d-flex flex-wrap gap-1">
                  {software.map((s, i) => (
                    <Badge key={i} bg="secondary" className="rounded-pill">
                      {s?.software?.software_name}
                    </Badge>
                  ))}
                </div>
              ) : (
                "—"
              )}
            </SidebarSection>

            <SidebarSection title="CULTURE">
              {culture.length ? (
                <div className="d-flex flex-wrap gap-1">
                  {culture.map((c, i) => (
                    <Badge
                      key={i}
                      bg="warning"
                      className="rounded-pill text-dark"
                    >
                      {c?.culture?.culture_name}
                    </Badge>
                  ))}
                </div>
              ) : (
                "—"
              )}
            </SidebarSection>

            <SidebarSection title="PERSONALITY">
              {personalities.length ? (
                <div className="d-flex flex-wrap gap-1">
                  {personalities.map((p, i) => (
                    <Badge key={i} bg="dark" className="rounded-pill">
                      {p?.personality?.personality_name}
                    </Badge>
                  ))}
                </div>
              ) : (
                "—"
              )}
            </SidebarSection>
          </Col>

          {/* Right Content */}
          <Col md={8} className="p-4 bg-white">
            <MainSection title="WORK EXPERIENCE">
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="mb-4 pb-3 border-bottom">
                    <h6
                      className="fw-bold mb-1"
                      style={{ color: "#ed9735", fontSize: "1.05rem" }}
                    >
                      {exp?.position?.position_name || "Job Title"}
                    </h6>
                    <div className="text-muted small mb-2">
                      {exp?.employer?.employer_name || "—"} |{" "}
                      {formatY(exp?.start_date)} –{" "}
                      {formatY(exp?.end_date) || "Present"}
                    </div>
                    {exp?.responsibility ? (
                      <ul className="small mb-0 ps-3">
                        {exp.responsibility
                          .split("\n")
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((t, k) => (
                            <li key={k} style={{ marginBottom: "4px" }}>
                              {t.replace(/^•\s*/, "")}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="small text-muted mb-0">
                        No details provided.
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-muted">No job experience added.</div>
              )}
            </MainSection>

            <MainSection title="EDUCATION">
              {education.length
                ? education.map((edu, i) => (
                    <div key={i} className="mb-3 pb-2 border-bottom">
                      <h6
                        className="fw-bold mb-1"
                        style={{ color: "#ed9735", fontSize: "1.05rem" }}
                      >
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </h6>
                      <div className="text-muted small mb-1">
                        {edu?.college?.college_name ||
                          edu?.institution ||
                          "—"}{" "}
                        | {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                      </div>
                      <p className="small mb-0">{edu?.description || ""}</p>
                    </div>
                  ))
                : "No education records available."}
            </MainSection>

            {referees.length > 0 && (
              <MainSection title="REFEREES">
                {referees.map((r, i) => {
                  const fullName = [r.first_name, r.middle_name, r.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={r.id ?? i} className="mb-3 pb-2 border-bottom">
                      <h6
                        className="fw-bold mb-1"
                        style={{ color: "#ed9735", fontSize: "1.05rem" }}
                      >
                        {fullName || "—"}
                      </h6>
                      <div className="text-muted small">
                        {r?.referee_position || "—"}, {r?.employer || "—"}
                      </div>
                      <div className="small">{r?.phone || "—"}</div>
                      <div className="small">{r?.email || "—"}</div>
                    </div>
                  );
                })}
              </MainSection>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

// ===== Sub Components =====
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold text-uppercase mb-2 border-bottom border-light pb-1">
        {title}
      </h6>
      <div>{children}</div>
    </div>
  );
}

function MainSection({ title, children }) {
  return (
    <div className="mb-4">
      <h5
        className="fw-bold text-uppercase mb-3 pb-1"
        style={{
          color: "#ed9735",
          borderBottom: "2px solid #f1f1f1",
        }}
      >
        {title}
      </h5>
      <div>{children}</div>
    </div>
  );
}
