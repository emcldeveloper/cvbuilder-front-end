 
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

// 📌 API endpoint
 
const cvUrl = "https://ekazi.co.tz";
const applicant_id = localStorage.getItem("applicantId");
const API = `https://ekazi.co.tz/api/cv/cv_builder/${applicant_id}`;

const Template16 = () => {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return (
      <div className="d-flex justify-content-center p-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );

  const { profile, education, experience, skills, languages } = payload || {};

  return (
    <Container fluid className="p-4 bg-light">
      <Card className="shadow-lg border-0">
        <Row noGutters="true">
          {/* Sidebar */}
          <Col md={4} className="bg-dark text-white p-4 d-flex flex-column">
            <div className="text-center mb-4">
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto",
                  border: "5px solid #fff",
                }}
              >
                <Image
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}`
                      : "https://placehold.co/200x250?text=Photo"
                  }
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/200x250?text=Photo")
                  }
                />
              </div>
              <h3 className="mt-3">{profile?.full_name || "Full Name"}</h3>
              <p className="text-muted">{profile?.profession || "Profession"}</p>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom border-secondary pb-2">
                Contact Info
              </h5>
              <p>
                <FiPhone /> {profile?.phone || "N/A"}
              </p>
              <p>
                <FiMail /> {profile?.email || "N/A"}
              </p>
              <p>
                <FiMapPin /> {profile?.address || "N/A"}
              </p>
              {profile?.website && (
                <p>
                  <FiGlobe /> {profile.website}
                </p>
              )}
              {profile?.linkedin && (
                <p>
                  <FiLinkedin /> {profile.linkedin}
                </p>
              )}
              {profile?.github && (
                <p>
                  <FiGithub /> {profile.github}
                </p>
              )}
            </div>

            {skills?.length > 0 && (
              <div className="mb-4">
                <h5 className="border-bottom border-secondary pb-2">Skills</h5>
                {skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    pill
                    bg="info"
                    text="dark"
                    className="me-1 mb-1"
                  >
                    {skill?.name}
                  </Badge>
                ))}
              </div>
            )}

            {languages?.length > 0 && (
              <div>
                <h5 className="border-bottom border-secondary pb-2">
                  Languages
                </h5>
                <ul className="list-unstyled">
                  {languages.map((lang, idx) => (
                    <li key={idx}>
                      {lang?.name} – {lang?.level}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>

          {/* Main Content */}
          <Col md={8} className="p-4">
            {profile?.summary && (
              <section className="mb-4">
                <h4 className="border-bottom pb-2">Profile Summary</h4>
                <p>{profile.summary}</p>
              </section>
            )}

            {experience?.length > 0 && (
              <section className="mb-4">
                <h4 className="border-bottom pb-2">Experience</h4>
                <Timeline items={experience} type="experience" />
              </section>
            )}

            {education?.length > 0 && (
              <section className="mb-4">
                <h4 className="border-bottom pb-2">Education</h4>
                <Timeline items={education} type="education" />
              </section>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

// 📌 Timeline Component
const Timeline = ({ items, type }) => (
  <div className="timeline">
    {items.map((item, idx) => (
      <div key={idx} className="mb-3">
        <h5>
          {type === "experience"
            ? item?.job_title
            : item?.degree || item?.course}
        </h5>
        <p className="mb-1 text-muted">
          {type === "experience" ? item?.company : item?.institution}
        </p>
        <div className="text-muted small">
          {formatMY(item?.start_date || item?.started)} –{" "}
          {item?.end_date || item?.ended
            ? formatMY(item?.end_date || item?.ended)
            : "Present"}
        </div>
        {item?.description && <p className="mt-2">{item.description}</p>}
      </div>
    ))}
  </div>
);

// 📌 Format Dates
const formatMY = (date) => {
  if (!date) return "—";
  return moment(date).format("MMM YYYY");
};

export default Template16;
