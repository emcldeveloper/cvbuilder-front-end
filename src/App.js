import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';

import { UniversalProvider } from './context/UniversalContext';

function App() {
  return (
    <UniversalProvider> {/* Wrap everything in the provider */}
      <BrowserRouter>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<Home />} />

          {/* Jobseeker dashboard */}
          <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
          
        </Routes>
      </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;
