import React from "react";
import MainLayout1 from "../layouts/MainLayout1";
import HeroSection from "../Component/HeroSection";
import JobSearchSection from "../Component/Jobs/JobSearchSection";
import UserStatistics from "../Component/UserStatistics";
import BannerCarousel from "../Component/Banner/BannerCarousel";
import FeaturedJobs from "../Component/Jobs/FeaturedJobs";
import FeaturedCandidateList from "../Component/FeatureCandidate/FeaturedCandidateList";
import FeaturedEmployerList from "../Component/Employer/FeaturedEmployerList";
import JobCategoriesTabs from "../Component/Jobs/JobCategory/JobCategoriesTabs";


const Home= () => {
  return (
      <div style={{ backgroundColor: "#DFE3E2" }}>
      <MainLayout1>
        
        <HeroSection />
        <JobSearchSection/>
        <BannerCarousel/>
        <UserStatistics/>
        <FeaturedEmployerList/>
        <JobCategoriesTabs/>
        <FeaturedJobs/>
        <FeaturedCandidateList/>
        

      </MainLayout1>
    </div>
  
  );
};

export default Home;
