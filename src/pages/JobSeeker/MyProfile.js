import React, { useEffect, useState } from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PersonalData from "../../Component/Profile/PersonalData";
import ApplicantCareerSection from "../../Component/Profile/About";
import { profile } from "../../Api/Jobseeker/JobSeekerProfileApi";
import ApplicantSkillsSection from "../../Component/Profile/Skill";
import CareerObjectivesSection from "../../Component/Profile/Objective";
import WorksExperiences from "../../Component/Profile/Experience";
import WorkExperienceSection from "../../Component/Profile/Experience";
const MyProfile = () => {


    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const applicant_id = 31;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profile(applicant_id); // Note: removed the object wrapper if your API expects direct ID
                console.log('Response data:', response.data);
                setApplicant(response.data); // Assuming the data is in response.data
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [applicant_id]);
    console.log("data za profile zimefika sawa", applicant)
    return (
        <JobSeekerLayout>
            <Container fluid style={{
                height: '170vh',
                overflowY: 'scroll',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
            }}>
                {/* Hide scrollbar for Chrome, Safari and Opera */}
                {/* <style>
                    {`::-webkit-scrollbar {
                    display: none;
                    }`}
                </style> */}
                <PersonalData />



                {/* Career Objective */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <ApplicantCareerSection applicant={applicant} />
                                <CareerObjectivesSection applicant={applicant} />
                                {/* work experince */}
                                {/* <WorksExperiences applicant={applicant}/> */}
                                <WorkExperienceSection applicant={applicant}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Work Experience */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Work Experience</h5>
                                {/* Add work experience content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Education */}
                <Row className="justify-content-center mb-3">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Education</h5>
                                {/* Add education content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Career Skills */}
                <ApplicantSkillsSection applicant={applicant} />

                {/* Job Fit */}
                <Row className="justify-content-center mb-3">
                    {/* <Col xs={12} md={10} lg={8} xl={6}> */}
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Job Fit</h5>
                                {/* Add job fit content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Languages */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Languages</h5>
                                {/* Add languages content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Proficiency */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Proficiency</h5>
                                {/* Add proficiency content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Training */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Training</h5>
                                {/* Add training content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* References */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">References</h5>
                                {/* Add references content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </JobSeekerLayout>

    )
}
export default MyProfile;