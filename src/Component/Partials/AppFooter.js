import React from "react";
import { Form, Button } from "react-bootstrap";
import SubFooter from "./SubFooter";

const AppFooter = () => {
  return (

    <div className="container-fluid" style={{backgroundColor:'#fff'}}>
      <SubFooter/>
      {/* Top Row – Newsletter + Job Alert */}
      <div
        className="row"
        style={{ backgroundColor: "#0000", zIndex: 1, paddingTop: 20 }}
      >
        <div className="col-md-6 text-center">
          {/* Honeypot */}
          <div style={{ display: "none" }}>
            <input type="text" name="honeypot" />
          </div>

          {/* Newsletter Subscription */}
          <h5>Subscribe to receive job notifications.</h5>
          <p>Join our weekly Newsletter</p>
         
        </div>

        {/* Job Alert Placeholder */}
        <div className="col-md-6 text-center">
        <Form className="d-flex justify-content-center mb-3">
            <Form.Control
              type="email"
              placeholder="Your Email"
              className="w-75 me-2"
            />
            <Button
              style={{ backgroundColor: "#D36314", color: "#fff" }}
              type="submit"
            >
              Subscribe
            </Button>
          </Form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="col-md-12 mt-4">
        <div className="container-fluid">
          <hr />

          <div className="row">
            {/* Logo and About EMCL */}
            <div className="col-md-5">
              <img
                src="/logo.png"
                alt="eKazi Logo"
                style={{ maxWidth: "120px", marginBottom: "10px" }}
              />
              <p>
                eKazi is An Online Recruitment Management Platform Designed for
                Employers/Recruiters, Job Seekers and Freelancers.
              </p>
            </div>

            {/* About Section */}
            <div className="col-md-2" style={{ fontSize: "1.1em" }}>
              <h6><b>ABOUT</b></h6>
              <p>About Us</p>
              <p>My Account</p>
              <p>Contact</p>
              <p>Terms of Use</p>
            </div>

            {/* Freelancer Section */}
            <div className="col-md-2" style={{ fontSize: "1.1em" }}>
              <h6><b>FOR FREELANCER</b></h6>
              <p>Browser Freelancers</p>
              <p>Hire me</p>
              <p>Post Project</p>
            </div>

            {/* Employer Section */}
            <div className="col-md-3" style={{ fontSize: "1.1em" }}>
              <h6><b>FOR EMPLOYER</b></h6>
              <p>Browse jobs</p>
              <p>
                <a
                  href="/post-job"
                  style={{ color: "#D36314", fontWeight: "bold" ,borderRight: '1px solid #fff',
                    padding: '0.5rem 1.5rem',
                    textDecoration: 'none',
                    textAlign: 'center', }}
                >
                  Post Job
                </a>
              </p>
              <h6 className="mt-2">Tel Hotline:</h6>
              <p>+255 677 400 206</p>
              <p>+255 677 400 205</p>
              <p>+255 677 014 718</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
