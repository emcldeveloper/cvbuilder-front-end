
import './index.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import ChooseTemplate from './pages/chooseTemplate';
import IntroductionDetails from './pages/introductionDetails';
import Template1 from './templates/template1';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<MainLayout/>}>
    <Route path='/:uuid' index element={<ChooseTemplate/>}/>
    <Route path='/introduction' index element={<IntroductionDetails/>}/>
   </Route>
   <Route path='/template1' index element={<Template1/>}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
