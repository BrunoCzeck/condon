import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* import Navbar from './components/NavbarPriority'; */
import Home from './pages/HomePage';
import Contato from './pages/Contact';
import FormUsers from './pages/FormUsers';
import GetUsers from './pages/UsersAdmin';
import EditUser from './pages/EditUser';
import Company from './pages/Company';
import CompanyCreate from './pages/CompanyCreate';
import Posts from './pages/Avisos'

function App() {
  return (
    <Router>
      <div>
      {/*   <Navbar /> */} {/* Adicione o componente Navbar aqui */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormUsers />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/users" element={<GetUsers />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/create" element={<CompanyCreate />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
