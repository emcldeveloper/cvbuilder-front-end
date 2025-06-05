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
import NotVerifiedPage from './pages/Auth/NotVerifiedPage';
import RequireVerification from './Auth/RequireVerification';
 
function App() {
  return (
    <UniversalProvider> {/* Wrap everything in the provider */}
      <BrowserRouter>
        <Routes>
          {/* Root route */}
           <Route path="/" element={<Home />} />
           <Route path="/cv-builder" element={<CvBuilder />} />
           <Route path="/not-verified" element={<NotVerifiedPage />} />
           {/* Job Routes */}
          <Route path="/jobs/:jobSlug" element={<JobPreview />} />
          <Route path="/jobs" element={<FindJobs/>}/>
          <Route path="/employers" element={<Employer/>}/>
          <Route path="/employer/details" element={<EmployerDetails/>}/>

          {/* Featured Profile will be here */}
          {/* <Route path="/job-seeker-profile/:slug" element={<FeaturedProfile/>}/> */}

          <Route path="/job-seeker-profile/:slug" element={<FeaturedProfile/>}/>
          {/* All Featured Job Seekers AllFeaturedJobSeeker*/}
          <Route path="/featured-jobseeker" element={<AllFeaturedJobSeeker/>}/>

          {/* Jobseeker dashboard */}
           <Route element={<RequireVerification />}>
              <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
          <Route path="jobseeker/My-application" element={<AppliedJob />} />
          <Route path="jobseeker/employer-correspondence" element={<EmployerCorrespondence />} />
          <Route path="jobseeker/profile-preview" element={<MyProfile/>} />
          <Route path="jobseeker/saved-searches" element={<SavedSearchJob />} />
          <Route path="jobseeker/saved-jobs" element={<SavedJob />} />
          <Route path="jobseeker/job-match" element={<JobMatch />} />
          <Route path="jobseeker/sample-selection" element={<SampleTemplate />} />
          <Route path="jobseeker/account-settings" element={<MyAccount />} />
          <Route path="jobseeker/change-password" element={<ChangePassword />} />
          <Route path="jobseeker/Privacy-policy" element={<Privatepolicy />} />
          <Route path="jobseeker/cover-letter" element={<CoverLetter />} />
          <Route path="jobseeker/my-resume" element={<Mycv />} />
          </Route>
        

          {/* <Route path="jobseeker/Job/Applied-job" element={<AppliedJob />} /> */}
      
        
        </Routes>
      </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;
