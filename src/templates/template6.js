// Template6.jsx — Template1 data model + Template6 UI
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
 
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const CV_BASE = "https://ekazi.co.tz";
// Brand color for Template6 UI
const BRAND = "#d36314";
const BRAND_DARK = "#8B3A0F";

// ------- Small UI helpers -------
const SectionTitle = ({ icon: Icon, children, light = false }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <Icon size={16} />
    <h5 className={`fw-bold mb-0 ${light ? "text-light" : ""}`}>{children}</h5>
    <div
      style={{
        height: 3,
        background: BRAND,
        width: 90,
        marginLeft: 6,
        borderRadius: 2,
      }}
    />
  </div>
);

const TimelineItem = ({ title, right, subtitle, children }) => (
  <div className="pb-3 mb-3 position-relative">
    <div className="d-flex justify-content-between align-items-start">
      <div className="pe-3">
        <div className="fw-semibold">{title}</div>
        {subtitle && <div className="text-muted small">{subtitle}</div>}
      </div>
      {right && (
        <Badge bg="light" text="dark" className="border">
          {right}
        </Badge>
      )}
    </div>
    {children && <div className="mb-0 mt-2 text-muted small">{children}</div>}
    <span
      style={{
        position: "absolute",
        left: -13,
        top: 8,
        width: 10,
        height: 10,
        background: BRAND,
        borderRadius: "50%",
      }}
    />
  </div>
);

// ================== COMPONENT ==================
const Template6 = () => {
  // ------- Fetch (from Template1) -------
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

  // ------- Parse (same as Template1, safely) -------
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

  // ================== RENDER (Template6 UI) ==================
  return (
    <Container
      fluid
      className="py-5"
      style={{
        fontFamily:
          '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Row className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Header / Hero */}
        <Col xs={12} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 d-flex align-items-center gap-4">
              <Image
                src={
                  profiles?.[0]?.picture
                    ? `${CV_BASE}/${profiles[0].picture}`
                    : "https://placehold.co/140x140?text=Photo"
                }
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/140x140?text=Photo")
                }
                alt="Profile"
                roundedCircle
                style={{
                  border: `6px solid ${BRAND}`,
                  width: 140,
                  height: 140,
                  objectFit: "cover",
                }}
              />
              <div className="flex-grow-1">
                <div className="text-uppercase small text-muted">
                  {currentTitle}
                </div>
                <h2 className="fw-extrabold mb-1" style={{ color: BRAND }}>
                  {fullName?.split(" ")?.slice(0, -1).join(" ") || fullName}{" "}
                  <span className="text-dark">
                    {fullName?.split(" ").slice(-1)[0] || ""}
                  </span>
                </h2>
                <div
                  style={{
                    height: 6,
                    width: 140,
                    background: BRAND,
                    borderRadius: 6,
                  }}
                />
              </div>
              <div className="d-none d-md-block">
                <div className="d-flex flex-column small">
                  <span className="mb-1">
                    <FiPhone /> {primaryPhone}
                  </span>
                  <span className="mb-1">
                    <FiMail /> {primaryEmail}
                  </span>
                  <span>
                    <FiMapPin /> {primaryAddress}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Left column (About + Skills) */}
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <SectionTitle icon={FiUser}>About Me</SectionTitle>
              <p className="text-muted small">{summary}</p>

              {/* Culture / Personality / Software / Skills / Tools */}
              <div className="mt-4">
                <SectionTitle icon={FiBookOpen}>Skills & Profile</SectionTitle>

                <div className="d-flex align-items-start gap-2 mb-2">
                  <strong style={{ minWidth: 115 }} className="small">
                    Culture Fit:
                  </strong>
                  <span className="small text-muted">
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
                  </span>
                </div>

                <div className="d-flex align-items-start gap-2 mb-2">
                  <strong style={{ minWidth: 115 }} className="small">
                    Personality:
                  </strong>
                  <span className="small text-muted">
                    {personalities.length
                      ? personalities
                          .map((p) => p?.personality?.personality_name)
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </span>
                </div>

                <div className="d-flex align-items-start gap-2 mb-2">
                  <strong style={{ minWidth: 115 }} className="small">
                    Software:
                  </strong>
                  <span className="small text-muted">
                    {software.length
                      ? software
                          .map(
                            (s) =>
                              s?.software?.software_name || s?.software_name
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </span>
                </div>

                <div className="d-flex align-items-start gap-2 mb-2">
                  <strong style={{ minWidth: 115 }} className="small">
                    Skills:
                  </strong>
                  <span className="small text-muted">
                    {skills.length
                      ? skills
                          .map(
                            (k) =>
                              k?.knowledge?.knowledge_name || k?.knowledge_name
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </span>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <strong style={{ minWidth: 115 }} className="small">
                    Tools:
                  </strong>
                  <span className="small text-muted">
                    {tools.length
                      ? tools
                          .map((t) => t?.tool?.tool_name || t?.tool_name)
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="mt-4">
                <SectionTitle icon={FiGlobe}>Languages</SectionTitle>
                <ul className="mb-0 small">
                  {languages.length ? (
                    languages.map((language, i) => (
                      <li key={i}>
                        {language?.language?.language_name || "—"}
                      </li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right column (Experience + Education + Referees) */}
        <Col md={8} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              {/* Experience */}
              <SectionTitle icon={FiBriefcase}>Job Experience</SectionTitle>
              <div
                className="ps-3 border-start"
                style={{ borderColor: "#eee", borderWidth: 2 }}
              >
                {work.length > 0 ? (
                  work.map((exp, i) => (
                    <TimelineItem
                      key={i}
                      title={`${exp.title} — ${exp.company}`}
                      subtitle={
                        [exp.industry, exp.location && exp.location.trim()]
                          .filter(Boolean)
                          .join(" / ") || undefined
                      }
                      right={exp.period}
                    >
                      {exp.bullets.length > 0 ? (
                        <ul className="small mb-0 ps-3">
                          {exp.bullets.map((b, k) => (
                            <li key={k} className="lh-base">
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </TimelineItem>
                  ))
                ) : (
                  <p className="text-muted small mb-0">
                    No job experience added.
                  </p>
                )}
              </div>

              {/* Education */}
              <div className="mt-4">
                <SectionTitle icon={FiBookOpen}>Education</SectionTitle>
                <div
                  className="ps-3 border-start"
                  style={{ borderColor: "#eee", borderWidth: 2 }}
                >
                  {eduVM.length > 0 ? (
                    eduVM.map((edu, i) => (
                      <TimelineItem
                        key={i}
                        title={`${edu.course} — ${edu.school}`}
                        right={edu.yearRange}
                      />
                    ))
                  ) : (
                    <p className="text-muted small mb-0">
                      No education records available.
                    </p>
                  )}
                </div>
              </div>

              {/* Referees */}
              <div className="mt-4">
                <SectionTitle icon={FiUser}>Referees</SectionTitle>
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
                          <div className="fw-semibold">{name || "—"}</div>
                          <div className="small text-muted">
                            {r?.referee_position || "—"} • {r?.employer || "—"}
                          </div>
                          <div className="small">{r?.email || "—"}</div>
                          <div className="small">{r?.phone || "—"}</div>
                        </li>
                      );
                    })
                  ) : (
                    <p className="text-muted small mb-0">No referees added.</p>
                  )}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer stripe */}
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        <div
          style={{
            height: 8,
            width: 180,
            background: BRAND,
            borderRadius: 8,
            margin: "0 auto",
          }}
        />
      </div>
    </Container>
  );
};

export default Template6;
