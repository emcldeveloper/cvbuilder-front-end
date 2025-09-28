// Template9.jsx — React-Bootstrap CV template with brand color #4991e8
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

// Define your API endpoint and CV base URL
 
  const cvUrl = "https://ekazi.co.tz";
const API_URL = "https://ekazi.co.tz/api/cv/cv_builder/30750";
export default function Template9() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
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

  // ====== Data extraction ======
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

  return (
    <Container className="my-4">
      <Card
        className="shadow border-0"
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          borderRadius: "14px",
        }}
      >
        {/* ===== Header ===== */}
        <Card.Header
          className="text-white"
          style={{
            background: "linear-gradient(135deg, #4991e8, #357ad1)",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        >
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                className="rounded-circle img-fluid border border-3 border-light"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </Col>
            <Col md={9} className="text-md-start text-center">
              <h1 className="fw-bold mb-0">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h5 className="fw-medium opacity-90">{currentPosition}</h5>
              <div className="mt-2 small opacity-75">
                {location} | {phone} | {email}
              </div>
            </Col>
          </Row>
        </Card.Header>

        {/* ===== Body ===== */}
        <Card.Body className="p-4 bg-light">
          <Row className="g-4">
            {/* Left Column */}
            <Col md={4}>
              <Section title="Profile">{intro}</Section>

              <Section title="Languages">
                {languages.length
                  ? languages.map((l, i) => (
                      <Badge
                        bg="secondary"
                        key={i}
                        className="me-1 mb-1 rounded-pill"
                      >
                        {l?.language?.language_name || "Language"}
                      </Badge>
                    ))
                  : "—"}
              </Section>

              <Section title="Skills">
                {knowledge.length
                  ? knowledge.map((k, i) => (
                      <Badge
                        style={{
                          backgroundColor: "#4991e8",
                          textTransform: "capitalize",
                        }}
                        key={i}
                        className="me-1 mb-1 rounded-pill"
                      >
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))
                  : "—"}
              </Section>

              <Section title="Software">
                {software.length
                  ? software.map((s, i) => (
                      <Badge
                        bg="light"
                        text="dark"
                        key={i}
                        className="me-1 mb-1 rounded-pill"
                      >
                        {s?.software?.software_name}
                      </Badge>
                    ))
                  : "—"}
              </Section>

              <Section title="Culture">
                {culture.length
                  ? culture.map((c, i) => (
                      <Badge
                        key={i}
                        className="me-1 mb-1 rounded-pill text-white"
                        style={{ backgroundColor: "#357ad1" }}
                      >
                        {c?.culture?.culture_name}
                      </Badge>
                    ))
                  : "—"}
              </Section>

              <Section title="Personality">
                {personalities.length
                  ? personalities.map((p, i) => (
                      <Badge
                        bg="dark"
                        key={i}
                        className="me-1 mb-1 rounded-pill"
                      >
                        {p?.personality?.personality_name}
                      </Badge>
                    ))
                  : "—"}
              </Section>
            </Col>

            {/* Right Column */}
            <Col md={8}>
              <Section title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 border-0 shadow-sm"
                      style={{ borderLeft: "4px solid #4991e8" }}
                    >
                      <h6 className="fw-semibold mb-0">
                        {exp?.position?.position_name || "Job Title"}
                        {exp?.employer?.employer_name && (
                          <span className="text-muted">
                            {" | " + exp.employer.employer_name}
                          </span>
                        )}
                      </h6>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0">
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
                  <div className="text-muted">No job experience added.</div>
                )}
              </Section>

              <Section title="Education">
                {education.length
                  ? education.map((edu, i) => (
                      <Card
                        key={i}
                        body
                        className="mb-3 border-0 shadow-sm"
                        style={{ borderLeft: "4px solid #4991e8" }}
                      >
                        <div className="fw-semibold">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div>
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            "—"}
                        </div>
                        <div className="text-muted small">
                          {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                        </div>
                      </Card>
                    ))
                  : "No education records available."}
              </Section>

              {referees.length > 0 && (
                <Section title="Referees">
                  <Row>
                    {referees.map((r, i) => {
                      const fullName = [
                        r.first_name,
                        r.middle_name,
                        r.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Col md={6} key={r.id ?? i} className="mb-3">
                          <Card
                            body
                            className="h-100 border-0 shadow-sm"
                            style={{ borderLeft: "4px solid #4991e8" }}
                          >
                            <h6 className="fw-semibold">{fullName || "—"}</h6>
                            <div className="text-muted small">
                              {r?.referee_position || "—"}
                            </div>
                            <div className="small">{r?.employer || "—"}</div>
                            <div className="small">{r?.phone || "—"}</div>
                            <div className="small">{r?.email || "—"}</div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Section>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4 pb-2 border-bottom">
      <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#4991e8" }}>
        {title}
      </h5>
      <div>{children}</div>
    </div>
  );
}
