// TemplateC.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import moment from "moment";

const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const CV_BASE = "https://ekazi.co.tz";
const BRAND = "#1756a5";
const BRAND_DARK = "#0e3668";
const BRAND_LIGHT = "#e6eef8";

function formatMY(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatY(d) {
  if (!d) return "";
  try {
    return new Date(d).getFullYear();
  } catch {
    return "";
  }
}

export default function Template3() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        setPayload(j?.data || {});
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status" />
        <span className="ms-3">Loading CV…</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="mb-0">
          {error}
        </Alert>
      </Container>
    );
  }

  const fmtMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };

  const profiles = Array.isArray(payload?.applicant_profile)
    ? payload.applicant_profile
    : [];
  const profile = profiles[0] || {};
  const experiences = Array.isArray(payload?.experience)
    ? payload.experience
    : [];
  const referees = Array.isArray(payload?.referees) ? payload.referees : [];
  const addresses = Array.isArray(payload?.address) ? payload.address : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const languages = Array.isArray(payload?.language) ? payload.language : [];
  const knowledge = Array.isArray(payload?.knowledge) ? payload.knowledge : [];
  const software = Array.isArray(payload?.software) ? payload.software : [];
  const culture = Array.isArray(payload?.culture) ? payload.culture : [];
  const personalities = Array.isArray(payload?.applicant_personality)
    ? payload.applicant_personality
    : [];

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

  const fullName =
    `${profile.first_name || ""} ${profile.middle_name || ""} ${
      profile.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim() || "—";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  function normalizeBulletText(t = "") {
    return t.replace(/^•\s*/, "").trim();
  }

  function splitLines(text = "") {
    return text
      .split("\n")
      .map((t) => normalizeBulletText(t))
      .filter(Boolean);
  }

  const workRows = experiences.map((e) => ({
    org:
      e?.employer?.employer_name ||
      e?.institution ||
      e?.organization ||
      e?.company ||
      "—",
    dates: `${formatMY(e?.start_date)} — ${formatMY(e?.end_date) || "Present"}`,
    role: e?.position?.position_name || e?.title || "—",
    bullets: splitLines(e?.responsibility || ""),
  }));

  return (
    <Container className="my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Card className="shadow-sm overflow-hidden">
        <Row className="g-0">
          <Col xs={12} lg={4} className="border-end">
            <div
              className="position-relative"
              style={{ background: BRAND_LIGHT, height: 240 }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 32,
                  top: 28,
                  width: 34,
                  height: 110,
                  background: BRAND,
                  clipPath: "polygon(30% 0, 100% 0, 70% 100%, 0 100%)",
                  boxShadow: "0 6px 10px rgba(23,86,165,.25)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 28,
                  bottom: -46,
                  width: 210,
                  height: 210,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 12px 24px rgba(0,0,0,.15)",
                  background: "#fff",
                }}
              >
                <img
                  src={
                    profile?.picture
                      ? `${CV_BASE}/${profile.picture}`
                      : "https://placehold.co/500x500?text=Photo"
                  }
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/500x500?text=Photo")
                  }
                />
              </div>
            </div>

            <div
              className="px-3 px-lg-3"
              style={{ paddingTop: 60, paddingBottom: 24 }}
            >
              <AsideCard title="Address">
                <div className="text-secondary">{location}</div>
              </AsideCard>

              <AsideCard title="Phone">
                <div className="text-secondary">{phone}</div>
              </AsideCard>

              <AsideCard title="Email">
                <div className="text-secondary">{email}</div>
              </AsideCard>

              <AsideCard title="Contacts">
                <ListGroup variant="flush">
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2">
                    <span
                      className="d-inline-grid place-items-center rounded-pill"
                      style={{
                        width: 28,
                        height: 28,
                        background: BRAND,
                        color: "#fff",
                        position: "relative",
                      }}
                    >
                      <FiMail />
                    </span>
                    <span className="text-wrap">{email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2">
                    <span
                      className="d-inline-grid place-items-center rounded-pill"
                      style={{
                        width: 28,
                        height: 28,
                        background: BRAND,
                        color: "#fff",
                      }}
                    >
                      <FiPhone />
                    </span>
                    <span>{phone}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2">
                    <span
                      className="d-inline-grid place-items-center rounded-pill"
                      style={{
                        width: 28,
                        height: 28,
                        background: BRAND,
                        color: "#fff",
                      }}
                    >
                      <FiMapPin />
                    </span>
                    <span className="text-wrap">{location}</span>
                  </ListGroup.Item>
                </ListGroup>
              </AsideCard>

              <AsideCard title="Languages">
                {languages.length ? (
                  <ul className="mb-0 ps-3">
                    {languages.map((l, i) => (
                      <li key={`lang-${i}`} className="mb-1">
                        {l?.language?.language_name || "Language"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>

              <AsideCard title="Skills">
                {knowledge.length ? (
                  <ul className="mb-0 ps-3">
                    {knowledge.map((k, i) => (
                      <li key={`k-${i}`} className="mb-1">
                        {k?.knowledge?.knowledge_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>

              <AsideCard title="Software">
                {software.length ? (
                  <ul className="mb-0 ps-3">
                    {software.map((s, i) => (
                      <li key={`s-${i}`} className="mb-1">
                        {s?.software?.software_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>

              <AsideCard title="Culture Fit">
                {culture.length ? (
                  <ul className="mb-0 ps-3">
                    {culture.map((c, i) => (
                      <li key={`c-${i}`} className="mb-1">
                        {c?.culture?.culture_name || c?.name || c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mb-0 ps-3">
                    {[
                      "Teamwork & Collaboration",
                      "Integrity & Accountability",
                      "Customer-Centered",
                      "Continuous Learning",
                      "Results Oriented",
                    ].map((c, i) => (
                      <li key={`dc-${i}`} className="mb-1">
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </AsideCard>

              <AsideCard title="Personality">
                {personalities.length ? (
                  <ul className="mb-0 ps-3">
                    {personalities.map((p, i) => (
                      <li key={`p-${i}`} className="mb-1">
                        {p?.personality?.personality_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>

              <AsideCard title="Referees">
                {referees.length ? (
                  <div className="d-grid gap-3">
                    {referees.map((r, i) => {
                      const nm = [r.first_name, r.middle_name, r.last_name]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Card
                          key={r.id ?? i}
                          className="border-0 border-start"
                          style={{ borderLeftWidth: 3, borderLeftColor: BRAND }}
                        >
                          <Card.Body className="py-2 px-3">
                            <div className="fw-semibold">{nm || "—"}</div>
                            <div className="text-muted">
                              {r?.referee_position || "—"}
                            </div>
                            <div className="small">{r?.employer || "—"}</div>
                            <div className="small">Tel: {r?.phone || "—"}</div>
                            <div className="small">
                              Email: {r?.email || "—"}
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>
            </div>
          </Col>

          <Col xs={12} lg={8}>
            <div className="p-3 p-lg-4">
              <div className="pb-3 mb-3 border-bottom">
                <div
                  className="position-relative"
                  style={{ height: 30, marginBottom: 6 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 6,
                      width: 46,
                      height: 18,
                      background: BRAND,
                      clipPath: "polygon(30% 0, 100% 0, 80% 100%, 10% 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 56,
                      top: 8,
                      width: 14,
                      height: 14,
                      background: BRAND_DARK,
                      clipPath: "polygon(30% 0, 100% 0, 80% 100%, 10% 100%)",
                    }}
                  />
                </div>
                <h1
                  className="fw-bold"
                  style={{ fontSize: 32, color: "#1f2937", marginBottom: 2 }}
                >
                  {fullName}
                </h1>
                <div className="text-muted fs-5">{currentPosition}</div>
                <div
                  className="text-uppercase fw-bold mt-2"
                  style={{ color: BRAND, letterSpacing: ".02em" }}
                >
                  Introduction
                </div>
                <p className="mb-0 text-justify">{intro}</p>
              </div>

              <Section title="Work Experience" accent>
                {workRows.length ? (
                  <div className="d-grid gap-4">
                    {workRows.map((w, i) => (
                      <Card
                        key={i}
                        className="border-0 border-start"
                        style={{
                          borderLeftColor: BRAND_DARK,
                          borderLeftWidth: 4,
                        }}
                      >
                        <Card.Body className="py-3">
                          <div className="d-flex flex-wrap justify-content-between gap-2">
                            <div className="fw-semibold">{w.org}</div>
                            <div className="text-muted">{w.dates}</div>
                          </div>
                          <div className="text-muted">{w.role}</div>
                          {w.bullets.length ? (
                            <ul
                              className="mb-0 mt-2"
                              style={{ paddingLeft: "1.2rem" }}
                            >
                              {w.bullets.map((b, j) => (
                                <li key={j} className="mb-1">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted">—</div>
                )}
              </Section>

              <Section title="Education" accent>
                <Card className="border">
                  <div
                    className="position-relative text-white"
                    style={{ background: BRAND }}
                  >
                    <Row className="g-0 fw-semibold">
                      <Col
                        xs={6}
                        className="px-3 py-2 border-end"
                        style={{ borderColor: "rgba(255,255,255,.25)" }}
                      >
                        School/College
                      </Col>
                      <Col
                        xs={4}
                        className="px-3 py-2 border-end"
                        style={{ borderColor: "rgba(255,255,255,.25)" }}
                      >
                        Course/Degree
                      </Col>
                      <Col xs={2} className="px-3 py-2">
                        Year
                      </Col>
                    </Row>
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        width: 36,
                        height: "100%",
                        background: `linear-gradient(180deg, ${BRAND}, ${BRAND_DARK})`,
                        clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    />
                  </div>
                  <div>
                    <Row className="g-0 bg-light fw-semibold small border-top border-bottom">
                      <Col xs={6} className="px-3 py-2 border-end">
                        Institution
                      </Col>
                      <Col xs={4} className="px-3 py-2 border-end">
                        Course
                      </Col>
                      <Col xs={1} className="px-3 py-2 border-end">
                        Start
                      </Col>
                      <Col xs={1} className="px-3 py-2">
                        End
                      </Col>
                    </Row>

                    {education.length ? (
                      education
                        .slice()
                        .sort((a, b) => {
                          const bEnd = moment(b?.ended || b?.end_date);
                          const bStart = moment(b?.started || b?.start_date);
                          const aEnd = moment(a?.ended || a?.end_date);
                          const aStart = moment(a?.started || a?.start_date);
                          const bKey =
                            (bEnd.isValid() ? bEnd : bStart).valueOf() || 0;
                          const aKey =
                            (aEnd.isValid() ? aEnd : aStart).valueOf() || 0;
                          return bKey - aKey;
                        })
                        .map((ed, i) => {
                          const startStr = fmtMY(ed?.started || ed?.start_date);
                          const endM = moment(ed?.ended || ed?.end_date);
                          const endStr = endM.isValid()
                            ? endM.format("MMM YYYY")
                            : startStr !== "—"
                            ? "Present"
                            : "—";

                          return (
                            <Row key={i} className="g-0 border-bottom">
                              <Col xs={6} className="px-3 py-2 border-end">
                                {ed?.college?.college_name ||
                                  ed?.institution ||
                                  "—"}
                              </Col>
                              <Col xs={4} className="px-3 py-2 border-end">
                                {ed?.course?.course_name ||
                                  ed?.degree ||
                                  ed?.qualification?.qualification ||
                                  "—"}
                              </Col>
                              <Col xs={1} className="px-3 py-2 border-end">
                                {startStr}
                              </Col>
                              <Col xs={1} className="px-3 py-2">
                                {endStr}
                              </Col>
                            </Row>
                          );
                        })
                    ) : (
                      <div className="px-3 py-2">—</div>
                    )}
                  </div>
                </Card>
              </Section>
            </div>
          </Col>
        </Row>
      </Card>
      <style>{`
        body {
          font-family: "Outfit", system-ui, -apple-system, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
        }
        .text-justify {
          text-align: justify;
        }
        img, svg {
          vertical-align: middle;
          position: relative;
          top: 5px;
          left: 5px;
        }
        .d-inline-block.bg-white.text-dark.px-3.py-1.rounded-pill.fw-bold.border {
          background: #0a58ca !important;
          color: #ffffff !important;
          border-color: #0a58ca !important;
        }
      `}</style>
    </Container>
  );
}

function AsideCard({ title, children }) {
  return (
    <Card className="border-0 mb-3">
      <div
        className="d-inline-block bg-white text-dark px-3 py-1 rounded-pill fw-bold border"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,.05)", width: "auto" }}
      >
        {title}
      </div>
      <Card.Body className="px-0 pt-2 pb-0">{children}</Card.Body>
    </Card>
  );
}

function Section({ title, accent = false, children }) {
  return (
    <div className="mt-3">
      <div
        className="d-flex align-items-center gap-2 mb-2 fw-bold"
        style={{ color: "#202020", fontSize: "1.05rem" }}
      >
        <span
          className={`px-2 py-1 rounded ${accent ? "text-white" : "text-dark"}`}
          style={{ background: accent ? "#1756a5" : "#f8f9fa" }}
        >
          {title}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}