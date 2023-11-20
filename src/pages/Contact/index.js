import React from 'react';

function Contato() {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // Recupera do storage os dados da API em JSON
  
  return (
    <div>
      {storedUser ? (
        <div>
          <h1>Dados do Usuário:</h1>
          <p>Nome: {storedUser.data.usuario}</p>
          <p>Email: {storedUser.data.email}</p>
        </div>
      ) : (
        <p>Nenhum dado do usuário encontrado.</p>
      )}
    </div>
  );
}

export default Contato;