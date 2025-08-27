import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout1 from "../../layouts/MainLayout1";
import PageHeader from "../../Component/Pages/PageHeader";
import AdPlaceholder from "../../Component/Ads/Vertical/AdPlaceholder";
import { Container, Row, Col } from "react-bootstrap"; // Ensure react-bootstrap is installed
import PersonalDetails from "../../Component/FeatureCandidate/ProfileSegment/PersonalDetails";
import About from "../../Component/FeatureCandidate/ProfileSegment/About";
import Experience from "../../Component/FeatureCandidate/ProfileSegment/Experience";
import Education from "../../Component/FeatureCandidate/ProfileSegment/Education";
import Language from "../../Component/FeatureCandidate/ProfileSegment/Language";
import EducationDetails from "../../Component/Profile/Education";
import Culture from "../../Component/FeatureCandidate/ProfileSegment/Culture";
import Personality from "../../Component/FeatureCandidate/ProfileSegment/Personality";
import Skills from "../../Component/FeatureCandidate/ProfileSegment/Skills";
import Software from "../software";
import SoftwareandTools from "../../Component/FeatureCandidate/ProfileSegment/SoftwaerAndTools";
import Proficiency from "../../Component/FeatureCandidate/ProfileSegment/Proficiency";
import Training from "../../Component/FeatureCandidate/ProfileSegment/Training";
import JobFit from "../../Component/FeatureCandidate/ProfileSegment/JobFit";
import ProfileAssessment from "../../Component/FeatureCandidate/ProfileSegment/ProfileAsse";

const FeaturedProfile = () => {
  const { state } = useLocation();
  const candidate = state?.candidate;

  const name = candidate?.first_name?.trim() || "Candidate Profile";
  console.log('cndiate what applicant id', candidate.applicant_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout1>
      <PageHeader title={name} />
      < div style={{ backgroundColor: "#cccccc", paddingBottom: "20px" }}>
        <Container className="py-4">

          <Row className="mt-4">
            {/* Main Content */}
            <Col xs={12} lg={9}>
              <PersonalDetails candidate={candidate} />
              <About candidate={candidate} />
              <Experience candidate={candidate} />
              <Education candidate={candidate} />
              <Culture candidate={candidate} />
              <Personality candidate={candidate} />
              <Skills candidate={candidate} />
              <SoftwareandTools candidate={candidate} />
              <Language candidate={candidate} />
              <Proficiency  candidate={candidate}/>
              <Training  candidate={candidate}/>
              <JobFit  candidate={candidate}/>
              <ProfileAssessment  candidate={candidate}/>
            </Col>

            {/* Sidebar Ad */}
            <Col xs={12} lg={3} className="mt-4 mt-lg-0 mb-3"
              style={{ position: "sticky", top: "180px", alignSelf: "flex-start" }}>
              <aside>
                <AdPlaceholder />
              </aside>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout1>
  );
};

export default FeaturedProfile;
