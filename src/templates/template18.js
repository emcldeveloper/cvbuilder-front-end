// Template18.jsx — Split Banner CV with Vertical Accent + Brand #007d84 + Plus Jakarta Sans
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
import {
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
const BRAND = "#007d84";

/* Helpers */
function formatMY(d) {
  if (!d) return null;
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : null;
}

export default function Template18() {
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

  return (
    <Container fluid className="my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Card
        className="border-0 shadow-lg overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Split Banner */}
        <Row className="g-0">
          <Col
            md={4}
            className="text-center text-white p-4"
            style={{ backgroundColor: BRAND }}
          >
            <div
              style={{
                width: "180px",
                height: "220px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "4px solid #fff",
                margin: "0 auto",
                boxShadow: "0 4px 15px rgba(0,0,0,.3)",
              }}
            >
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/200x250?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x250?text=Photo")
                }
              />
            </div>
          </Col>
          <Col
            md={8}
            className="p-4 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h1 className="fw-bold mb-2" style={{ color: BRAND }}>
              {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                profile.last_name || ""
              }`.trim() || "—"}
            </h1>
            <h4 className="fw-light">{currentPosition}</h4>
            <p className="mt-3">{intro}</p>
          </Col>
        </Row>

        {/* Vertical Accent + Content */}
        <Row className="g-0">
          <Col md={1} style={{ backgroundColor: BRAND }}></Col>

          <Col md={11} className="p-4">
            <Row>
              {/* Sidebar info */}
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
                </Section>

                {languages.length > 0 && (
                  <Section title="Languages">
                    <div className="d-flex flex-wrap gap-2">
                      {languages.map((l, i) => (
                        <Badge
                          key={i}
                          pill
                          style={{ backgroundColor: BRAND, color: "#fff" }}
                        >
                          {l?.language?.language_name}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                )}

                <Section title="Skills">
                  <div className="d-flex flex-wrap gap-2">
                    {knowledge.map((k, i) => (
                      <Badge key={i} pill bg="secondary">
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))}
                    {software.map((s, i) => (
                      <Badge key={i} pill bg="dark">
                        {s?.software?.software_name}
                      </Badge>
                    ))}
                  </div>
                </Section>

                {(culture.length > 0 || personalities.length > 0) && (
                  <Section title="Culture & Personality">
                    <div className="d-flex flex-wrap gap-2">
                      {culture.map((c, i) => (
                        <Badge key={i} pill bg="info" text="dark">
                          {c?.culture?.culture_name}
                        </Badge>
                      ))}
                      {personalities.map((p, i) => (
                        <Badge key={i} pill bg="warning" text="dark">
                          {p?.personality?.personality_name}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                )}
              </Col>

              {/* Main sections */}
              <Col md={8}>
                <Section title="Experience">
                  {experiences.length ? (
                    <Timeline items={experiences} isExperience />
                  ) : (
                    <p className="text-muted">No job experience available.</p>
                  )}
                </Section>

                <Section title="Education">
                  {education.length ? (
                    <Timeline items={education} isExperience={false} />
                  ) : (
                    <p className="text-muted">
                      No education records available.
                    </p>
                  )}
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
                          <Col md={6} key={i} className="mb-3">
                            <Card body className="shadow-sm border-0">
                              <strong>{fullName || "—"}</strong>
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
                  </Section>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-2" style={{ color: BRAND }}>
        {title}
      </h5>
      {children}
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div>
      {items.map((item, i) => {
        const start = formatMY(item?.start_date || item?.started);
        const end = formatMY(item?.end_date || item?.ended);
        return (
          <Card key={i} body className="mb-3 shadow-sm border-0">
            <div className="fw-semibold" style={{ color: BRAND }}>
              {isExperience
                ? item?.position?.position_name || "—"
                : item?.level?.education_level ||
                  item?.degree ||
                  item?.course_name ||
                  "—"}
            </div>
            <div className="text-muted small mb-1">
              {isExperience
                ? item?.employer?.employer_name || ""
                : item?.college?.college_name || item?.institution || ""}
            </div>
            <div className="text-muted small">
              {start || "—"} – {end || "Present"}
            </div>

            {/* Responsibilities */}
            {item?.responsibility && (
              <ul className="small mt-2 mb-0 ps-3">
                {item.responsibility
                  .split("\n")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t, k) => (
                    <li key={k}>{t.replace(/^•\s*/, "")}</li>
                  ))}
              </ul>
            )}
          </Card>
        );
      })}
    </div>
  );
}
