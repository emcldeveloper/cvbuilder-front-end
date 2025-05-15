import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';

import { UniversalProvider } from './context/UniversalContext';
import MyApplication from './pages/MyApplicantion/MyApplication';
import EmployerCorrespondence from './pages/MyApplicantion/EmployerCorrespondence';
import MyProfile from './pages/MyProfile/MyProfile';
import ApplyLetter from './pages/MyApplicantion/Applyletter';
import SavedJob from './pages/MyApplicantion/SavedJob';
import JobMatch from './pages/MyApplicantion/JobMatch';
 

function App() {
  return (
    <UniversalProvider> {/* Wrap everything in the provider */}
      <BrowserRouter>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<Home />} />

          {/* Jobseeker dashboard */}
          <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
          <Route path="jobseeker/My-application" element={<MyApplication />} />
          <Route path="jobseeker/employer-correspondence" element={<EmployerCorrespondence />} />
          <Route path="jobseeker/profile-preview" element={<MyProfile />} />
          <Route path="jobseeker/apply-letter" element={<ApplyLetter />} />
          <Route path="jobseeker/saved-jobs" element={<SavedJob />} />
          <Route path="jobseeker/job-match" element={<JobMatch />} />
          
        </Routes>
      </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;
