// Template8.jsx — Final Polished Version (Fixed Dot Alignment + Perfect Timeline Flow)
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
  FiTag,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const CV_BASE = "https://ekazi.co.tz";
const BRAND = "#FF2D20";
const BRAND_DARK = "#b32018";
const BG_SOFT = "#fff7f6";

// ---------- Chips ----------
const Chips = ({ items }) => {
  if (!items?.length) return <span className="text-muted">—</span>;
  return (
    <div className="d-flex flex-wrap gap-2 mt-1">
      {items.map((txt, i) => (
        <span
          key={i}
          className="px-2 py-1 small"
          style={{
            background: "rgba(255,45,32,.08)",
            border: "1px solid rgba(255,45,32,.25)",
            color: BRAND_DARK,
            borderRadius: 999,
            transition:
              "transform 120ms ease, background 120ms ease, border-color 120ms ease",
          }}
        >
          {txt}
        </span>
      ))}
    </div>
  );
};

// ---------- Section Header ----------
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: BRAND,
        color: "#fff",
        boxShadow: "0 0 0 4px rgba(255,45,32,.15)",
      }}
    >
      <Icon size={14} />
    </span>
    <h5 className="mb-0 fw-semibold" style={{ color: BRAND_DARK }}>
      {title}
    </h5>
    <div
      style={{
        flexGrow: 1,
        height: 2,
        background: BRAND,
        borderRadius: 2,
        marginLeft: 6,
      }}
    />
  </div>
);

