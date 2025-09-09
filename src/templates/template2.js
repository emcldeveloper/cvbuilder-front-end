import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
 
const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
export default function Template2() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); // Fixed template literal
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
        <div className="spinner-border" role="status" />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger mb-0">{error}</div>
      </div>
    );
  }

  const profiles = payload?.applicant_profile ?? [];
  const profile = profiles[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];
 


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

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";
  
const cvUrl = "https://ekazi.co.tz";
  return (
    <div className="container my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="d-flex justify-content-center">
        <div className="templateH shadow-sm">
          <div className="row g-0 align-items-center p-4 pb-2">
            <div className="col-12 col-md-4 d-flex justify-content-md-start justify-content-center mb-3 mb-md-0">
              <div className="photoOctagon">
                <img
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}` // Fixed template literal
                      : "https://placehold.co/320x320?text=Photo"
                  }
                  alt="profile"
                  className="photoOctagonImg"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/320x320?text=Photo")
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-8 text-md-start text-center">
              <h1 className="display-5 m-0 fw-semibold nameText">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <div className="text-muted fs-5">{currentPosition}</div>
            </div>
          </div>

          <div className="row g-0">
            <div className="col-12 col-md-4 p-4 pt-3 sidebar">
              <Section title="Address">{location}</Section>
              <Section title="Phone">{phone}</Section>
              <Section title="Email">{email}</Section>
              {!!languages.length && (
                <Section title="Languages">
                  <div className="d-flex flex-wrap gap-2">
                    {languages.map((l, i) => (
                      <span key={i} className="badge badge-subtle-alt">
                        {l?.language?.language_name || "Language"}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Education">
                {education.length ? (
                  education
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b?.ended || 0) - new Date(a?.ended || 0)
                    )
                    .map((edu, i) => (
                      <div key={i} className="mb-3">
                        <div className="fw-semibold">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div>
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            "—"}
                        </div>
                        <div className="text-muted small">
                          {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-secondary">
                    No education records available.
                  </div>
                )}
              </Section>

              {!!referees.length && (
                <Section title="Referees">
                  {referees.map((r, i) => {
                    const fullName = [r.first_name, r.middle_name, r.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={r.id ?? i} className="mb-3">
                        <div className="fw-semibold">{fullName || "—"}</div>
                        <div className="text-muted">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </div>
                    );
                  })}
                </Section>
              )}
            </div>

            <div className="col-12 col-md-8 p-4 pt-3 pb-0">
              <TimelineSection title="Introduction">
                <p className="mb-0" style={{ textAlign: "justify" }}>
                  {intro}
                </p>
              </TimelineSection>

              <TimelineSection title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="fw-semibold">
                        {exp?.position?.position_name || "Job Title"}
                        <span className="text-muted">
                          {exp?.employer?.employer_name
                            ? ` | ${exp.employer.employer_name}`
                            : ""}
                        </span>
                      </div>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-secondary">No job experience added.</div>
                )}
              </TimelineSection>

              <TimelineSection title="Skills">
                {!!knowledge.length && (
                  <div className="mb-3">
                    <div className="fw-semibold mb-1">Skills</div>
                    <div className="d-flex flex-wrap gap-2">
                      {knowledge.map((k, i) => (
                        <span key={i} className="badge badge-accent">
                          {k?.knowledge?.knowledge_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!!software.length && (
                  <div className="mb-3">
                    <div className="fw-semibold mb-1">Software</div>
                    <div className="d-flex flex-wrap gap-2">
                      {software.map((s, i) => (
                        <span key={i} className="badge badge-subtle-alt">
                          {s?.software?.software_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!!culture.length && (
                  <div className="mb-3">
                    <div className="fw-semibold mb-1">Culture Fit</div>
                    <div className="d-flex flex-wrap gap-2">
                      {culture.map((c, i) => (
                        <span key={i} className="badge badge-accent">
                          {c?.culture?.culture_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!!personalities.length && (
                  <div className="mb-2">
                    <div className="fw-semibold mb-1">Personality</div>
                    <div className="d-flex flex-wrap gap-2">
                      {personalities.map((p, i) => (
                        <span key={i} className="badge badge-subtle-alt">
                          {p?.personality?.personality_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TimelineSection>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --accent: #0ea5a4;
          --accent-weak: rgba(14,165,164,.12);
          --text-weak: #4b5563;
        }
        body { font-family: 'Jost', sans-serif; }
        .templateH {
          background:#fff; width:900px; max-width:100%;
          border:1px solid #e5e7eb; border-radius:6px;
          font-family:'Jost', sans-serif;
        }
        .fs-5 {
        text-align: center;
        padding: 30px 30px
        }
        .photoOctagon {
          width:180px; height:180px; background-color: var(--accent);
          clip-path: polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%);
          overflow:hidden; display:flex; align-items:center; justify-content:center;
          box-shadow: 0 8px 18px rgba(14,165,164,.35);
        }
        .photoOctagonImg {
          width:170px; height:170px; object-fit:cover; border-radius:10px;
        }
          
        .nameText { line-height:1.1; }
        .sidebar { background:#f8fafc; border-right:1px solid #eef2f7; }
        .sectionTitle { font-weight:600; margin-bottom:.35rem; letter-spacing:.02em; }
        .sectionBlock + .sectionBlock { margin-top:1rem; }
        .timelineWrap { position:relative; padding-left:25px; }
        .timelineWrap:before {
          content:""; position:absolute; left:8px; top:0; bottom:0; width:2px; background: var(--accent);
        }
        .timelineItem { position:relative; margin-bottom:1.1rem; }
        .timelineItem:before {
          content:""; position:absolute; left:-22px; top:6px; width:12px; height:12px;
          background: var(--accent); border-radius:50%;
          box-shadow:0 0 0 3px #fff;
        }
        .badge-accent {
          background: var(--accent-weak); color:#0b7e7d; border:1px solid rgba(14,165,164,.35);
        }
        .badge-subtle-alt {
          background: rgba(17,24,39,.06); color:#111827; border:1px solid rgba(17,24,39,.12);
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="sectionBlock">
      <div className="sectionTitle">{title}</div>
      <div className="text-secondary">{children || "—"}</div>
    </div>
  );
}

function TimelineSection({ title, children }) {
  return (
    <div className="mb-4 timelineWrap">
      <div className="timelineItem">
        <h5 className="fw-semibold mb-3">{title}</h5>
        <div>{children}</div>
      </div>
    </div>
  );
}

function formatMY(d) {
  return d
    ? new Date(d).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : "—";
}

function formatY(d) {
  return d ? new Date(d).getFullYear() : "";
}