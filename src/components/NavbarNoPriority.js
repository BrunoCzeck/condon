import React from 'react';
import { Link } from 'react-router-dom';

function NavbarNoPriority() {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/posts">Mural</Link>
        </li>
        <li>
          <Link to="/contato">Chat Portaria</Link>
        </li>
        <li>
          <Link to="/contato">Agendamentos</Link>
        </li>
        <li>
          <Link to="/contato">Assembleia</Link>
        </li>
        <li>
          <Link to="/contato">Chat Sindico</Link>
        </li>
        <li>
          <Link to="/contato">Boletos</Link>
        </li>
        <li>
          <Link to="/contato">Correspondencia</Link>
        </li>
        <li>
          <Link to="/contato">Votação</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarNoPriority;