import React, { useEffect, useState } from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PersonalData from "../../../Component/Profile/PersonalData";
import { profile } from "../../../Api/Jobseeker/JobSeekerProfileApi";
 
import TrainingWorkshops from "../../../Component/Profile/Training";
import EditTraining from "../../../Component/Profile/Edit/Training";
import EditWorkExperience from "../../../Component/Profile/Edit/Experience";
 
// Create a simple cache object outside the component
const profileCache = {};
const EditExperincePage = () => {


    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const applicant_idy = 18861;
    // const applicant_id = 48;
      const applicant_id = localStorage.getItem("applicantId");
      console.log("applicant id from local storage",applicant_id);

    useEffect(() => {
        const fetchProfile = async () => {
            // Check cache first
            if (profileCache[applicant_id]) {
                setApplicant(profileCache[applicant_id]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await profile(applicant_id);
                
                // Update cache
                profileCache[applicant_id] = response.data;
                
                console.log('Response data:', response.data);
                setApplicant(response.data);
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
                              
                             <EditWorkExperience applicant={applicant} />
                             
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </JobSeekerLayout>

    )
}
export default EditExperincePage