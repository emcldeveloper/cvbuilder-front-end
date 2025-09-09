import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; 
import moment from "moment";
import { useCvProfileData } from "../hooks/Candidate/Cv";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const Template6 = () => {
  const cv = useRef();
  const { template } = useParams();
  const [show, setShow] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const uuid = localStorage.getItem("applicantId");
  const { data, loading, error } = useCvProfileData(uuid);
  const candidate = data?.data || {};

  // Group experiences by employer
  useEffect(() => {
    if (candidate?.experience) {
      const uniqueExperiences = [];
      candidate.experience.forEach((item) => {
        if (!uniqueExperiences.some((e) => e.employer?.id === item.employer?.id)) {
          const positions = candidate.experience.filter(
            (ex) => ex.employer?.id === item.employer?.id
          );
          uniqueExperiences.push({ ...item, positions });
        }
      });
      setExperiences(uniqueExperiences);
    }
  }, [candidate]);

  const profile = candidate?.applicant_profile?.[0] || {};
  const education = candidate?.education || [];
  const knowledge = candidate?.knowledge || [];
  const languages = candidate?.language || [];
  const trainings = candidate?.training || [];
  const referees = candidate?.referee || [];

  return (
    show && (
      <Container fluid className="p-0" ref={cv}>
        {/* Header */}
        <Row className="bg-warning text-white py-4 align-items-center">
          <Col md={4} className="text-center text-md-start">
            <Image
              src={
                profile?.picture
                  ? `https://ekazi.co.tz/${profile.picture}`
                  : "https://placehold.co/200x200?text=Photo"
              }
              roundedCircle
              fluid
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/200x200?text=Photo")
              }
            />
          </Col>
          <Col md={8} className="text-center text-md-start">
            <h1 className="fw-bold mb-1">
              {profile?.first_name || "No Name"} {profile?.last_name || ""}
            </h1>
            {candidate?.experience?.length > 0 &&
            candidate?.experience[0]?.position?.position_name ? (
              <h5 className="mb-1">{candidate.experience[0].position.position_name}</h5>
            ) : (
              <p>No Position Available</p>
            )}
            <p className="mb-1">{candidate?.careers?.[0]?.career || ""}</p>
            <h5 className="fw-bold mt-3">Career Objective</h5>
            <p>{candidate?.objective?.objective || "No career objective"}</p>
          </Col>
        </Row>

        <Row className="mt-4">
          {/* Left Column */}
          <Col md={4}>
            {/* Contact */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">CONTACT</Card.Header>
              <Card.Body>
                <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
                <p><strong>Phone:</strong> {candidate.phone?.phone_number || "N/A"}</p>
                <p><strong>Gender:</strong> {profile?.gender_name || "N/A"}</p>
                <p><strong>Address:</strong> {candidate?.address?.[0]?.address || "N/A"}</p>
              </Card.Body>
            </Card>

            {/* Education */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">EDUCATION</Card.Header>
              <Card.Body>
                {education.length > 0 ? (
                  education.map((item, index) => (
                    <div key={index} className="mb-3">
                      <p><strong>{item?.course?.course_name}</strong></p>
                      <p>{item?.college?.college_name}</p>
                      <p>
                        {item?.started ? new Date(item.started).getFullYear() : "—"} -{" "}
                        {item?.ended ? new Date(item.ended).getFullYear() : "Present"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No Education Data Available</p>
                )}
              </Card.Body>
            </Card>

            {/* Skills */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">SKILLS</Card.Header>
              <Card.Body>
                {knowledge.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {knowledge.map((k, i) => (
                      <li key={`knowledge-${i}`} className="mb-1">
                        {k?.knowledge?.knowledge_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Skills</p>
                )}
              </Card.Body>
            </Card>

            {/* Languages */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">LANGUAGES</Card.Header>
              <Card.Body>
                {languages.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {languages.map((l, i) => (
                      <li key={`lang-${i}`} className="mb-1">
                        {l?.language?.language_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Languages</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col md={8}>
            {/* Work Experience */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">WORK EXPERIENCE</Card.Header>
              <Card.Body>
                {experiences.length > 0 ? (
                  experiences.map((item, index) => (
                    <div key={index} className="mb-3">
                      <h6 className="fw-bold">{item?.employer?.employer_name}</h6>
                      {item?.positions?.map((pos, idx) => (
                        <div key={idx}>
                          <p className="text-primary mb-1">{pos?.position?.position_name}</p>
                          <p className="small text-muted mb-1">
                            {pos?.started ? moment(pos.started).format("MMM YYYY") : "—"} -{" "}
                            {pos?.ended ? moment(pos.ended).format("MMM YYYY") : "Present"}
                          </p>
                          <p>{pos?.responsibility || "No responsibility provided"}</p>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p>No Work Experience</p>
                )}
              </Card.Body>
            </Card>

            {/* Trainings */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">TRAININGS</Card.Header>
              <Card.Body>
                {trainings.length > 0 ? (
                  trainings.map((t, i) => (
                    <div key={i} className="mb-3">
                      <p><strong>{t?.training_name}</strong></p>
                      <p>{t?.institution}</p>
                      <p>
                        {t?.started ? new Date(t.started).getFullYear() : "—"} -{" "}
                        {t?.ended ? new Date(t.ended).getFullYear() : "Present"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No Trainings</p>
                )}
              </Card.Body>
            </Card>

            {/* Referees */}
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white fw-bold">REFEREES</Card.Header>
              <Card.Body>
                {referees.length > 0 ? (
                  referees.map((r, i) => (
                    <div key={i} className="mb-3">
                      <p><strong>{r?.name}</strong></p>
                      <p>{r?.organization}</p>
                      <p>{r?.position}</p>
                      <p>{r?.phone_number}</p>
                      <p>{r?.email}</p>
                    </div>
                  ))
                ) : (
                  <p>No Referees</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Template6;
