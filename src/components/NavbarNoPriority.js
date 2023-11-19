import React from 'react';
import { Link } from 'react-router-dom';

function NavbarNoPriority() {
  return (
    <nav>
      <ul>
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
          <Link to="/contato">Chat Portaria</Link>
        </li>
        <li>
          <Link to="/contato">Chat Sindico</Link>
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

export default NavbarNoPriority;