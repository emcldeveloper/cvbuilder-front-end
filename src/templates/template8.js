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
    <div className="d-flex flex-wrap gap-2">
      {items.map((txt, i) => (
        <span
          key={i}
          className="px-2 py-1 small chip"
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

// ---------- Section header ----------
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <span className="pill">
      <Icon size={14} />
    </span>
    <h5 className="mb-0" style={{ color: BRAND_DARK }}>
      {title}
    </h5>
    <div className="flex-grow-1" />
    <div className="dash" />
  </div>
);

// ---------- ZigZag block ----------
const ZigZagItem = ({ side = "left", title, meta, period, bullets }) => (
  <div className={`zz-item ${side}`}>
    <div className="zz-card">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold" style={{ color: BRAND_DARK }}>
            {title}
          </div>
          {meta ? <div className="small text-muted">{meta}</div> : null}
        </div>
        {period ? (
          <Badge bg="light" text="dark" className="border">
            {period}
          </Badge>
        ) : null}
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
    </div>
    <span className="zz-dot" />
  </div>
);

const Template8 = () => {
  // Fetch
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

  // Extract data (before JSX)
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
  const website =
    payload?.website?.url ||
    payload?.links?.[0]?.url ||
    payload?.links?.[0]?.link ||
    "www.yourwebsite.com";

  // Work
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

  // Education
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

  // Flattened chips
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
    <Container
      fluid
      className="p-0"
      style={{
        fontFamily:
          'scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      }}
    >
      {/* Styles */}
      <style>{`
        /* HERO with diagonal soft tint */
        .hero {
          position: relative;
          overflow: hidden;
          background: #fff;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${BG_SOFT} 0%, transparent 60%);
          pointer-events: none;
        }
        .name-bar {
          height: 6px;
          width: 160px;
          background: ${BRAND};
          border-radius: 8px;
        }
        .hero-badge {
          border: 4px solid ${BRAND};
        }

        /* Sticky sidebar & cards */
        .sticky-col { position: sticky; top: 16px; }
        .side-card {
          border: 1px solid rgba(0,0,0,.06);
          box-shadow: 0 8px 22px rgba(0,0,0,.06);
          overflow: hidden;
          background: #fff;
        }
        .side-card .topbar { height: 4px; background: ${BRAND}; }

        .pill {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px;
          background: ${BRAND}; color: #fff;
          box-shadow: 0 0 0 4px rgba(255,45,32,.15);
        }
  
        /* ZigZag timeline */
        .zz { position: relative; padding: 12px 0; }
        .zz::before {
          content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(${BRAND}, rgba(255,45,32,.1));
          transform: translateX(-50%);
        }
        .zz-item { position: relative; width: 100%; display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 18px; }
        .zz-item.left .zz-card { grid-column: 1 / 2; margin-right: 24px; }
        .zz-item.right .zz-card { grid-column: 2 / 3; margin-left: 24px; }
        .zz-card {
          background: #fff; border: 1px solid rgba(0,0,0,.06); border-radius: 10px; padding: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,.06);
        }
        .zz-dot {
          position: absolute; left: 50%; top: 14px; width: 12px; height: 12px;
          transform: translateX(-50%); background: ${BRAND}; border: 2px solid #fff; border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255,45,32,.15);
        }

        /* Chips */
        .chip:hover { transform: translateY(-1px); background: rgba(255,45,32,.12); border-color: rgba(255,45,32,.4); }

        /* Education grid */
        .edu-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }

        @media (max-width: 768px) {
          .zz-item { grid-template-columns: 1fr; }
          .zz-item.left .zz-card, .zz-item.right .zz-card { grid-column: 1 / -1; margin: 0; }
          .edu-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero py-4">
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
              className="hero-badge"
              style={{ width: 120, height: 120, objectFit: "cover" }}
              alt="Profile"
            />
          </Col>
          <Col>
            <div className="text-uppercase small text-muted">
              {currentTitle}
            </div>
            <h1 className="fw-bold mb-2" style={{ color: BRAND_DARK }}>
              {fullName}
            </h1>
            <div className="name-bar mb-2" />
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

      {/* BODY */}
      <Row className="mx-auto py-4 g-4" style={{ maxWidth: 1200 }}>
        {/* LEFT */}
        <Col md={8}>
          {/* About */}
          <Card className="border-0 side-card mb-4">
            <div className="topbar" />
            <Card.Body className="p-4">
              <SectionHeader icon={FiUser} title="About" />
              <p className="small mb-0 text-muted">{summary}</p>
            </Card.Body>
          </Card>

          {/* Experience (ZigZag) */}
          <Card className="border-0 side-card mb-4">
            <div className="topbar" />
            <Card.Body className="p-4">
              <SectionHeader icon={FiBriefcase} title="Job Experience" />
              <div className="zz">
                {work?.length ? (
                  work.map((w, i) => (
                    <ZigZagItem
                      key={i}
                      side={i % 2 === 0 ? "left" : "right"}
                      title={`${w.title} — ${w.company}`}
                      meta={[w.industry, w.location]
                        .filter(Boolean)
                        .join(" / ")}
                      period={w.period}
                      bullets={w.bullets}
                    />
                  ))
                ) : (
                  <p className="text-muted small mb-0">
                    No job experience added.
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>

          {/* Education */}
          <Card className="border-0 side-card">
            <div className="topbar" />
            <Card.Body className="p-4">
              <SectionHeader icon={FiBookOpen} title="Education" />
              {eduVM?.length ? (
                <div className="edu-grid">
                  {eduVM.map((ed, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div
                              className="fw-semibold"
                              style={{ color: BRAND_DARK }}
                            >
                              {ed.course}
                            </div>
                            <div className="small text-muted">{ed.school}</div>
                          </div>
                          <Badge bg="light" text="dark" className="border">
                            {ed.years}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted small mb-0">
                  No education records available.
                </p>
              )}
            </Card.Body>
          </Card>

          {/* Referees */}
          <Card className="border-0 side-card mt-4">
            <div className="topbar" />
            <Card.Body className="p-4">
              <SectionHeader icon={FiUser} title="Referees" />
              {referees?.length ? (
                <Row xs={1} md={3} className="g-3">
                  {referees.map((r, i) => {
                    const name = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Col key={i}>
                        <Card className="border-0 shadow-sm h-100">
                          <Card.Body className="p-3">
                            <div
                              className="fw-semibold"
                              style={{ color: BRAND_DARK }}
                            >
                              {name || "—"}
                            </div>
                            <div className="small text-muted mb-2">
                              {r?.referee_position || "—"} •{" "}
                              {r?.employer || "—"}
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
                <p className="text-muted small mb-0">No referees added.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT (sticky) */}
        <Col md={4}>
          <div className="sticky-col">
            {/* Contact */}
            <Card className="border-0 side-card mb-4">
              <div className="topbar" />
              <Card.Body className="p-4">
                <SectionHeader icon={FiMail} title="Contact" />
                <ul className="small ps-0 mb-0" style={{ listStyle: "none" }}>
                  <li className="mb-1">
                    <FiPhone /> {primaryPhone}
                  </li>
                  <li className="mb-1">
                    <FiMail /> {primaryEmail}
                  </li>
                  <li className="mb-1">
                    <FiMapPin />
                    {primaryAddress}
                  </li>
                  <li></li>
                </ul>
              </Card.Body>
            </Card>

            {/* Languages */}
            <Card className="border-0 side-card mb-4">
              <div className="topbar" />
              <Card.Body className="p-4">
                <SectionHeader icon={FiGlobe} title="Languages" />
                <ul className="small ps-3 mb-0">
                  {languages?.length ? (
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
            <Card className="border-0 side-card">
              <div className="topbar" />
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
          </div>
        </Col>
      </Row>

      {/* Footer Accent */}
      <div className="pb-4">
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

export default Template8;
