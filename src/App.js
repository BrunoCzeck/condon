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
import SchedulerType from './pages/SchedulerType';
import Perfil from './pages/Perfil';
import Correspondence from './pages/Correspondence';
import CorrespondenceList from './pages/CorrespondenceList';
import Meeting from './pages/Meeting';
import Chat from './pages/Chat';
import ChatUser from './pages/Chat_User';
import Voting from './pages/Voting';
import VotingEdit from './pages/Voting/Edit';
import VotingView from './pages/Voting/View';
import VotingUsers from './pages/Voting/Users';
import VotingUser from './pages/Voting/VotingUsers';


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
          <Route path="/scheduler/:id" element={<SchedulerType />} />
          <Route path="/error" element={<PageError />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit_scheduler/:id" element={<EditScheduler />} />
          <Route path="/history" element={<History />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/correspondence" element={<Correspondence />} />
          <Route path="/list/correspondence" element={<CorrespondenceList />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/user" element={<ChatUser />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/voting/:id" element={<VotingEdit />} />
          <Route path="/voting/view/:id" element={<VotingView />} />
          <Route path="/voting/users" element={<VotingUsers />} />
          <Route path="/voting/users/:id" element={<VotingUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
