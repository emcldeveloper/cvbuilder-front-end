// src/components/JobSeeker/Layouts/JobSeekerDashboardLayout.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSideBar from "../Component/Partials/JobSeeker/LeftSideBar";
import RightSidebar from "../Component/Partials/JobSeeker/RightSidebar";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";

const JobSeekerLayout2 = ({ children }) => {
  return (
    <>
      <AppHeader />

<Container fluid>
  <Row className="d-flex">
    <Col xs={12} md style={{ flex: 3 }} className="bg-light p-3">
      <LeftSideBar />
    </Col>

    <Col xs={12} md style={{ flex: 8 }} className="bg-light p-3">
      {children}
    </Col>

     <Col xs={12} md style={{ flex: 1 }} className="bg-light p-3">
    
    </Col>
  </Row>
</Container>

      <AppFooter />
    </>
  );
};

export default JobSeekerLayout2;
