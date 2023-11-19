import React from 'react';

function Contato() {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div>
      {storedUser ? (
        <div>
          <h1>Dados do Usuário:</h1>
          <p>Nome: {storedUser.usuario}</p>
          <p>Email: {storedUser.email}</p>
          {/* Outras informações do usuário */}
        </div>
      ) : (
        <p>Nenhum dado do usuário encontrado.</p>
      )}
    </div>
  );
}

export default Contato;
