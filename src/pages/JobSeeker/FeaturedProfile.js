import React from "react";
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
const FeaturedProfile = () => {
  const { state } = useLocation();
  const candidate = state?.candidate;

  const name = candidate?.first_name?.trim() || "Candidate Profile";

  return (
    <MainLayout1>
    <PageHeader title={name} />
      <Container className="py-4">

        <Row className="mt-4">
          {/* Main Content */}
          <Col xs={12} lg={9}>
          <PersonalDetails candidate={candidate}/>
           <About candidate={candidate}/>
           {/* <Experience candidate={candidate}/> */}
           <Education  candidate={candidate} />
           <Language candidate={candidate} />
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
    </MainLayout1>
  );
};

export default FeaturedProfile;
