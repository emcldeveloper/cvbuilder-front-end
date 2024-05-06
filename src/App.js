
import './index.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import ChooseTemplate from './pages/homePage';
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
import HomePage from './pages/homePage';
import Template2 from './templates/template2';
import Template3 from './templates/template3';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/a4'  element={<A4Paper/>}/>
   <Route path='/' element={<MainLayout/>}>
   <Route path='/:uuid/:template' index element={<HomePage/>}/>
    <Route path='/introduction/:uuid/:template' index element={<IntroductionDetails/>}/>
    <Route path='/professional_summary/:uuid/:template' index element={<ProfessionalSummary/>}/>
    <Route path='/educations/:uuid/:template' index element={<Educations/>}/>
    <Route path='/experiences/:uuid/:template' index element={<WorksExperiences/>}/>
    <Route path='/skills/:uuid/:template' index element={<Skills/>}/>
    <Route path='/proficiency/:uuid/:template' index element={<Proficiency/>}/>
    <Route path='/refrees/:uuid/:template' index element={<Refrees/>}/>
    <Route path='/complete/:uuid/:template' index element={<Complete/>}/>
   </Route>
   <Route path='/template1/:uuid' element={<Template1/>}/>
   <Route path='/template2/:uuid' element={<Template2/>}/>
   <Route path='/template3/:uuid' element={<Template3/>}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
