import React, { useState, useEffect } from 'react';

function EditUser() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia


  const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // Recupera do storage os dados da API em JSON
  
  return (
    <div>
      {storedUser ? (
        <div>
          <h1>Dados do Usuário:</h1>
          <p>Nome: {enterpriseOptions.data}</p>
          <p>Email: {storedUser.data.email}</p>
        </div>
      ) : (
        <p>Nenhum dado do usuário encontrado.</p>
      )}
    </div>
  );
}

export default EditUser;