// ---------- Timeline Item ----------
const TimelineItem = ({ title, meta, period, bullets, index }) => (
  <div
    className="timeline-item position-relative mb-4"
    style={{ paddingLeft: "2rem" }}
  >
    <span
      className="timeline-dot"
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 14,
        height: 14,
        background: BRAND,
        border: "3px solid #fff",
        borderRadius: "50%",
        boxShadow: "0 0 0 4px rgba(255,45,32,.15)",
      }}
    />
    <div
      className="p-3 shadow-sm rounded border bg-white"
      style={{
        borderColor: "rgba(255,45,32,.2)",
      }}
    >
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <div className="fw-semibold" style={{ color: BRAND_DARK }}>
            {title}
          </div>
          {meta && <div className="small text-muted">{meta}</div>}
        </div>
        {period && (
          <Badge bg="light" text="dark" className="border small">
            {period}
          </Badge>
        )}
      </div>
      {bullets?.length ? (
        <ul className="small mb-0 ps-3 text-muted">
          {bullets.map((b, i) => (
            <li key={i} className="lh-base">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);

const Template8 = () => {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP error! status: ${res.status}');
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
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status" />
        <span className="ms-3">Loading CV…</span>
      </div>
    );

  if (error)
    return (
      <div className="container py-4">
        <Alert variant="danger" className="mb-0">
          {error}
        </Alert>
      </div>
    );

  // Extract data
  const profiles = payload?.applicant_profile || [];
  const personalities = payload?.applicant_personality || [];
  const experiences = payload?.experience || [];
  const referees = payload?.referees || [];
  const languages = payload?.language || [];
  const users = payload?.user || [];
  const addresses = payload?.address || [];
  const education = payload?.education || [];
  const skills = payload?.knowledge || [];
  const software = payload?.software || [];
  const tools = payload?.tools || [];
  const culture = payload?.culture || [];

  const fullName = `${profiles?.[0]?.first_name || ""} ${
    profiles?.[0]?.middle_name || ""
  } ${profiles?.[0]?.last_name || ""}`
    .replace(/\s+/g, " ")
    .trim();

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

  // Work Experience
  const work = experiences.map((e) => {
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

  // Education
  const eduVM = education.map((ed) => {
    const start = moment(ed?.started || ed?.start_date);
    const end = moment(ed?.ended || ed?.end_date);
    return {
      school: ed?.college?.college_name || ed?.institution || ed?.school || "—",
      course:
        ed?.course?.course_name ||
        ed?.qualification?.qualification ||
        ed?.degree ||
        "—",
      years:
        (start.isValid() ? start.format("YYYY") : "") +
        (start.isValid() || end.isValid() ? " - " : "") +
        (end.isValid() ? end.format("YYYY") : "Present"),
    };
  });

  const chipsCulture = culture
    .map((c) => c?.culture?.culture_name || c?.culture_name || c?.name)
    .filter(Boolean);
  const chipsPersonality = personalities
    .map((p) => p?.personality?.personality_name)
    .filter(Boolean);
  const chipsSoftware = software
    .map((s) => s?.software?.software_name || s?.software_name)
    .filter(Boolean);
  const chipsSkills = skills
    .map((k) => k?.knowledge?.knowledge_name || k?.knowledge_name)
    .filter(Boolean);
  const chipsTools = tools
    .map((t) => t?.tool?.tool_name || t?.tool_name)
    .filter(Boolean);

  return (
    <Container fluid className="p-0 bg-white">
      <style>{`
        .timeline-item::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 0;
          bottom: -12px;
          width: 2px;
          background: linear-gradient(${BRAND}, rgba(255,45,32,0.15));
        }
      `}</style>

      {/* HEADER */}
      <div
        className="py-4 border-bottom"
        style={{
          background: "#fff",
          borderBottom: '4px solid ${BRAND}',
        }}
      >
        <Row className="mx-auto align-items-center" style={{ maxWidth: 1100 }}>
          <Col xs={12} md="auto" className="text-center mb-3 mb-md-0">
            <Image
              src={
                profiles?.[0]?.picture
                  ? `${CV_BASE}/${profiles[0].picture}`
                  : "https://placehold.co/120x120?text=Photo"
              }
              
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x120?text=Photo")
              }
              roundedCircle
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: '5px solid ${BRAND}',
              }}
            />
          </Col>
          <Col>
            <div className="text-uppercase small text-muted">
              {currentTitle}
            </div>
            <h2 className="fw-bold mb-1" style={{ color: BRAND_DARK }}>
              {fullName}
            </h2>
       
             <div
              style={{
                height: 5,
                width: 150,
                background: BRAND,
                borderRadius: 8,
              }}
              className="mb-2"
            />
        
            <div className="small text-muted">
              <FiPhone /> {primaryPhone} &nbsp; | &nbsp;
              <FiMail /> {primaryEmail} &nbsp; | &nbsp;
              <FiMapPin /> {primaryAddress}
            </div>
          </Col>
        </Row>
      </div>

      {/* BODY */}
      <Row className="mx-auto py-4 g-4" style={{ maxWidth: 1100 }}>
        {/* LEFT */}
        <Col md={8}>
          {/* About */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <SectionHeader icon={FiUser} title="About" />
              <p className="small text-muted mb-0">{summary}</p>
            </Card.Body>
          </Card>

          {/* Experience */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <SectionHeader icon={FiBriefcase} title="Job Experience" />
              {work.length ? (
                work.map((w, i) => (
                  <TimelineItem
                    key={i}
                    
                    title={`${w.title} — ${w.company}`}
                    meta={[w.industry, w.location].filter(Boolean).join(" / ")}
                    period={w.period}
                    bullets={w.bullets}
                    index={i}
                  />
                ))
              ) : (
                <p className="text-muted small">No job experience added.</p>
              )}
            </Card.Body>
          </Card>

          {/* Education */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <SectionHeader icon={FiBookOpen} title="Education" />
              {eduVM.length ? (
                eduVM.map((ed, i) => (
                  <div key={i} className="mb-3">
                    <div className="fw-semibold" style={{ color: BRAND_DARK }}>
                      {ed.course}
                    </div>
                    <div className="small text-muted">{ed.school}</div>
                    <div className="small">{ed.years}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted small mb-0">
                  No education records available.
                </p>
              )}
            </Card.Body>
          </Card>

          {/* Referees */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <SectionHeader icon={FiUser} title="Referees" />
              {referees.length ? (
                referees.map((r, i) => {
                  const name = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="mb-3">
                      <div
                        className="fw-semibold"
                        style={{ color: BRAND_DARK }}
                      >
                        {name || "—"}
                      </div>
                      <div className="small text-muted mb-1">
                        {r?.referee_position || "—"} • {r?.employer || "—"}
                      </div>
                      <div className="small">{r?.email || "—"}</div>
                      <div className="small">{r?.phone || "—"}</div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted small mb-0">No referees added.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT */}
        <Col md={4}>
          {/* Contact */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <SectionHeader icon={FiMail} title="Contact" />
              <ul className="small list-unstyled mb-0">
                <li>
                  <FiPhone /> {primaryPhone}
                </li>
                <li>
                  <FiMail /> {primaryEmail}
                </li>
                <li>
                  <FiMapPin /> {primaryAddress}
                </li>
              </ul>
            </Card.Body>
          </Card>

          {/* Languages */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <SectionHeader icon={FiGlobe} title="Languages" />
              <ul className="small ps-3 mb-0">
                {languages.length ? (
                  languages.map((l, i) => (
                    <li key={i}>{l?.language?.language_name || "—"}</li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </Card.Body>
          </Card>

          {/* Skills & Culture */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <SectionHeader icon={FiTag} title="Skills & Culture" />
              <div className="small text-muted mb-1">Culture Fit</div>
              <Chips items={chipsCulture} />
              <div className="small text-muted mt-3 mb-1">Personality</div>
              <Chips items={chipsPersonality} />
              <div className="small text-muted mt-3 mb-1">Software</div>
              <Chips items={chipsSoftware} />
              <div className="small text-muted mt-3 mb-1">Skills</div>
              <Chips items={chipsSkills} />
              <div className="small text-muted mt-3 mb-1">Tools</div>
              <Chips items={chipsTools} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <div className="pb-4 text-center">
        <div
          style={{
            height: 8,
            width: 160,
            background: BRAND,
            borderRadius: 8,
            margin: "0 auto",
          }}
        />
      </div>
    </Container>
  );
};

export default Template8;

