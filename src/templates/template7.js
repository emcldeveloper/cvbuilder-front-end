// Template7.jsx — Magazine Layout + Oswald Font + Template1 data model (brand #42b883)
// Left rail (black section) now forces white icons/text via scoped CSS only in that section.
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
const BRAND = "#42b883"; // requested brand color
const BRAND_DARK = "#2c7a67"; // complementary darker shade
const RAIL_BG = "#0f172a"; // left rail background (near-black)

// Reusable: Chip list
const Chips = ({ items, dark = false }) => {
  if (!items?.length)
    return (
      <span className={dark ? "text-light opacity-75" : "text-muted"}>—</span>
    );
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((txt, i) => (
        <span
          key={i}
          className="px-2 py-1 small chip"
          style={{
            background: dark
              ? "rgba(255,255,255,0.06)"
              : "rgba(66, 184, 131, 0.10)",
            border: dark
              ? "1px solid rgba(255,255,255,0.18)"
              : "1px solid rgba(66, 184, 131, 0.35)",
            color: dark ? "#ffffff" : BRAND_DARK,
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

// Experience Card
const ExpCard = ({ title, meta, period, bullets }) => (
  <Card className="border-0 shadow-sm mb-3">
    <Card.Body className="p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h6 className="mb-1" style={{ color: BRAND_DARK }}>
            {title}
          </h6>
          <div className="small text-muted">{meta}</div>
        </div>
        <Badge bg="light" text="dark" className="border">
          {period}
        </Badge>
      </div>
      {bullets?.length ? (
        <ul className="small mb-0 mt-2 ps-3">
          {bullets.map((b, i) => (
            <li key={i} className="lh-base text-muted">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </Card.Body>
  </Card>
);

const Template7 = () => {
  // Fetch (Template1 style)
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

  // ===== Work Experience (sorted & mapped) =====
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

  // ===== Education (sorted & mapped) =====
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
        years:
          (start.isValid() ? start.format("YYYY") : "") +
          (start.isValid() || end.isValid() ? " - " : "") +
          (end.isValid()
            ? end.format("YYYY")
            : start.isValid()
            ? "Present"
            : ""),
      };
    });

  // ===== Flattened “chips” data =====
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

  // ================== RENDER ==================
  return (
    <Container
      fluid
      className="p-0"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {/* Google Font (Oswald) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Scoped styles for the LEFT RAIL only */}
      <style>{`
        .rail {
          background: ${RAIL_BG};
          color: #ffffff;
        }
        .rail svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }
        .rail h6.mb-0 {
          color: #ffffff !important;
          letter-spacing: .2px;
        }
        .rail .small,
        .rail p,
        .rail li {
          color: rgba(255,255,255,0.85) !important;
        }
        .rail .rail-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.04));
          margin: 14px 0;
        }
        .rail .chip:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.28);
        }
      `}</style>

      {/* Banner Header */}
      <div
        style={{
          background:
            "radial-gradient(1200px 400px at 10% -10%, rgba(66,184,131,.20), transparent 60%), linear-gradient(90deg, #fff, #fff)",
          borderBottom: `4px solid ${BRAND}`,
        }}
        className="py-4"
      >
        <Row className="mx-auto align-items-center" style={{ maxWidth: 1200 }}>
          <Col
            xs={12}
            md="auto"
            className="text-center text-md-start mb-3 mb-md-0"
          >
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
              roundedCircle
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: `5px solid ${BRAND}`,
              }}
              alt="Profile"
            />
          </Col>
          <Col>
            <div className="text-uppercase small text-muted">
              {currentTitle}
            </div>
            <h1
              className="fw-bold mb-1"
              style={{ color: BRAND, letterSpacing: ".5px" }}
            >
              {fullName}
            </h1>
            <div className="d-flex flex-wrap gap-3 small">
              <span>
                <FiPhone /> {primaryPhone}
              </span>
              <span>
                <FiMail /> {primaryEmail}
              </span>
              <span>
                <FiMapPin /> {primaryAddress}
              </span>
            </div>
          </Col>
        </Row>
      </div>

      {/* Body */}
      <Row className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Left Rail */}
        <Col md={3} className="p-3 rail">
          <Card className="bg-transparent border-0">
            <Card.Body className="p-0">
              {/* About */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FiUser size={16} />
                  <h6 className="mb-0">About</h6>
                </div>
                <p className="small mb-0">{summary}</p>
              </div>

              <div className="rail-divider" />

              {/* Languages */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FiGlobe size={16} />
                  <h6 className="mb-0">Languages</h6>
                </div>
                <ul className="small ps-3 mb-0">
                  {languages?.length ? (
                    languages.map((l, i) => (
                      <li key={i}>{l?.language?.language_name || "—"}</li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>
              </div>

              <div className="rail-divider" />

              {/* Skills & Profile */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FiTag size={16} />
                  <h6 className="mb-0">Profile</h6>
                </div>
                <div className="small mb-1">Culture Fit</div>
                <Chips items={chipsCulture} dark />
                <div className="small mt-3 mb-1">Personality</div>
                <Chips items={chipsPersonality} dark />
                <div className="small mt-3 mb-1">Software</div>
                <Chips items={chipsSoftware} dark />
                <div className="small mt-3 mb-1">Skills</div>
                <Chips items={chipsSkills} dark />
                <div className="small mt-3 mb-1">Tools</div>
                <Chips items={chipsTools} dark />
              </div>

              <div className="rail-divider" />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Content */}
        <Col md={9} className="p-3">
          {/* Experience */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <FiBriefcase size={18} />
            <h5 className="mb-0">Job Experience</h5>
            <div
              style={{
                height: 3,
                background: BRAND,
                width: 90,
                borderRadius: 2,
                marginLeft: 6,
              }}
            />
          </div>
          {work?.length ? (
            work.map((w, i) => (
              <ExpCard
                key={i}
                title={`${w.title} — ${w.company}`}
                meta={[w.industry, w.location].filter(Boolean).join(" / ")}
                period={w.period}
                bullets={w.bullets}
              />
            ))
          ) : (
            <p className="text-muted small">No job experience added.</p>
          )}

          {/* Education */}
          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
            <FiBookOpen size={18} />
            <h5 className="mb-0">Education</h5>
            <div
              style={{
                height: 3,
                background: BRAND,
                width: 90,
                borderRadius: 2,
                marginLeft: 6,
              }}
            />
          </div>
          {eduVM?.length ? (
            <Row xs={1} md={2} className="g-3">
              {eduVM.map((ed, i) => (
                <Col key={i}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1" style={{ color: BRAND_DARK }}>
                            {ed.course}
                          </h6>
                          <div className="small text-muted">{ed.school}</div>
                        </div>
                        <Badge bg="light" text="dark" className="border">
                          {ed.years}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted small">No education records available.</p>
          )}

          {/* Referees */}
          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
            <FiUser size={18} />
            <h5 className="mb-0">Referees</h5>
            <div
              style={{
                height: 3,
                background: BRAND,
                width: 90,
                borderRadius: 2,
                marginLeft: 6,
              }}
            />
          </div>
          {referees?.length ? (
            <Row xs={1} md={2} className="g-3">
              {referees.map((r, i) => {
                const name = [r?.first_name, r?.middle_name, r?.last_name]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <Col key={i}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body className="p-3">
                        <h6 className="mb-1" style={{ color: BRAND_DARK }}>
                          {name || "—"}
                        </h6>
                        <div className="small text-muted mb-2">
                          {r?.referee_position || "—"} • {r?.employer || "—"}
                        </div>
                        <div className="small">{r?.email || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p className="text-muted small">No referees added.</p>
          )}
        </Col>
      </Row>

      {/* Bottom Accent */}
      <div className="py-4">
        <div
          className="mx-auto"
          style={{
            maxWidth: 200,
            height: 8,
            background: BRAND,
            borderRadius: 8,
          }}
        />
      </div>
    </Container>
  );
};

export default Template7;
