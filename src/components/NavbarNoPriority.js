import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function NavbarNoPriority() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/contato">Usuario</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarNoPriority;