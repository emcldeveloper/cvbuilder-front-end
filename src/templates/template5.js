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
import moment from "moment";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
const CV_BASE = "https://ekazi.co.tz";
// Brand + UI
const BRAND = "#D36314";
const BRAND_DARK = "#8B3A0F";
const INK = "#1f2937";
const PAPER = "#ffffff";
const PANEL = "#f8fafc";
const DIVIDER = "rgba(0,0,0,.08)";

export default function Template5() {
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

  // ---------- extract safely ----------
  const profiles = Array.isArray(payload?.applicant_profile)
    ? payload.applicant_profile
    : [];
  const profile = profiles[0] || {};
  const users = Array.isArray(payload?.user) ? payload.user : [];
  const experiences = Array.isArray(payload?.experience)
    ? payload.experience
    : [];
  const referees = Array.isArray(payload?.referees) ? payload.referees : [];
  const languages = Array.isArray(payload?.language) ? payload.language : [];
  const addresses = Array.isArray(payload?.address) ? payload.address : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const knowledge = Array.isArray(payload?.knowledge) ? payload.knowledge : [];
  const software = Array.isArray(payload?.software) ? payload.software : [];
  const tools = Array.isArray(payload?.tools) ? payload.tools : [];
  const culture = Array.isArray(payload?.culture) ? payload.culture : [];
  const personalities = Array.isArray(payload?.applicant_personality)
    ? payload.applicant_personality
    : [];
  const training = Array.isArray(payload?.training) ? payload.training : [];
  const proficiency = Array.isArray(payload?.proficiency)
    ? payload.proficiency
    : [];

  // ---------- derive fields ----------
  const fullName =
    `${profile?.first_name || ""} ${profile?.middle_name || ""} ${profile?.last_name || ""}`
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

  const primaryEmail =
    profile?.email || users?.[0]?.email || payload?.email?.email || "—";

  const primaryPhone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    users?.[0]?.phone ||
    "—";

  const primaryAddress = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${addresses[0]?.name ? ", " + addresses[0]?.name : ""}`.replace(/^,\s*/, "")
    : "—";

  const website = payload?.socials?.website || "";
  const linkedin = payload?.socials?.linkedin || "";
  const safeWebsite =
    website && !/^https?:\/\//i.test(website) ? `https://${website}` : website;
  const safeLinkedin =
    linkedin && !/^https?:\/\//i.test(linkedin) ? `https://${linkedin}` : linkedin;

  // ---------- Experience ----------
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
        company: e?.employer?.employer_name || e?.company || e?.organization || "—",
        industry: e?.industry?.industry_name || "",
        location: `${e?.employer?.region?.region_name || ""}${e?.employer?.sub_location ? ", " + e?.employer?.sub_location : ""}`.replace(/^,\s*/, ""),
        period,
        bullets: (e?.responsibility || "")
          .split("\n")
          .map((t) => t.trim().replace(/^•\s*/, ""))
          .filter(Boolean),
      };
    });

  // ---------- Education ----------
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
        school: ed?.college?.college_name || ed?.institution || ed?.school || "—",
        course: ed?.course?.course_name || ed?.qualification?.qualification || ed?.degree || "—",
        yearRange:
          (start.isValid() ? start.format("YYYY") : "") +
          (start.isValid() || end.isValid() ? " - " : "") +
          (end.isValid() ? end.format("YYYY") : start.isValid() ? "Present" : ""),
        period:
          (start.isValid() ? start.format("MMM YYYY") : "") +
          (start.isValid() || end.isValid() ? " – " : "") +
          (end.isValid() ? end.format("MMM YYYY") : ""),
      };
    });

  const sideSkills = knowledge
    .map((k) => k?.knowledge?.knowledge_name || k?.knowledge_name || k)
    .filter(Boolean)
    .slice(0, 10);

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
      className="p-0"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <Row className="g-0">
        <Col xs={12}>
          <div className="headerWrap">
            <div className="bar left" />
            <h1 className="name">{fullName}</h1>
            <div className="bar right" />
          </div>
        </Col>
      </Row>

      <Row className="g-0">
        {/* LEFT — main */}
        <Col md={8} className="p-4 pe-md-5">
          <SectionTitle title="Profile" />
          <p className="text-muted lh-base">{summary}</p>

          {payload?.objective?.objective && (
            <>
              <SectionTitle title="Career Objective" />
              <p className="text-muted lh-base">{payload.objective.objective}</p>
            </>
          )}

          <SectionTitle title="Job Experience" />
          {work.length > 0 ? (
            work.map((exp, i) => (
              <Card key={i} className="mb-3 border-0">
                <Card.Body className="p-0">
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <div className="fw-bold text-capitalize" style={{ color: BRAND_DARK }}>
                        {exp.title}
                      </div>
                      <div className="text-muted">
                        {exp.company}
                        {exp.industry ? ` / ${exp.industry}` : ""}
                      </div>
                      {exp.location && <div className="text-muted small">{exp.location}</div>}
                    </div>
                    <Badge bg="light" className="text-dark border align-self-start">
                      {exp.period}
                    </Badge>
                  </div>

                  {exp.bullets.length > 0 && (
                    <ul className="small mb-0 mt-2 ps-3">
                      {exp.bullets.map((b, k) => (
                        <li key={k} className="text-muted lh-base">{b}</li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-muted">No job experience added.</div>
          )}

          <SectionTitle title="Skills & Endorsements" />
          <div className="mb-3">
            <Row>
              <Col sm={6} className="mb-2">
                <div className="fw-semibold">Culture Fit</div>
                <div className="small text-muted">
                  {culture.length
                    ? culture.map((c) => c?.culture?.culture_name || c?.culture_name || c?.name).filter(Boolean).join(", ")
                    : "—"}
                </div>
              </Col>
              <Col sm={6} className="mb-2">
                <div className="fw-semibold">Personality</div>
                <div className="small text-muted">
                  {personalities.length
                    ? personalities.map((p) => p?.personality?.personality_name).filter(Boolean).join(", ")
                    : "—"}
                </div>
              </Col>
              <Col sm={6} className="mb-2">
                <div className="fw-semibold">Software</div>
                <div className="small text-muted">
                  {software.length
                    ? software.map((s) => s?.software?.software_name || s?.software_name).filter(Boolean).join(", ")
                    : "—"}
                </div>
              </Col>
              <Col sm={6} className="mb-2">
                <div className="fw-semibold">Skills & Knowledge</div>
                <div className="small text-muted">
                  {knowledge.length
                    ? knowledge.map((k) => k?.knowledge?.knowledge_name || k?.knowledge_name).filter(Boolean).join(", ")
                    : "—"}
                </div>
              </Col>
            </Row>
          </div>

          <SectionTitle title="Tools" />
          <div className="small text-muted mb-4">
            {tools.length
              ? tools.map((t) => t?.tool?.tool_name || t?.tool_name || (typeof t === "string" ? t : "")).filter(Boolean).join(", ")
              : "—"}
          </div>

          <div className="refPanel mt-2">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="refDot" />
              <h6 className="m-0" style={{ color: BRAND_DARK }}>Referees</h6>
            </div>
            {referees.length ? (
              <Row className="g-4">
                {referees.map((r, i) => {
                  const nm = [r.first_name, r.middle_name, r.last_name].filter(Boolean).join(" ");
                  return (
                    <Col md={12} key={r.id ?? i}>
                      <div className="fw-semibold">{nm || "—"}</div>
                      <div className="text-muted small">{r?.referee_position || "—"}</div>
                      <div className="small">{r?.employer || "—"}</div>
                      <div className="small">{r?.phone || "—"}</div>
                      <div className="small">{r?.email || "—"}</div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <div className="text-muted">—</div>
            )}
          </div>
        </Col>

        {/* RIGHT — sidebar */}
        <Col md={4} className="p-4 ps-md-3">
          <Card className="border-0 mb-3">
            <Card.Body className="p-3 d-flex align-items-center justify-content-center">
              <Image
                src={
                  profile?.picture ? `${CV_BASE}/${profile.picture}` : "https://placehold.co/150x180?text=Photo"
                }
                onError={(e) => (e.currentTarget.src = "https://placehold.co/150x180?text=Photo")}
                className="border profile-photo"
                alt="profile"
                width={150}
                height={180}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </Card.Body>
          </Card>

          <SideSection title="Contact Details">
            <ListGroup variant="flush" className="small">
              <ListGroup.Item className="px-0 bg-transparent d-flex gap-2 align-items-start">
                <FiMapPin className="mt-1" />
                <span className="text-wrap">{primaryAddress}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 bg-transparent d-flex gap-2 align-items-start">
                <FiPhone className="mt-1" />
                <span>{primaryPhone}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 bg-transparent d-flex gap-2 align-items-start">
                <FiMail className="mt-1" />
                <span className="text-wrap">{primaryEmail}</span>
              </ListGroup.Item>
              {safeWebsite && (
                <ListGroup.Item className="px-0 bg-transparent d-flex gap-2 align-items-start">
                  <FiGlobe className="mt-1" />
                  <a href={safeWebsite} target="_blank" rel="noreferrer noopener" className="link-underline link-underline-opacity-0">
                    {website}
                  </a>
                </ListGroup.Item>
              )}
              {safeLinkedin && (
                <ListGroup.Item className="px-0 bg-transparent d-flex gap-2 align-items-start">
                  <FiLinkedin className="mt-1" />
                  <a href={safeLinkedin} target="_blank" rel="noreferrer noopener" className="link-underline link-underline-opacity-0">
                    {linkedin}
                  </a>
                </ListGroup.Item>
              )}
            </ListGroup>
          </SideSection>

          <SideSection title="Languages">
            {languages.length ? (
              <ul className="list-unstyled small mb-0">
                {languages.map((l, i) => (
                  <li key={`lang-${i}`} className="mb-1">
                    {l?.language?.language_name || "—"}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted small">—</div>
            )}
          </SideSection>

          <SideSection title="Education">
            {eduVM.length > 0 ? (
              <ul className="list-unstyled small mb-0">
                {eduVM.map((edu, i) => (
                  <li key={i} className="mb-1">
                    <div className="fw-semibold">{edu.school}</div>
                    <div className="text-muted">{edu.course}</div>
                    <div className="text-muted small">{edu.yearRange}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted small">—</div>
            )}
          </SideSection>
        </Col>
      </Row>
    </Container>
  );
}

// ---------- Section Helpers ----------
function SectionTitle({ title }) {
  return (
    <h5 className="fw-semibold mb-2 mt-4" style={{ color: BRAND }}>
      {title}
    </h5>
  );
}

function SideSection({ title, children }) {
  return (
    <Card className="border-0 mb-3">
      <Card.Body className="p-2">
        <div className="fw-semibold mb-2" style={{ color: BRAND_DARK }}>
          {title}
        </div>
        {children}
      </Card.Body>
    </Card>
  );
}
