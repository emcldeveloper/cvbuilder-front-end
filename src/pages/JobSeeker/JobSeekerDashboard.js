// src/components/JobSeeker/Layouts/JobSeekerDashboardLayout.jsx
import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import JobSeekerStatistic from "./JobSeeker/Statistics/JobSeekerStatistic";
import RecomendJob from "../../Component/Partials/RecommendJob";
const JobSeekerDashboard = () => {

  return (
      <JobSeekerLayout>
        
        <JobSeekerStatistic/>
      </JobSeekerLayout>
  );
};

export default JobSeekerDashboard;
