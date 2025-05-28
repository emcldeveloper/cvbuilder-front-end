import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';

import { UniversalProvider } from './context/UniversalContext';
import MyApplication from './pages/MyApplicantion/MyApplication';
import EmployerCorrespondence from './pages/MyApplicantion/EmployerCorrespondence';
import ApplyLetter from './pages/MyApplicantion/Applyletter';
import SavedJob from './pages/MyApplicantion/SavedJob';
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
import AllFeaturedJobSeeker from './pages/JobSeeker/AllFeaturedJobSeeker';
 
function App() {
  return (
    <UniversalProvider> {/* Wrap everything in the provider */}
      <BrowserRouter>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<Home />} />
           <Route path="/cv-builder" element={<CvBuilder />} />
          
           {/* Job Routes */}
          <Route path="/jobs/:jobSlug" element={<JobPreview />} />
          <Route path="/jobs" element={<FindJobs/>}/>
          <Route path="/employers" element={<Employer/>}/>
          <Route path="/employer/details" element={<EmployerDetails/>}/>

          {/* Featured Profile will be here */}
          <Route path="/job-seeker-profile/:slug" element={<FeaturedProfile/>}/>
          {/* All Featured Job Seekers AllFeaturedJobSeeker*/}
          <Route path="/featured-jobseeker" element={<AllFeaturedJobSeeker/>}/>

          {/* Jobseeker dashboard */}
          <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
          <Route path="jobseeker/My-application" element={<AppliedJob />} />
          <Route path="jobseeker/employer-correspondence" element={<EmployerCorrespondence />} />
          <Route path="jobseeker/profile-preview" element={<MyProfile/>} />
          <Route path="jobseeker/apply-letter" element={<ApplyLetter />} />
          <Route path="jobseeker/saved-jobs" element={<SavedJob />} />
          <Route path="jobseeker/job-match" element={<JobMatch />} />
          <Route path="jobseeker/sample-selection" element={<SampleTemplate />} />
            {/* <Route path="jobseeker/Job/Applied-job" element={<AppliedJob />} /> */}
         
        </Routes>
      </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;
