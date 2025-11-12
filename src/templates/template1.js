// Template1.jsx — Compatible with provided format (uses moment, no helpers)
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
const CV_BASE = "https://ekazi.co.tz";
const BRAND = "#1756a5";
const BRAND_DARK = "#0e3668";

const Template1 = () => {
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

  // ===== Extract Payload Safely =====
  const profiles = Array.isArray(payload?.applicant_profile)
    ? payload.applicant_profile
    : [];
  const personalities = Array.isArray(payload?.applicant_personality)
    ? payload.applicant_personality
    : [];
  const experiences = Array.isArray(payload?.experience)
    ? payload.experience
    : [];
  const referees = Array.isArray(payload?.referees) ? payload.referees : [];
  const languages = Array.isArray(payload?.language) ? payload.language : [];
  const users = Array.isArray(payload?.user) ? payload.user : [];
  const addresses = Array.isArray(payload?.address) ? payload.address : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const skills = Array.isArray(payload?.knowledge) ? payload.knowledge : [];
  const software = Array.isArray(payload?.software) ? payload.software : [];
  const tools = Array.isArray(payload?.tools) ? payload.tools : [];
  const culture = Array.isArray(payload?.culture) ? payload.culture : [];

  const fullName = (() => {
    const p = profiles[0] || {};
    const name = `${p?.first_name || ""} ${p?.middle_name || ""} ${
      p?.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim();
    return name || "—";
  })();

  const currentTitle =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const summary =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const primaryEmail = users?.[0]?.email || payload?.email?.email || "—";
  const primaryPhone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    users?.[0]?.phone ||
    "—";
  const primaryAddress = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0]?.name : ""
      }`.replace(/^,\s*/, "")
    : "—";

  // ===== Work Experience (sorted & formatted via moment) =====
  const work = experiences
    .slice()
    .sort((a, b) => {
      const bEnd = moment(b?.end_date);
      const bStart = moment(b?.start_date);
      const aEnd = moment(a?.end_date);
      const aStart = moment(a?.start_date);
      const bKey = (bEnd.isValid() ? bEnd : bStart).valueOf() || 0;
      const aKey = (aEnd.isValid() ? aEnd : aStart).valueOf() || 0;
      return bKey - aKey;
    })
    .map((e) => {
      const start = moment(e?.start_date);
      const end = moment(e?.end_date);
      const period =
        (start.isValid() ? start.format("MMM YYYY") : "") +
        " – " +
        (end.isValid() ? end.format("MMM YYYY") : "Present");

      return {
        title: e?.position?.position_name || e?.title || "—",
        company:
          e?.employer?.employer_name || e?.company || e?.organization || "—",
        industry: e?.industry?.industry_name || "",
        location: `${e?.employer?.region?.region_name || ""}${
          e?.employer?.sub_location ? ", " + e?.employer?.sub_location : ""
        }`.replace(/^,\s*/, ""),
        period,
        bullets: (e?.responsibility || "")
          .split("\n")
          .map((t) => t.trim().replace(/^•\s*/, ""))
          .filter(Boolean),
      };
    });

  // ===== Education (sorted & formatted via moment) =====
  const eduVM = education
    .slice()
    .sort((a, b) => {
      const bEnd = moment(b?.ended || b?.end_date);
      const bStart = moment(b?.started || b?.start_date);
      const aEnd = moment(a?.ended || a?.end_date);
      const aStart = moment(a?.started || a?.start_date);
      const bKey = (bEnd.isValid() ? bEnd : bStart).valueOf() || 0;
      const aKey = (aEnd.isValid() ? aEnd : aStart).valueOf() || 0;
      return bKey - aKey;
    })
    .map((ed) => {
      const start = moment(ed?.started || ed?.start_date);
      const end = moment(ed?.ended || ed?.end_date);
      return {
        school:
          ed?.college?.college_name || ed?.institution || ed?.school || "—",
        course:
          ed?.course?.course_name ||
          ed?.qualification?.qualification ||
          ed?.degree ||
          "—",
        yearRange:
          (start.isValid() ? start.format("YYYY") : "") +
          (start.isValid() || end.isValid() ? " - " : "") +
          (end.isValid()
            ? end.format("YYYY")
            : start.isValid()
            ? "Present"
            : ""),
        period:
          (start.isValid() ? start.format("MMM YYYY") : "") +
          (start.isValid() || end.isValid() ? " – " : "") +
          (end.isValid() ? end.format("MMM YYYY") : ""),
      };
    });

  return (
    <Container
      fluid
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        backgroundColor: "#000",
        padding: "5mm",
        fontFamily:
          '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <Row className="text-start">
        {/* LEFT SECTION */}
        <Col md={8} className="bg-white shadow-sm p-4">
          {/* Header */}
          <div className="mb-3">
            <h2
              className="fw-bold text-uppercase mb-1"
              style={{ fontSize: "1.1rem", color: BRAND_DARK }}
            >
              {fullName}
            </h2>
            <div className="text-muted" style={{ fontSize: ".95rem" }}>
              {currentTitle}
            </div>
          </div>

          {/* About */}
          <Card className="border-0 p-0 mb-3">
            <Card.Title
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem", color: BRAND }}
            >
              About
            </Card.Title>
            <Card.Body className="p-0">
              <p
                className="mb-0"
                style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                {summary}
              </p>
            </Card.Body>
          </Card>

          {/* Career Objective */}
          {payload?.objective?.objective ? (
            <Card className="border-0 p-0 mb-3">
              <Card.Title
                className="fw-semibold text-uppercase mb-2"
                style={{ fontSize: "1rem", color: BRAND }}
              >
                Career Objective
              </Card.Title>
              <Card.Body className="p-0">
                <p
                  className="mb-0"
                  style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
                >
                  {payload.objective.objective}
                </p>
              </Card.Body>
            </Card>
          ) : null}

          {/* Job Experience */}
          <Card className="border-0 p-0 mb-3">
            <Card.Title
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem", color: BRAND }}
            >
              Job Experience
            </Card.Title>
            <Card.Body className="p-0" style={{ fontSize: "0.95rem" }}>
              {work.length > 0 ? (
                work.map((exp, i) => (
                  <div key={i} className="mb-4 text-start">
                    <div className="d-flex justify-content-between gap-3">
                      <div>
                        <div
                          className="fw-bold text-capitalize"
                          style={{ color: BRAND_DARK }}
                        >
                          {exp.title}
                        </div>
                        <div className="text-muted">
                          {exp.company}
                          {exp.industry ? ` / ${exp.industry}` : ""}
                        </div>
                        {exp.location ? (
                          <div className="text-muted small">{exp.location}</div>
                        ) : null}
                      </div>
                      <Badge
                        bg="light"
                        className="text-dark border align-self-start"
                      >
                        {exp.period}
                      </Badge>
                    </div>

                    {exp.bullets.length > 0 ? (
                      <ul className="small mb-0 mt-2 ps-3">
                        {exp.bullets.map((b, k) => (
                          <li key={k} className="text-muted lh-base">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="mb-0 text-muted">No job experience added.</p>
              )}
            </Card.Body>
          </Card>

          {/* Skills & Endorsements */}
          <Card className="border-0 p-0">
            <Card.Title
              className="fw-semibold text-uppercase mb-2"
              style={{ fontSize: "1rem", color: BRAND }}
            >
              Skills & Endorsements
            </Card.Title>
            <Card.Body className="p-0" style={{ fontSize: "0.95rem" }}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <p className="fw-semibold mb-0" style={{ minWidth: 110 }}>
                  Culture Fit:
                </p>
                <p className="small mb-0">
                  {culture.length
                    ? culture
                        .map(
                          (c) =>
                            c?.culture?.culture_name ||
                            c?.culture_name ||
                            c?.name
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3 mb-2">
                <p className="fw-semibold mb-0" style={{ minWidth: 110 }}>
                  Personality:
                </p>
                <p className="small mb-0">
                  {personalities.length
                    ? personalities
                        .map((p) => p?.personality?.personality_name)
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3 mb-2">
                <p className="fw-semibold mb-0" style={{ minWidth: 110 }}>
                  Software:
                </p>
                <p className="small mb-0">
                  {software.length
                    ? software
                        .map(
                          (s) => s?.software?.software_name || s?.software_name
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3 mb-2">
                <p className="fw-semibold mb-0" style={{ minWidth: 110 }}>
                  Skills & Knowledge:
                </p>
                <p className="small mb-0">
                  {skills.length
                    ? skills
                        .map(
                          (k) =>
                            k?.knowledge?.knowledge_name || k?.knowledge_name
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <p className="fw-semibold mb-0" style={{ minWidth: 110 }}>
                  Tools:
                </p>
                <p className="small mb-0">
                  {tools.length
                    ? tools
                        .map((t) => t?.tool?.tool_name || t?.tool_name)
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT SECTION */}
        <Col md={4} className="bg-dark text-light p-4">
          {/* Photo */}
      {profiles.length ? (
  <div className="text-center mb-4">
    <img
      src={
        profiles[0]?.picture
          ? `${CV_BASE}/${profiles[0].picture}`
          : "https://placehold.co/120x120?text=Photo"
      }
      alt="profile"
      className="border border-3 border-white rounded"
      width="100"
      height="100"
      onError={(e) =>
        (e.currentTarget.src = "https://placehold.co/120x120?text=Photo")
      }
      style={{ objectFit: "cover" }}
    />
  </div>
) : null}

          {/* Language */}
          <div className="small mb-4">
            <h5
              className="border-bottom fw-bold pb-1 text-uppercase"
              style={{ fontSize: "1rem", borderColor: "rgba(255,255,255,.25)" }}
            >
              Language
            </h5>
            <ul className="mb-0">
              {languages.length ? (
                languages.map((language, i) => (
                  <li key={i} className="small text-start">
                    {language?.language?.language_name || "—"}
                  </li>
                ))
              ) : (
                <li className="small text-start">—</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="small mb-4">
            <h5
              className="fw-bold border-bottom text-uppercase mb-2 pb-1"
              style={{ fontSize: "1rem", borderColor: "rgba(255,255,255,.25)" }}
            >
              Contact Me
            </h5>
            <ul className="mb-0">
              <li>{primaryPhone}</li>
              <li>{primaryEmail}</li>
              {addresses.length ? (
                addresses.map((a, i) => (
                  <li key={i}>
                    {`${a?.region_name || ""}${
                      a?.name ? ", " + a?.name : ""
                    }`.replace(/^,\s*/, "")}
                  </li>
                ))
              ) : (
                <li>{primaryAddress}</li>
              )}
            </ul>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h5
              className="fw-bold border-bottom pb-1 text-uppercase"
              style={{ fontSize: "1rem", borderColor: "rgba(255,255,255,.25)" }}
            >
              Education
            </h5>
            {eduVM.length > 0 ? (
              <ul className="small ps-3 text-start mb-0">
                {eduVM.map((edu, i) => (
                  <li key={i} className="mt-2">
                    <strong>{edu.course}</strong>
                    <br />
                    {edu.school}{" "}
                    <span className="text-secondary">({edu.yearRange})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-0">No education records available.</p>
            )}
          </div>

          {/* Referees */}
          <div className="border-0 p-0">
            <div
              className="fw-bold text-uppercase border-bottom mb-2 pb-1"
              style={{ fontSize: "1rem", borderColor: "rgba(255,255,255,.25)" }}
            >
              Referees
            </div>
            <ul
              className="p-0 list-unstyled mb-0"
              style={{ fontSize: "0.95rem" }}
            >
              {referees.length > 0 ? (
                referees.map((r, index) => {
                  const name = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <li key={index} className="mb-2 text-start">
                      <h6 className="mb-0">{name || "—"}</h6>
                      <p className="small mb-1">
                        <em>{r?.referee_position || "—"}</em>
                      </p>
                      <p className="small mb-0">{r?.employer || "—"}</p>
                      <p className="small mb-0">{r?.email || "—"}</p>
                      <p className="small mb-0">{r?.phone || "—"}</p>
                    </li>
                  );
                })
              ) : (
                <p className="mb-0">No referees added.</p>
              )}
            </ul>
          </div>
        </Col>
      </Row>

      <style>{`
        body { font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji", sans-serif; }
      `}</style>
    </Container>
  );
};

export default Template1;
