import React from "react";
import { Container } from "react-bootstrap";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";
import CopyrightBar from "../Component/Partials/CopyrightBar";

const MainLayout1 = ({ children }) => {
  return (
    <>
     <AppHeader/>

      <div>
        {children}
      </div>

     <AppFooter/>
     <CopyrightBar/>
    </>
  );
};

export default MainLayout1;
