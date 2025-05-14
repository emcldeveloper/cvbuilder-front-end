import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const UserStatistics = () => {
  // Placeholder data (replace with actual API/data fetching in your real app)
  const employersCount = 100; // Example data, replace with actual count
  const jobSeekersCount = 500; // Example data, replace with actual count
  const jobPostsCount = 200; // Example data, replace with actual count

  const styles = {
    container: {
      backgroundColor: "#DFE3E2",
      marginTop:"-32px"
    },
    jumboFooter: {
      display: "block",
    },
    statSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",  // Ensures the content is aligned at the top
      alignItems: "center",  // Centers the content horizontally
      textAlign: "center",
    },
    icon: {
      color: "#D36314",
      marginBottom: "10px", // Spacing between icon and title
    },
    statTitle: {
      color: "#2E58A6",
      fontSize: "22px",
      fontWeight: "bold",
    },
    statDescription: {
      color: "#2E58A6",
      fontWeight: "normal",
    },
    '@media (max-width: 768px)': {
      jumboFooter: {
        display: "none",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.jumboFooter}>
        <div className="container">
          <div className="row py-5">
            <div className="col-md-12">
              <div className="row">
                {/* Employers Section */}
                <div className="col-md-4">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{employersCount}</b>
                    <p style={styles.statDescription}>Employers have recruited with us</p>
                  </div>
                </div>

                {/* Job Seekers Section */}
                <div className="col-md-4">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{jobSeekersCount}</b>
                    <p style={styles.statDescription}>Job Seekers</p>
                  </div>
                </div>

                {/* Job Posts Section */}
                <div className="col-md-4">
                  <div style={styles.statSection}>
                    <FaCheckCircle size="2em" style={styles.icon} />
                    <b style={styles.statTitle}>{jobPostsCount}</b>
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
