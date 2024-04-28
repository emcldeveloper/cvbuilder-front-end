
import './index.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import TemplatesPage from './pages/templatesPage';
import EditTemplate from './pages/editTemplate';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route index path='/' element={<TemplatesPage/>}/>
   <Route path='/template/:uuid' element={<EditTemplate/>}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
