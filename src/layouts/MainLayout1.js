import React from "react";
import { Container } from "react-bootstrap";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";


const MainLayout1 = ({ children }) => {
  return (
    <>
     <AppHeader/>
      <div style={{ marginTop: '80px' }}></div>

      <Container fluid className="my-4">
        {children}
      </Container>

     <AppFooter/>
    </>
  );
};

export default MainLayout1;
