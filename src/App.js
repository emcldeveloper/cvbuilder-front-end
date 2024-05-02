
import './index.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import ChooseTemplate from './pages/chooseTemplate';
import IntroductionDetails from './pages/introductionDetails';
import Template1 from './templates/template1';
import ProfessionalSummary from './pages/professionalSummary';
import Education from './pages/education';
import Educations from './pages/education';
import WorksExperiences from './pages/workExperience';
import Skills from './pages/skills';
import Certifications from './pages/proficiency';
import Refrees from './pages/refrees';
import Complete from './pages/complete';
import AboutUs from './samples/aboutUs';
import Proficiency from './pages/proficiency';
import A4Paper from './samples/a4Paper';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/a4'  element={<A4Paper/>}/>

   <Route path='/' element={<MainLayout/>}>
    <Route path='/:uuid' index element={<ChooseTemplate/>}/>
    <Route path='/introduction/:uuid' index element={<IntroductionDetails/>}/>
    <Route path='/professional_summary/:uuid' index element={<ProfessionalSummary/>}/>
    <Route path='/educations/:uuid' index element={<Educations/>}/>
    <Route path='/experiences/:uuid' index element={<WorksExperiences/>}/>
    <Route path='/skills/:uuid' index element={<Skills/>}/>
    <Route path='/proficiency/:uuid' index element={<Proficiency/>}/>
    <Route path='/refrees/:uuid' index element={<Refrees/>}/>
    <Route path='/complete/:uuid' index element={<Complete/>}/>
    <Route path='/complete/:uuid' index element={<Complete/>}/>

   </Route>
   <Route path='/template1/:uuid' index element={<Template1/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
