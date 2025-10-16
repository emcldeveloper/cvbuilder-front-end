
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

const formatMY = (d) => {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
};

 


  const profiles = payload?.applicant_profile || [];
  const profile = profiles[0] || {};
  const experiences = payload?.experience || [];
  const referees = payload?.referees || [];
  const addresses = payload?.address || [];
  const education = payload?.education || [];
  const languages = payload?.language || [];
  const knowledge = payload?.knowledge || [];
  const software = payload?.software || [];
  const culture = payload?.culture || [];
  const personalities = payload?.applicant_personality || [];

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
    <Container className="my-4 d-flex justify-content-center">
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Card
        className="shadow-sm overflow-hidden"
        style={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      >
        <Row className="g-0">
          {/* Sidebar */}
          <Col xs={12} lg={4} className="sidebar border-end">
            <div
              className="d-flex justify-content-center align-items-center position-relative"
              style={{
                background: BRAND_LIGHT,
                minHeight: 220,
                padding: "1.5rem 0",
              }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
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
              style={{ paddingTop: 24, paddingBottom: 24 }}
            >
              <AsideCard className="brand-color" title="Address">
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
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2 flex-wrap">
                    <span className="contact-icon">
                      <FiMail />
                    </span>
                    <span className="text-wrap">{email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2 flex-wrap">
                    <span className="contact-icon">
                      <FiPhone />
                    </span>
                    <span>{phone}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 d-flex align-items-center gap-2 flex-wrap">
                    <span className="contact-icon">
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
                    {culture.map((c, i) => (
                      <li key={`c-${i}`} className="mb-1">
                        {c?.culture?.culture_name || c?.name || c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted small">—</div>
                )}
              </AsideCard>

              {/* Culture Fit - without brand background */}
              <Section title="Culture Fit" accent={false}>
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
              </Section>

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

          {/* Main section */}
          <Col xs={12} lg={8}>
            <div className="p-4 px-md-5 pt-md-4">
              {/* Header */}
              <div className="pb-3 mb-3 border-bottom">
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

              {/* Work Experience */}
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

              {/* Education - Improved Table Layout */}
              <Section title="Education" accent>
                <Card className="border overflow-hidden rounded-3">
                  <div
                    style={{
                      background: BRAND,
                      color: "#fff",
                      fontWeight: 600,
                      padding: "10px 16px",
                      fontSize: "1rem",
                      letterSpacing: ".02em",
                    }}
                  >
                    Education
                  </div>

                  <div className="table-responsive">
                    <table className="table mb-0 align-middle table-striped">
                     <thead
                        style={{
                          backgroundColor: BRAND_LIGHT,
                          color: "#1756a5",
                          fontWeight: 600,
                          borderBottom: `2px solid ${BRAND}`, // ✅ wrap in backticks and make it a string
                        }}
                      >

                        <tr>
                          <th style={{ width: "40%" }}>Institution</th>
                          <th style={{ width: "35%" }}>Course</th>
                          <th style={{ width: "12%", textAlign: "center" }}>
                            Start
                          </th>
                          <th style={{ width: "13%", textAlign: "center" }}>
                            End
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {education.length ? (
                          education
                            .slice()
                            .sort((a, b) => {
                              const bEnd = moment(b?.ended || b?.end_date);
                              const aEnd = moment(a?.ended || a?.end_date);
                              return (
                                (bEnd.isValid() ? bEnd.valueOf() : 0) -
                                (aEnd.isValid() ? aEnd.valueOf() : 0)
                              );
                            })
                            .map((ed, i) => (
                              <tr key={i}>
                                <td>
                                  {ed?.college?.college_name ||
                                    ed?.institution ||
                                    "—"}
                                </td>
                                <td>
                                  {ed?.course?.course_name ||
                                    ed?.degree ||
                                    ed?.qualification?.qualification ||
                                    "—"}
                                </td>
                                <td className="text-center">
                                  {formatMY(ed?.started || ed?.start_date)}
                                </td>
                                <td className="text-center">
                                  {formatMY(ed?.ended || ed?.end_date)}
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td
                              colSpan="4"
                              className="text-center text-muted py-3"
                            >
                              No education records available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <style>{`
    .table th, .table td {
      padding: 0.55rem 0.75rem !important;
      vertical-align: middle;
    }
    .table-striped > tbody > tr:nth-of-type(odd) {
      background-color: #f9fbfd;
    }
    .table-striped > tbody > tr:hover {
      background-color: #f1f5fb;
    }
  `}</style>
              </Section>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        body { font-family: "Outfit", sans-serif; }
        .text-justify { text-align: justify; }
        .sidebar { background: #f8fafc; border-right: 1px solid #eef2f7 !important; }
        .contact-icon {
          width: 28px; height: 28px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 50%; background: ${BRAND}; color: #fff; flex-shrink: 0;
        }
        .d-inline-block.bg-white.text-dark.px-3.py-1.rounded-pill.fw-bold.border {
  background: #1756a5 !important; /* BRAND color */
  color: #ffffff !important;      /* White text */
  border-color: #1756a5 !important;
}
        @media (max-width: 768px) {
          .sidebar { border-right: none !important; border-bottom: 1px solid #eef2f7 !important; }
          .p-4, .px-md-5 { padding: 1.5rem !important; }
        }
      `}</style>
    </Container>
  );
}

/* Utility Components */
function AsideCard({ title, children }) {
  return (
    <Card className="border-0 mb-3">
      <div
        className="d-inline-block bg-white text-dark px-3 py-1 rounded-pill fw-bold border"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,.05)" }}
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
