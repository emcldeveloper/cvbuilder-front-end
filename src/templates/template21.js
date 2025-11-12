import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;
 

const BRAND = "#2a3c7f";
const INK = "#222";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template21() {
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

  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const education = payload?.education ?? [];
  const referees = payload?.referees ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const addresses = payload?.address ?? [];

  const phone =
    payload?.phone?.phone_number || payload?.user?.[0]?.phone || "—";
  const email = payload?.user?.[0]?.email || "—";
  const location = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0].name : ""
      }`
    : "—";
  const website = payload?.user?.[0]?.website || "";

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const fullName = useMemo(
    () =>
      `${profile.first_name || ""} ${profile.middle_name || ""} ${
        profile.last_name || ""
      }`
        .replace(/\s+/g, " ")
        .trim() || "—",
    [profile]
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4 px-0">
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t23-root { font-family: 'Comfortaa', cursive; color: ${INK}; }

        /* Sidebar */
        .t23-sidebar {
          background: ${BRAND};
          color: #fff;
          padding: 2rem 1rem;
          min-height: 100%;
          text-align: center;
        }
        .t23-photo {
          width: 140px; height: 140px;
          border-radius: 50%;
          border: 5px solid #fff;
          box-shadow: 0 0 12px rgba(0,0,0,.3);
          margin: 0 auto 1rem;
          overflow: hidden;
        }
        .t23-name { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
        .t23-sub { font-size: 1rem; opacity: .9; margin-bottom: 1rem; }
        .t23-section-title { font-weight: 600; margin-top: 1.5rem; }

        /* Timeline */
        .t23-timeline {
          position: relative;
          margin: 3rem 0;
          padding: 0 2rem;
        }
        .t23-timeline::before {
          content: "";
          position: absolute;
          left: 50%; top: 0; bottom: 0;
          width: 4px;
          background: ${BRAND};
          transform: translateX(-50%);
        }
        .t23-entry {
          position: relative;
          width: 50%;
          padding: 1rem 2rem;
        }
        .t23-entry-left { left: 0; text-align: right; }
        .t23-entry-right { left: 50%; }
        .t23-entry::before {
          content: "";
          position: absolute;
          top: 25px;
          width: 20px; height: 20px;
          background: #fff;
          border: 5px solid ${BRAND};
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0,0,0,.2);
          z-index: 2;
        }
        .t23-entry-left::before { right: -10px; }
        .t23-entry-right::before { left: -10px; }

        /* Card */
        .t23-card {
          border: 0; border-radius: 14px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.08);
          transition: transform .3s;
        }
        .t23-card:hover { transform: translateY(-5px); }

        /* Date pill */
        .t23-date-pill {
          display: inline-block;
          background: ${BRAND};
          color: #fff;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 2px 12px;
          border-radius: 12px;
          margin-bottom: .5rem;
        }

        /* Duties */
        .t23-duties {
          margin-top: 0.75rem;
          padding-left: 1.25rem;
        }
        .t23-duties li {
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        /* Referees */
        .t23-ref-card {
          border: 0; border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.06);
          padding: 1rem;
          text-align: center;
          height: 100%;
        }
      `}</style>

      <div className="t23-root">
        <Row className="g-0">
          {/* Sidebar */}
          <Col md={3} className="t23-sidebar">
            <div className="t23-photo">
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/140x140?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="t23-name">{fullName}</div>
            <div className="t23-sub">{profile?.current_position || "—"}</div>
            <p className="small mb-2">
              <FiPhone /> {phone}
            </p>
            <p className="small mb-2">
              <FiMail /> {email}
            </p>
            <p className="small mb-2">
              <FiMapPin /> {location}
            </p>
            {website && (
              <p className="small mb-0">
                <FiGlobe /> {website}
              </p>
            )}
            <hr className="border-light my-4" />
            <h6 className="fw-bold">Biography</h6>
            <p className="small">{intro}</p>

            {/* Languages */}
            {languages.length > 0 && (
              <>
                <h6 className="t23-section-title">Languages</h6>
                <ul className="list-unstyled small">
                  {languages.map((l, i) => (
                    <li key={i}>{l?.language?.language_name}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Skills */}
            {knowledge.length > 0 || software.length > 0 ? (
              <>
                <h6 className="t23-section-title">Skills</h6>
                <ul className="list-unstyled small">
                  {knowledge.map((k, i) => (
                    <li key={i}>{k?.knowledge?.knowledge_name}</li>
                  ))}
                  {software.map((s, i) => (
                    <li key={i}>{s?.software?.software_name}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {/* Culture */}
            {culture.length > 0 && (
              <>
                <h6 className="t23-section-title">Culture</h6>
                <ul className="list-unstyled small">
                  {culture.map((c, i) => (
                    <li key={i}>{c?.culture?.culture_name}</li>
                  ))}
                </ul>
              </>
            )}
          </Col>

          {/* Right Content */}
          <Col md={9} className="p-4">
            {/* Experience */}
            <h4 className="text-center fw-bold mb-5" style={{ color: BRAND }}>
              Experience
            </h4>
            <div className="t23-timeline">
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div
                    key={i}
                    className={`t23-entry ${
                      i % 2 === 0 ? "t23-entry-left" : "t23-entry-right"
                    }`}
                  >
                    <Card body className="t23-card">
                      <div className="t23-date-pill">
                        {formatMY(exp?.start_date)} –{" "}
                        {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                      </div>
                      <h6 className="fw-bold" style={{ color: BRAND }}>
                        {exp?.position?.position_name || "—"}
                      </h6>
                      <div className="small text-muted mb-2">
                        {exp?.employer?.employer_name || ""}
                      </div>
                      {exp?.responsibility && (
                        <ul className="t23-duties">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </Card>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center">
                  No job experience available.
                </p>
              )}
            </div>

            {/* Education */}
            <h4 className="text-center fw-bold mb-4" style={{ color: BRAND }}>
              Education
            </h4>
            {education.length ? (
              <Table striped bordered hover responsive>
                <thead style={{ background: BRAND, color: "#fff" }}>
                  <tr>
                    <th>Level / Degree</th>
                    <th>Institution</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, i) => (
                    <tr key={i}>
                      <td>
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </td>
                      <td>
                        {edu?.college?.college_name || edu?.institution || "—"}
                      </td>
                      <td>{formatMY(edu?.started)}</td>
                      <td>{edu?.ended ? formatMY(edu?.ended) : "Present"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-muted text-center">
                No education records available.
              </p>
            )}

            {/* Referees */}
            {referees.length > 0 && (
              <>
                <h4
                  className="text-center fw-bold mb-4"
                  style={{ color: BRAND }}
                >
                  Referees
                </h4>
                <Row>
                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Col md={4} key={i} className="mb-4">
                        <div className="t23-ref-card">
                          <strong>{rname || "—"}</strong>
                          <div className="small text-muted">
                            {r?.referee_position || "—"}
                          </div>
                          <div>{r?.employer || "—"}</div>
                          <div className="small mt-2">{r?.phone || "—"}</div>
                          <div className="small">{r?.email || "—"}</div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
