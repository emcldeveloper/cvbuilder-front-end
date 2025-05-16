import React from "react";
import { Container } from "react-bootstrap";

const HeroSection = () => {
  const styles = {
    container: {
      backgroundColor: "#DFE3E2",
      marginTop: "0", // Small top margin
    },
    banner: {
      backgroundImage: "url('/banner.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    
      minHeight: "300px",
      display: "flex",
     
    },
    title: {
      fontSize: "43px",
      fontWeight: 700,
      color: "#2E58A6",
      marginBottom: "10px",
    },
    highlight: {
      color: "#D36314",
    },
    subtitle: {
      fontSize: "22px",
      fontWeight: 700,
    },
  };

  return (
    <Container><div style={styles.container}>
    <div style={styles.banner}>
      <div className="py-4 ps-md-5">
        <p style={styles.title} id="searching">
          <b>
            A place where <span style={styles.highlight}>employers</span>
            <br />
            meets potential candidates
          </b>
        </p>
        <p style={styles.subtitle}>
          <b>
            Set your career in motion with{" "}
            <span className="text-lowercase">eKazi</span>.
          </b>
        </p>
      </div>
    </div>
  </div></Container>
  );
};

export default HeroSection;
