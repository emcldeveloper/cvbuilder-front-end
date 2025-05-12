import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SubFooter = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 bg-light" style={{ padding: "2%" }}>
          <div className="row">
            <div className="col-md-4 text-center" style={{ fontSize: "1.1em" }}>
              <div
                style={{
                 
                  padding: "10px",
                  marginBottom: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCheckCircle color="#D36314" size={32} />
              </div>
              <h6 className="text-primary">
                <b>Hire Candidate</b>
              </h6>
              <p className="text-primary">Find the potential candidate from eKazi</p>
            </div>

            <div className="col-md-4 text-center" style={{ fontSize: "1.1em" }}>
              <div
                style={{
                 
                  padding: "10px",
                  marginBottom: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCheckCircle color="#D36314" size={32} />
              </div>
              <h6 className="text-primary">
                <b>Get Hired</b>
              </h6>
              <p className="text-primary">Receive new jobs directly</p>
            </div>

            <div className="col-md-4 text-center" style={{ fontSize: "1.1em" }}>
              <div
                style={{
                 
                  padding: "10px",
                  marginBottom: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCheckCircle color="#D36314" size={32} />
              </div>
              <h6 className="text-primary">
                <b>Explore Careers</b>
              </h6>
              <p className="text-primary">See personalized job and career recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
