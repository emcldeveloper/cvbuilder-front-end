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
import EducationDetails from "../../Component/Profile/Education";
import ProficiencyQualifications from "../../Component/Profile/Proficience";
import TrainingWorkshops from "../../Component/Profile/Training";
import RefereesSection from "../../Component/Profile/Referee";
import PersonalitiesSection from "../../Component/Profile/Personality";
import KnowledgesSection from "../../Component/Profile/Knowledge";
import SoftwareSection from "../../Component/Profile/SoftwareAndTools";
import CulturesSection from "../../Component/Profile/Culture";
import LanguagesSection from "../../Component/Profile/Language";
import CvVideoCard from "../../Component/Profile/CvVideo";
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
       



                {/* Career Objective */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-smy">
                            <Card.Body className="p-4">
                                <ApplicantCareerSection applicant={applicant} />
                                <CareerObjectivesSection applicant={applicant} />
                                <WorkExperienceSection applicant={applicant}/>
                                <EducationDetails applicant={applicant}/>
                                <KnowledgesSection  applicant={applicant}/>
                                <SoftwareSection applicant={applicant}/>
                                <PersonalitiesSection  applicant={applicant}/>
                                 <CulturesSection applicant={applicant}/>
                                 <LanguagesSection  applicant={applicant}/>
                                <ProficiencyQualifications  applicant={applicant}/>
                                <TrainingWorkshops applicant={applicant}/>
                                 <RefereesSection  applicant={applicant}/>
                                 <CvVideoCard applicant={applicant}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <PersonalData applicant={applicant} />
                {/* Career Skills */}
                {/* <ApplicantSkillsSection applicant={applicant} /> */}

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

               

              

            
 
            </Container>
        </JobSeekerLayout>

    )
}
export default MyProfile;