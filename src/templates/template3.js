import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useCvProfileData } from "../hooks/Candidate/Cv";
import { Container, Row, Col, Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';

const Template3 = () => {
    const cv = useRef();
    const { template } = useParams();
    const [experiences, setExperiences] = useState([]);
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const candidate = data?.data || {};

    useEffect(() => {
        if (candidate?.experience) {
            const uniqueExperiences = [];
            candidate.experience.forEach(item => {
                if (!uniqueExperiences.some(e => e.employer?.id === item.employer?.id)) {
                    const positions = candidate.experience.filter(ex => ex.employer?.id === item.employer?.id);
                    uniqueExperiences.push({ ...item, positions });
                }
            });
            setExperiences(uniqueExperiences);
        }
    }, [candidate]);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <Alert variant="danger" className="text-center py-5">Error loading data</Alert>;
    if (!candidate) return <Alert variant="secondary" className="text-center py-5">No candidate data available</Alert>;

    return (
        <Container
            ref={cv}
            style={{
                width: '210mm',
                minHeight: '297mm',
                margin: 'auto',
                backgroundColor: '#fff',
                padding: '5mm',
                fontFamily: 'sans-serif',
                color: '#333',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)'
            }}
            fluid
        >
            {/* Header */}
            <Card className="border-0 rounded-0 bg-primary text-white">
                <Card.Body className="p-4">
                    <Row className="align-items-center g-4">
                        <Col xs={12} md={4} className="text-center">
                            <div className="rounded-circle overflow-hidden border border-4 border-white shadow" style={{ width: '150px', height: '150px' }}>
                                <img
                                    alt="profile"
                                    src={`http://127.0.0.1:8000/${candidate?.applicant_profile?.[0]?.picture || 'default-profile.jpg'}`}
                                    className="w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={8} className="text-center text-md-start">
                            <h2 className="display-5 fw-bold mb-2"   style={{ fontSize: '1rem' }}>
                                {candidate?.applicant_profile?.[0]?.first_name || 'No Name Provided'}    {candidate?.applicant_profile?.[0]?.last_name || 'No Name Provided'}
                            </h2>
                            <h2 className="h3 mb-3" style={{ fontSize: '1rem' }}>
                                {candidate?.current_position || candidate?.experience?.[0]?.position?.position_name || 'No Position Available'}
                            </h2>
                            <p className="lead mb-3">
                                {candidate?.careers?.[0]?.career || 'No career information'}
                            </p>
                            <Card className="bg-white bg-opacity-25 p-3">
                                <Card.Title className="fw-bold mb-2"  style={{ fontSize: '1rem' }}>Career Objective</Card.Title>
                                <Card.Text  style={{ fontSize: '0.9rem' }}>
                                    {candidate?.objective?.objective || 'No career objective available'}
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Main Content */}
            <Row className="g-4 py-4">
                <Col md={4}>
                    <Section 
                        title="CONTACT" 
                        titleStyle={{ fontSize: '0.9rem' }}  // Reduced title size
                    >
                        <ContactItem icon="📍" title="Location" value="Dar es Salaam" />
                        <ContactItem icon="📞" title="Phone" value={candidate?.phone?.phone_number || "N/A"} />
                        <ContactItem icon="✉️" title="Email" value={candidate?.applicant_profile?.[0]?.email || "N/A"} />
                        <ContactItem icon="🌐" title="Nationality" value="Tanzanian" />
                        <ContactItem icon="👤" title="Gender" value={candidate?.applicant_profile?.[0]?.gender_name || "N/A"} />
                    </Section>

                    <Section title="EDUCATION"   titleStyle={{ fontSize: '0.9rem' }}>
                        {candidate?.education?.length > 0 ? (
                            candidate.education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                 <h5 className="medium fw-bold" style={{ fontSize: '1rem' }}>{edu?.course?.course_name}</h5>
                                    <p className="small mb-1">{edu?.level?.education_level}</p>
                                    <p className="small mb-1">{edu?.college?.college_name}</p>
                                    <p className="text-muted small">
                                        {edu?.started ? new Date(edu.started).getFullYear() : ''} - {edu?.ended ? new Date(edu.ended).getFullYear() : 'Present'}
                                    </p>
                                </div>
                            ))
                        ) : <p className="small text-muted">No education data</p>}
                    </Section>

                    <Section title="SKILLS"   titleStyle={{ fontSize: '0.9rem' }}>
                        <SkillCategory title="Culture" items={candidate?.culture?.map(c => c?.culture?.culture_name)} />
                        <SkillCategory title="Software" items={candidate?.software?.map(s => s?.software?.software_name)} />
                        <SkillCategory title="Tools" items={candidate?.tools?.map(t => t?.tool?.tool_name)} />
                        <SkillCategory title="Knowledge" items={candidate?.knowledge?.map(k => k?.knowledge?.knowledge_name)} />
                    </Section>

                    <Section title="LANGUAGES"   titleStyle={{ fontSize: '0.9rem' }}>
                        <div className="d-flex flex-wrap gap-2">
                            {candidate?.language?.map((lang, i) => (
                                <Badge key={i} pill bg="light" text="dark" className="px-3 py-2">
                                    {lang?.language?.language_name || 'Language'}
                                </Badge>
                            ))}
                        </div>
                    </Section>
                </Col>

                <Col md={8}>
                    <Section title="WORK EXPERIENCE"   titleStyle={{ fontSize: '0.9rem' }}>
                        {experiences.length > 0 ? experiences.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="fw-bold">{exp?.employer?.employer_name || 'Employer'}</h5>
                                    <p className="text-muted small">
                                        {exp?.start_date ? new Date(exp.start_date).getFullYear() : ''} - {exp?.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
                                    </p>
                                </div>
                                <p className="text-muted small">{exp?.employer?.region?.region_name}, {exp?.employer?.sub_location}</p>
                                {exp?.positions?.map((pos, j) => (
                                    <div key={j} className="mb-3 ps-3 border-start border-3 border-primary">
                                        <h6 className="fw-bold text-primary">{pos?.position?.position_name || 'Position'}</h6>
                                        <p className="small text-muted mb-1">{pos?.start_date ? new Date(pos.start_date).getFullYear() : ''} - {pos?.end_date ? new Date(pos.end_date).getFullYear() : 'Present'}</p>
                                        <p className="small">{pos?.responsibility || 'Responsibilities not specified'}</p>
                                    </div>
                                ))}
                            </div>
                        )) : <p className="small text-muted">No work experience</p>}
                    </Section>

                    <Section title="PROFICIENCY QUALIFICATIONS"   titleStyle={{ fontSize: '0.9rem' }}>
                        {candidate?.proficiency?.length > 0 ? candidate.proficiency.map((prof, i) => (
                            <div key={i} className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5 className="fw-bold" style={{ fontSize: '1rem' }}>{prof?.award || 'Award'}</h5>
                                    <p className="text-muted small">{moment(prof?.started).format("YYYY")} - {prof?.ended ? moment(prof.ended).format("YYYY") : 'Present'}</p>
                                </div>
                                <p className="text-primary mb-1">{prof?.organization?.organization_name}</p>
                                <p className="small">Proficiency: {prof?.proficiency?.proficiency_name}</p>
                            </div>
                        )) : <p className="small text-muted">No proficiency qualifications</p>}
                    </Section>

                    <Section title="TRAININGS & WORKSHOPS"   titleStyle={{ fontSize: '0.9rem' }}>
                        {candidate?.training?.length > 0 ? candidate.training.map((train, i) => (
                            <div key={i} className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5 className="fw-bold" style={{ fontSize: '1rem' }}>{train?.name || 'Training'}</h5>
                                    <p className="text-muted small">{train?.started} - {train?.ended || 'Present'}</p>
                                </div>
                                <p className="text-primary">{train?.institution}</p>
                            </div>
                        )) : <p className="small text-muted">No trainings available</p>}
                    </Section>
                </Col>
            </Row>

            {candidate?.referees?.length > 0 && (
                <Section title="REFEREES">
                    <Row className="g-3">
                        {candidate.referees.map((ref, i) => (
                            <Col key={i} md={4}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <h5 className="fw-bold">{[ref?.first_name, ref?.middle_name, ref?.last_name].filter(Boolean).join(' ')}</h5>
                                        <p className="text-muted small">{ref?.referee_position}</p>
                                        <p className="small mb-1">📞 {ref?.phone}</p>
                                        <p className="small">✉️ {ref?.email}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Section>
            )}
        </Container>
    );
};

// Updated Section component with title styling support
const Section = ({ title, children, titleStyle, titleClassName }) => (
    <div className="mb-4">
        <h4 
            className={`bg-primary text-white py-2 px-3 fw-bold rounded-top ${titleClassName || ''}`}
            style={{ 
                fontSize: '1.1rem', // Default size
                ...titleStyle       // Can be overridden by props
            }}
        >
            {title}
        </h4>
        <Card className="border-top-0 rounded-top-0">
            <Card.Body className="p-3">{children}</Card.Body>
        </Card>
    </div>
);

const ContactItem = ({ icon, title, value }) => (
    <div className="d-flex mb-2">
        <span className="me-2">{icon}</span>
        <div>
            <p className="fw-bold mb-0 small">{title}</p>
            <p className="small">{value}</p>
        </div>
    </div>
);

const SkillCategory = ({ title, items }) => (
    <div className="mb-3">
        <h6 className="fw-bold small mb-2">{title}</h6>
        <ListGroup variant="flush" className="small">
            {items?.filter(Boolean).map((item, i) => (
                <ListGroup.Item key={i} className="px-0 py-1">{item}</ListGroup.Item>
            ))}
        </ListGroup>
    </div>
);

export default Template3;