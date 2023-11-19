import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Usuario</Link>
        </li>
        <li>
          <Link to="/form">Chat Portaria</Link>
        </li>
        <li>
          <Link to="/contato">Chat Sindico</Link>
        </li>
        <li>
          <Link to="/contato">Avisos</Link>
        </li>
        <li>
          <Link to="/contato">Agendamentos</Link>
        </li>
        <li>
          <Link to="/contato">Assembleias</Link>
        </li>
        <li>
          <Link to="/contato">Boletos</Link>
        </li>
        <li>
          <Link to="/contato">Correspondencias</Link>
        </li>
        <li>
          <Link to="/contato">Votação</Link>
        </li>
        <li>
          <Link to="/contato">Sair</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;