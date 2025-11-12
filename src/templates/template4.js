// Template4.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Badge,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin } from "react-icons/fi";

const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
const CV_BASE = "https://ekazi.co.tz"
const BRAND = "#dc3545";
const BRAND_DARK = "#c10d3dff";
const PAPER = "#ffffff";
const INK = "#1f2937";

 

export default function Template4() {
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status" />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger" className="mb-0">
          {error}
        </Alert>
      </div>
    );
  }

  const profiles = Array.isArray(payload?.applicant_profile)
    ? payload.applicant_profile
    : [];
  const profile = profiles[0] || {};
  const user = Array.isArray(payload?.user)
    ? payload.user[0]
    : payload?.user?.[0] || {};
  const experiences = Array.isArray(payload?.experience)
    ? payload.experience
    : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const languages = Array.isArray(payload?.language) ? payload.language : [];
  const knowledge = Array.isArray(payload?.knowledge) ? payload.knowledge : [];
  const software = Array.isArray(payload?.software) ? payload.software : [];
  const referees = Array.isArray(payload?.referees) ? payload.referees : [];
  const addresses = Array.isArray(payload?.address) ? payload.address : [];
  const culture = Array.isArray(payload?.culture) ? payload.culture : [];

  const fullName =
    `${profile?.first_name || ""} ${profile?.middle_name || ""} ${
      profile?.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim() || "—";

  const currentTitle =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const summary =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const phone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    user?.phone ||
    "—";
  const email = user?.email || payload?.email?.email || "—";
  const location = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0].name : ""
      }`
    : "—";
  const linkedin = payload?.socials?.linkedin || "";
  const website = payload?.socials?.website || "";

  const getLangName = (l) =>
    l?.language?.language_name ?? (typeof l === "string" ? l : "—");
  const getSkillName = (k) =>
    k?.knowledge?.knowledge_name ?? (typeof k === "string" ? k : "—");
  const getSoftName = (s) =>
    s?.software?.software_name ?? (typeof s === "string" ? s : "—");
  const getCultureName = (c) =>
    c?.culture?.culture_name ??
    c?.culture_name ??
    c?.name ??
    (typeof c === "string" ? c : "—");

  const splitLines = (text = "") =>
    text
      .split("\n")
      .map((t) => t.replace(/^•\s*/, "").trim())
      .filter(Boolean);

  const work = experiences.map((e) => ({
    title: e?.position?.position_name || e?.title || "—",
    company: e?.employer?.employer_name || e?.company || e?.organization || "—",
    location: e?.location || "",
    period: `${formatMY(e?.start_date)} – ${
      formatMY(e?.end_date) || "Present"
    }`,
    bullets: splitLines(e?.responsibility || ""),
  }));

  return (
    <Container
      fluid
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        backgroundColor: PAPER,
        padding: "5mm",
        color: INK,
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
      className="p-0 mb-4"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Row className="g-0">
        <Col xs={12}>
          <div
            className="position-relative"
            style={{ backgroundColor: BRAND, height: 120 }}
          >
            <div className="position-absolute" style={{ left: 24, top: 24 }}>
              <h1
                className="m-0 fw-bold"
                style={{ color: "#fff", letterSpacing: ".5px" }}
              >
                {fullName}
              </h1>
              <div className="text-white-50">{currentTitle}</div>
            </div>
            <div className="position-absolute" style={{ right: 24, top: 10 }}>
              <Image
                src={
                  profile?.picture
                    ? `${CV_BASE}/${profile.picture}`
                    : "https://placehold.co/120x120?text=Photo"
                }
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/120x120?text=Photo")
                }
                width={120}
                height={120}
                className="border border-3 border-white shadow"
                style={{ borderRadius: 12, objectFit: "cover" }}
                alt="profile"
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-0">
        {/* LEFT: Summary, Experience, Education */}
        <Col md={8} className="bg-white p-4 text-start border-end">
          {/* Summary */}
          <div className="mb-4">
            <h3 className="h5 fw-bold mb-2" style={{ color: BRAND }}>
              Summary
            </h3>
            <p className="small text-muted lh-base text-justify">{summary}</p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h3 className="h5 fw-bold mb-3" style={{ color: BRAND }}>
              Experience
            </h3>
            {work.length ? (
              work.map((exp, i) => (
                <Card key={i} className="mb-3 border-0 shadow-sm">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="fw-bold" style={{ color: BRAND_DARK }}>
                          {exp.title}
                        </div>
                        <div className="text-muted">{exp.company}</div>
                        {exp.location ? (
                          <div className="text-muted small">{exp.location}</div>
                        ) : null}
                      </div>
                      <Badge bg="light" className="text-dark border">
                        {exp.period}
                      </Badge>
                    </div>
                    {exp.bullets?.length ? (
                      <ul className="mb-0 ps-3">
                        {exp.bullets.map((b, k) => (
                          <li key={k} className="small text-muted mb-1 lh-base">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-muted">—</div>
            )}
          </div>

          {/* Education */}
          <div className="mb-3">
            <h3 className="h5 fw-bold mb-2" style={{ color: BRAND }}>
              Education
            </h3>
            {education.length ? (
              <Card className="border">
                {/* Table Header */}
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
                </div>

                {/* Table Body */}
                <div>
                  {education
                    .slice()
                    .sort((a, b) => {
                      const bDate =
                        parseDate(b?.ended) || parseDate(b?.started) || 0;
                      const aDate =
                        parseDate(a?.ended) || parseDate(a?.started) || 0;
                      return bDate - aDate;
                    })
                    .map((ed, i) => {
                      const sy = formatY(ed?.started);
                      const ey = formatY(ed?.ended);
                      return (
                        <Row key={i} className="g-0 border-top">
                          <Col xs={6} className="px-3 py-2 border-end">
                            {ed?.college?.college_name ||
                              ed?.institution ||
                              "—"}
                          </Col>
                          <Col xs={4} className="px-3 py-2 border-end">
                            {ed?.course?.course_name || ed?.degree || "—"}
                          </Col>
                          <Col xs={2} className="px-3 py-2">
                            {sy && ey ? `${sy} - ${ey}` : sy || ey || "—"}
                          </Col>
                        </Row>
                      );
                    })}
                </div>
              </Card>
            ) : (
              <div className="text-muted">—</div>
            )}
          </div>
        </Col>

        {/* RIGHT: Contact, Skills, Languages, Culture, Referees */}
        <Col md={4} className="bg-light p-4 text-start">
          {/* Contact */}
          <div className="mb-4">
            <h3 className="h6 fw-bold mb-3" style={{ color: BRAND }}>
              Contact
            </h3>
            <ListGroup variant="flush" className="small">
              <ListGroup.Item className="px-0 d-flex align-items-center gap-2 bg-light">
                <FiMapPin />
                <span className="text-wrap">{location}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 d-flex align-items-center gap-2 bg-light">
                <FiPhone />
                <span>{phone}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 d-flex align-items-center gap-2 bg-light">
                <FiMail />
                <span className="text-wrap">{email}</span>
              </ListGroup.Item>
              {(website || linkedin) && (
                <ListGroup.Item className="px-0 d-flex align-items-center gap-2 bg-light">
                  <span
                    className="d-inline-grid place-items-center rounded-pill"
                    style={{
                      width: 26,
                      height: 26,
                      background: BRAND,
                      color: "#fff",
                    }}
                  >
                    {website ? <FiGlobe /> : <FiLinkedin />}
                  </span>
                  <span className="text-wrap">{website || linkedin}</span>
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>

          {/* Skills & Software */}
          <div className="mb-4">
            <h3 className="h6 fw-bold mb-2" style={{ color: BRAND }}>
              Skills
            </h3>
            {knowledge.length ? (
              <ul className="list-unstyled small mb-0">
                {knowledge.map((k, i) => (
                  <li key={`k-${i}`} className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: BRAND }}>
                      •
                    </span>
                    {getSkillName(k)}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted small">—</div>
            )}
            {software.length ? (
              <>
                <div
                  className="mt-3 fw-semibold small"
                  style={{ color: BRAND_DARK }}
                >
                  Software
                </div>
                <ul className="list-unstyled small mb-0">
                  {software.map((s, i) => (
                    <li key={`s-${i}`} className="mb-1 d-flex align-items-center">
                      <span className="me-2" style={{ color: BRAND }}>
                        •
                      </span>
                      {getSoftName(s)}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Languages */}
          <div className="mb-4">
            <h3 className="h6 fw-bold mb-2" style={{ color: BRAND }}>
              Languages
            </h3>
            {languages.length ? (
              <ul className="list-unstyled small mb-0">
                {languages.map((l, i) => (
                  <li key={`l-${i}`} className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: BRAND }}>
                      •
                    </span>
                    {getLangName(l)}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted small">—</div>
            )}
          </div>

          {/* Culture */}
          <div className="mb-4">
            <h3 className="h6 fw-bold mb-2" style={{ color: BRAND }}>
              Culture Fit
            </h3>
            {culture.length ? (
              <ul className="list-unstyled small mb-0">
                {culture.map((c, i) => (
                  <li key={`c-${i}`} className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: BRAND }}>
                      •
                    </span>
                    {getCultureName(c)}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list-unstyled small mb-0">
                {[
                  "Teamwork & Collaboration",
                  "Integrity & Accountability",
                  "Customer-Centered",
                ].map((c, i) => (
                  <li key={`dc-${i}`} className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: BRAND }}>
                      •
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Referees */}
          {referees.length ? (
            <div className="mb-2">
              <h3 className="h6 fw-bold mb-2" style={{ color: BRAND }}>
                Referees
              </h3>
              <div className="d-grid gap-2">
                {referees.map((r, i) => {
                  const nm = [r.first_name, r.middle_name, r.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <Card
                      key={r.id ?? i}
                      className="border-0 border-start"
                      style={{ borderLeftColor: BRAND, borderLeftWidth: 3 }}
                    >
                      <Card.Body className="py-2 px-3">
                        <div className="fw-semibold">{nm || "—"}</div>
                        <div className="text-muted small">
                          {r?.referee_position || "—"}
                        </div>
                        <div className="small">{r?.employer || "—"}</div>
                        <div className="small">Tel: {r?.phone || "—"}</div>
                        <div className="small">Email: {r?.email || "—"}</div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : null}
        </Col>
      </Row>

      <style>{`
        body { font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji", sans-serif; }
        .text-justify { text-align: justify; }
      `}</style>
    </Container>
  );
}

/** ---------- DATE HELPERS ---------- **/
function parseDate(d) {
  if (!d) return null;
  try {
    if (d instanceof Date) return d;
    if (typeof d === "string") {
      const datePart = d.split(/[ T]/)[0];
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        const iso = `${datePart}T00:00:00`;
        const dt = new Date(iso);
        return isNaN(dt) ? null : dt;
      }
      const dt = new Date(d.replace(" ", "T"));
      return isNaN(dt) ? null : dt;
    }
    const dt = new Date(d);
    return isNaN(dt) ? null : dt;
  } catch {
    return null;
  }
}

function formatMY(d) {
  const dt = parseDate(d);
  if (!dt) return "";
  try {
    return dt.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatY(d) {
  const dt = parseDate(d);
  if (!dt) return "";
  try {
    return dt.getFullYear();
  } catch {
    return "";
  }
}
