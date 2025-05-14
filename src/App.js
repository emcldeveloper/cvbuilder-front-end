
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';




function App() {
  return (
   
 <BrowserRouter>
  <Routes>
  {/* Root route */}
  <Route path="/" element={<Home />} />

  {/* Jobseeker dashboard */}
  <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
 
  </Routes>
</BrowserRouter>
  
  );
}

export default App;
