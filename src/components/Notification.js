import React from 'react';
import { Link } from 'react-router-dom';

function Notification() {
  return (
    <div>
    <p>Cadastrado com Sucesso!</p> 
    <button>
      <Link to="/">Pagina de Login</Link>
    </button>
  </div>
  );
}

export default Notification;