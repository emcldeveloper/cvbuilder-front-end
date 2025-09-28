// TemplateOrange.jsx — CV Template with #e38720 brand and Dosis font
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

  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container fluid className="my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Row className="justify-content-center">
        <Col md={11} lg={10}>
          <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
            {/* Header */}
            <Card.Header
              className="text-white text-center py-5"
              style={{
                backgroundColor: BRAND,
                fontFamily: "Dosis, sans-serif",
              }}
            >
              <h1 className="fw-bold mb-1" style={{ fontSize: "2.2rem" }}>
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h5 className="mb-0 fw-light">{currentPosition}</h5>
            </Card.Header>

            <Row className="g-0">
              {/* Sidebar */}
              <Col md={4} className="bg-light p-4 text-center text-md-start">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <Image
                    src={
                      profile?.picture
                        ? `${cvUrl}/${profile.picture}`
                        : "https://placehold.co/200x200?text=Photo"
                    }
                    alt="profile"
                    roundedCircle
                    fluid
                    className="mb-4 shadow"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      border: `4px solid ${BRAND}`,
                    }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/200x200?text=Photo")
                    }
                  />

                  <Section icon={<FiMapPin />} title="Location">
                    {location}
                  </Section>
                  <Section icon={<FiPhone />} title="Phone">
                    {phone}
                  </Section>
                  <Section icon={<FiMail />} title="Email">
                    {email}
                  </Section>

                  {languages.length > 0 && (
                    <Section title="Languages">
                      <div className="d-flex flex-wrap gap-2">
                        {languages.map((l, i) => (
                          <Badge
                            key={i}
                            pill
                            style={{
                              backgroundColor: BRAND,
                              color: "#fff",
                              fontFamily: "Dosis, sans-serif",
                            }}
                          >
                            {l?.language?.language_name || "Language"}
                          </Badge>
                        ))}
                      </div>
                    </Section>
                  )}
                </div>
              </Col>

              {/* Main content */}
              <Col
                md={8}
                className="p-4"
                style={{ fontFamily: "Dosis, sans-serif" }}
              >
                <TimelineSection title="About Me">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    {intro}
                  </p>
                </TimelineSection>

                <TimelineSection title="Experience">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{ borderLeft: `5px solid ${BRAND}` }}
                      >
                        <div className="fw-semibold">
                          {exp?.position?.position_name || "Job Title"}
                          {exp?.employer?.employer_name && (
                            <span className="text-muted">
                              {" "}
                              @ {exp.employer.employer_name}
                            </span>
                          )}
                        </div>
                        <div className="text-muted small mb-2">
                          {formatY(exp?.start_date)} –{" "}
                          {exp?.end_date ? formatY(exp.end_date) : "Present"}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mb-0 small">
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
                </TimelineSection>

                <TimelineSection title="Education">
                  {education.length ? (
                    education.map((edu, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{ borderLeft: `5px solid ${BRAND}` }}
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
                  ) : (
                    <div className="text-secondary">
                      No education records available.
                    </div>
                  )}
                </TimelineSection>

                <TimelineSection title="Skills & Tools">
                  <div className="d-flex flex-wrap gap-2">
                    {knowledge.map((k, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))}
                    {software.map((s, i) => (
                      <Badge
                        key={i}
                        pill
                        bg="secondary"
                        style={{ color: "#fff" }}
                      >
                        {s?.software?.software_name}
                      </Badge>
                    ))}
                    {culture.map((c, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} pill bg="dark" style={{ color: "#fff" }}>
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </TimelineSection>

                {referees.length > 0 && (
                  <TimelineSection title="Referees">
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
                          style={{ borderLeft: `5px solid ${BRAND}` }}
                        >
                          <div className="fw-semibold">{fullName || "—"}</div>
                          <div className="text-muted">
                            {r?.referee_position || "—"}
                          </div>
                          <div>{r?.employer || "—"}</div>
                          <div className="small">{r?.phone || "—"}</div>
                          <div className="small">{r?.email || "—"}</div>
                        </Card>
                      );
                    })}
                  </TimelineSection>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function Section({ title, children, icon }) {
  return (
    <div className="mb-3">
      <h6
        className="fw-semibold mb-1 d-flex align-items-center"
        style={{ color: BRAND }}
      >
        {icon && <span className="me-2">{icon}</span>} {title}
      </h6>
      <div>{children || "—"}</div>
    </div>
  );
}

function TimelineSection({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3" style={{ color: BRAND }}>
        {title}
      </h4>
      {children}
    </div>
  );
}
