import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';

import { UniversalProvider } from './context/UniversalContext';
import MyApplication from './pages/MyApplicantion/MyApplication';
import EmployerCorrespondence from './pages/MyApplicantion/EmployerCorrespondence';
import ApplyLetter from './pages/MyApplicantion/Applyletter';
// import SavedJob from './pages/MyApplicantion/SavedJob';
import JobMatch from './pages/MyApplicantion/JobMatch';
import JobPreview from './pages/Jobs/JobPreview';
import FindJobs from './pages/Jobs/FindJobs';
import StickyPage from './pages/Jobs/StickyPage';
import MyProfile from './pages/JobSeeker/MyProfile';
import CvBuilder from './pages/CvBuilder';
import Employer from './pages/Employer/Employer';
import EmployerDetails from './pages/Employer/EmployerDetails';
import FeaturedProfile from './pages/JobSeeker/FeaturedProfile';
import SampleTemplate from './pages/JobSeeker/Cv/SampleTemplate';
import AppliedJob from './pages/JobSeeker/JobSeeker/MyApplication';
import SavedJob from './pages/JobSeeker/Jobs/SavedJob';
import SavedSearchJob from './pages/JobSeeker/Jobs/SavedSearchJob';

import AllFeaturedJobSeeker from './pages/JobSeeker/AllFeaturedJobSeeker';
import MyAccount from './pages/JobSeeker/MyAccount';
import ChangePassword from './pages/JobSeeker/Auth/ChangePassword';
import Privatepolicy from './pages/JobSeeker/PrivatePolicy';
import CoverLetter from './pages/JobSeeker/CoverLetter';
import Mycv from './pages/JobSeeker/MyCv';
import SalaryCalculator from './pages/TaxCalculator';

import NotVerifiedPage from './pages/Auth/NotVerifiedPage';
import RequireVerification from './Auth/RequireVerification';
import IntroductionDetails from './pages/introductionDetails';
import IntroductionData from './pages/JobSeeker/Cv/Introduction';
import ObjectDetail from './pages/JobSeeker/Cv/Objective';
import EducationCv from './pages/JobSeeker/Cv/Education';
import AboutPage from './pages/AboutPage';
import PricePage from './pages/PricePage';
import ExperinceCv from './pages/JobSeeker/Cv/Experience';
import SkillsCv from './pages/JobSeeker/Cv/Skills';
import LanguageCv from './pages/JobSeeker/Cv/Language';
import RefereeCv from './pages/JobSeeker/Cv/Referee';
import HomeCv from './pages/JobSeeker/Cv/Home';
import Template3 from './templates/template3';
import Template6 from './templates/template6';


// Employer Routes
import DashBoard from './pages/Employer/Dashboard/DashBoard';
import PostForm from './pages/Employer/ManageJob/PostForm';
import CVComponent from './Component/Cv/Stepprogress';
import Proficiencycv from './pages/JobSeeker/Cv/Proficiency';
import TrainingCv from './pages/JobSeeker/Cv/Training';
import Applyjob from './pages/JobSeeker/Jobs/Applyjob';
import Complete from './pages/JobSeeker/Cv/CompleteCv';
import Jobemial from './pages/JobSeeker/Jobs/EmailJob';
import EditTraningPage from './pages/JobSeeker/EditJobseeker/Training';
import EditProficiencyPage from './pages/JobSeeker/EditJobseeker/Proficiency';
import EditLanguagePage from './pages/JobSeeker/EditJobseeker/Language';
import EditRefereePage from './pages/JobSeeker/EditJobseeker/Referee';
import EditExperincePage from './pages/JobSeeker/EditJobseeker/Experience';
import EditEducationPage from './pages/JobSeeker/EditJobseeker/Education';
 

