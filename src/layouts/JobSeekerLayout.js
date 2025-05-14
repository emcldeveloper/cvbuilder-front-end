// src/components/JobSeeker/Layouts/JobSeekerDashboardLayout.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSideBar from "../Component/Partials/JobSeeker/LeftSideBar";
import RightSidebar from "../Component/Partials/JobSeeker/RightSidebar";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";

const JobSeekerLayout = ({ children }) => {
  return (
    <>
      <AppHeader />

      <Container fluid>
        <Row>
          {/* Left Sidebar */}
          <Col xs={12} md={3} className="bg-light p-3">
            <LeftSideBar />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={6} className="p-3">
            {children}
          </Col>

          {/* Right Sidebar */}
          <Col xs={12} md={3} className="bg-light p-3">
            <RightSidebar />
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </>
  );
};

export default JobSeekerLayout;
