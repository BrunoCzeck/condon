import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* import Navbar from './components/NavbarPriority'; */
import Home from './pages/HomePage';
import Contato from './pages/Contact';
import FormUsers from './pages/FormUsers';
import GetUsers from './pages/UsersAdmin';
import EditUser from './pages/EditUser';
import Company from './pages/Company';
import Posts from './pages/Avisos';
import Scheduler from './pages/Scheduler';
import PageError from './pages/Error';
import Settings from './pages/Settings';
import EditScheduler from './pages/EditScheduler';
import History from './pages/History';



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
          <Route path="/posts" element={<Posts />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/error" element={<PageError />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit_scheduler/:id" element={<EditScheduler />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