function App() {
  return (
    <UniversalProvider> {/* Wrap everything in the provider */}
      <BrowserRouter>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home />} />
          <Route path="/cv-builder" element={<CvBuilder />} />
          <Route path="/salary-calculator" element={<SalaryCalculator />} />


          <Route path="/not-verified" element={<NotVerifiedPage />} />
          {/* Job Routes */}
          <Route path="/jobs/:jobSlug" element={<JobPreview />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/employers" element={<Employer />} />
          <Route path="/employer/details" element={<EmployerDetails />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/employers" element={<Employer />} />
          <Route path="/employer/details" element={<EmployerDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricelists" element={<PricePage />} />



          {/* Featured Profile will be here */}
          {/* <Route path="/job-seeker-profile/:slug" element={<FeaturedProfile/>}/> */}

          <Route path="/job-seeker-profile/:slug" element={<FeaturedProfile />} />
          {/* All Featured Job Seekers AllFeaturedJobSeeker*/}
          <Route path="/featured-jobseeker" element={<AllFeaturedJobSeeker />} />

          {/* Jobseeker dashboard */}
          <Route element={<RequireVerification />}>
            <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/jobseeker/My-application" element={<AppliedJob />} />
            <Route path="/jobseeker/employer-correspondence" element={<EmployerCorrespondence />} />
            <Route path="/jobseeker/profile-preview" element={<MyProfile />} />
            <Route path="/jobseeker/saved-searches" element={<SavedSearchJob />} />
            <Route path="/jobseeker/saved-jobs" element={<SavedJob />} />
            <Route path="/jobseeker/job-match" element={<JobMatch />} />
            <Route path="/jobseeker/apply-job" element={<Applyjob />} />
            <Route path="/jobseeker/sample-selection" element={<SampleTemplate />} />
            <Route path="/jobseeker/account-settings" element={<MyAccount />} />
            <Route path="/jobseeker/change-password" element={<ChangePassword />} />
            <Route path="/jobseeker/Privacy-policy" element={<Privatepolicy />} />
            <Route path="/jobseeker/cover-letter" element={<CoverLetter />} />
            <Route path="/jobseeker/apply-job-email" element={<Jobemial />} />
            <Route path="/jobseeker/my-resume" element={<Mycv />} />

            {/* edit profile */}
            <Route path="/jobseeker/Edit-Training" element={<EditTraningPage />} />
            <Route path="/jobseeker/Edit-Proficiency" element={<EditProficiencyPage />} />
            <Route path="/jobseeker/Edit-Language" element={<EditLanguagePage />} />
            <Route path="/jobseeker/Edit-Referee" element={<EditRefereePage />} />
            <Route path="/jobseeker/Edit-Experience" element={<EditExperincePage />} />
            <Route path="/jobseeker/Edit-Education" element={<EditEducationPage />} />

            {/*   cv temepalte and cv builder */}
            <Route path="/jobseeker/introduction" element={<IntroductionData />} />
            <Route path="/jobseeker/Objective" element={<ObjectDetail />} />
            <Route path="/jobseeker/EducationCv" element={<EducationCv />} />
            <Route path="/jobseeker/ExperienceCv" element={<ExperinceCv />} />
            <Route path="/jobseeker/SkillsCv" element={<SkillsCv />} />
            <Route path="/jobseeker/LanguageCv" element={<LanguageCv />} />
            <Route path="/jobseeker/RefereeCv" element={<RefereeCv />} />
            <Route path="/jobseeker/Home-Cv" element={<HomeCv />} />
            <Route path="/jobseeker/test-template" element={<Template6 />} />
            <Route path="/jobseeker/proficiencycv" element={<Proficiencycv />} />
            <Route path="/jobseeker/Trainingcv" element={<TrainingCv />} />
            <Route path="/jobseeker/cvprogress" element={<CVComponent />} />
            <Route path="/jobseeker/CompleteCv" element={<Complete />} />
          </Route>


          {/* <Route path="jobseeker/Job/Applied-job" element={<AppliedJob />} /> */}

          {/* Employers Routes */}
          <Route path="employer/dashboard" element={<DashBoard />} />
          <Route path="employer/post-job" element={<PostForm />} />


        </Routes>
      </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;
