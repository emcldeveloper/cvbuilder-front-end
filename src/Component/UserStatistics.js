import React, { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { UniversalContext } from "../context/UniversalContext";

const UserStatistics = () => {
  const { siteStatistics, loading } = useContext(UniversalContext); // ✅ Updated key

  const styles = {
    container: {
      backgroundColor: "#DFE3E2",
      marginTop: "-32px"
    },
    jumboFooter: {
      display: "block",
    },
    statSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
    },
    icon: {
      color: "#D36314",
      marginBottom: "10px",
    },
    statTitle: {
      color: "#2E58A6",
      fontSize: "22px",
      fontWeight: "bold",
    },
    statDescription: {
      color: "#2E58A6",
    },
  };

  if (loading || !siteStatistics) return null; // ✅ Added fallback for missing data

  return (
    <div style={styles.container}>
      <div style={styles.jumboFooter}>
        <div className="container">
          <div className="row py-5">
            <div className="col-md-12">
              <div className="row">
                {/* Employers Section */}
                <div className="col-md-4 mb-4 mb-md-0">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{siteStatistics.employers}</b>
                    <p style={styles.statDescription}>Employers have recruited with us</p>
                  </div>
                </div>

                {/* Job Seekers Section */}
                <div className="col-md-4 mb-4 mb-md-0">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{siteStatistics.job_seekers}</b>
                    <p style={styles.statDescription}>Job Seekers</p>
                  </div>
                </div>

                {/* Job Posts Section */}
                <div className="col-md-4">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{siteStatistics.job_posts}</b>
                    <p style={styles.statDescription}>Job Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default UserStatistics;
