import React, { useEffect, useState } from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PersonalData from "../../Component/Profile/PersonalData";
import ApplicantCareerSection from "../../Component/Profile/About";
import { profile } from "../../Api/Jobseeker/JobSeekerProfileApi";
import ApplicantSkillsSection from "../../Component/Profile/Skill";
import CareerObjectivesSection from "../../Component/Profile/Objective";
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
import ProfileSection from "../../Component/Profile/PersonalData";
import JobsFitSection from "../../Component/Profile/JobFit";

const profileCache = {};

const MyProfile = () => {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applicant_id = localStorage.getItem("applicantId");
  console.log("applicant id from local storage", applicant_id);

  // ✅ Move this outside useEffect
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
      profileCache[applicant_id] = response.data;
      console.log("Response data:", response.data);
      setApplicant(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
  // remove cached value so fetchProfile will actually call API
  delete profileCache[applicant_id];
  await fetchProfile();
};

  useEffect(() => {
    fetchProfile();
  }, [applicant_id]);

  console.log("data za profile zimefika sawa", applicant);

  return (
    <JobSeekerLayout>
      <Container
        fluid
        style={{
          height: "170vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Row className="justify-content-center mb-3">
          <Col>
            <Card className="shadow-smy">
              <Card.Body className="p-4">
                <ProfileSection
                  profile={applicant?.applicant_profile?.[0] || null}
                  address={applicant?.address?.[0] || null}
                  phone={applicant?.phone || null}
                />

                <ApplicantCareerSection applicant={applicant} />
                <CareerObjectivesSection applicant={applicant} />
                <WorkExperienceSection applicant={applicant} />
                <EducationDetails applicant={applicant} />
                <KnowledgesSection applicant={applicant} />
                <SoftwareSection applicant={applicant} />
                <PersonalitiesSection applicant={applicant} />
                <JobsFitSection applicant={applicant} />
                <CulturesSection applicant={applicant} />

                {/* ✅ now works correctly */}
                <LanguagesSection
                  applicant={applicant}
                  onLanguageSaved={refreshProfile}
                />

                <ProficiencyQualifications applicant={applicant} />
                <TrainingWorkshops applicant={applicant} />
                <RefereesSection applicant={applicant} />
                <CvVideoCard applicant={applicant} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </JobSeekerLayout>
  );
};

export default MyProfile;
