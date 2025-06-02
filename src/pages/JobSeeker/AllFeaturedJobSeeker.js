import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllFeaturedCandidate from "../../Component/FeatureCandidate/AllFeaturedCandidate";
import MainLayout1 from "../../layouts/MainLayout1";
import PageHeader from "../../Component/Pages/PageHeader";
import AdPlaceholder from "../../Component/Ads/Vertical/AdPlaceholder";

const AllFeaturedJobSeeker = () => {
  return (
    <MainLayout1>
          {/* <PageHeader title="All Featured Job Seekers" /> */}
      <Container fluid>
      
        <Row>
          {/* Main Content: Candidates list */}
          <Col md={9}>
            <AllFeaturedCandidate />
          </Col>

          {/* Right Sidebar: Ads or any content */}
          <Col
                     xs={12}
                     md={3}
                     className="mb-3"
                     style={{ position: "sticky", top: "180px", alignSelf: "flex-start" }}
                   >
                     <AdPlaceholder />
                   </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default AllFeaturedJobSeeker;
