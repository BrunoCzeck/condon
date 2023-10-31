"use client"
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [apartament, setApartament] = useState('');
  const [bloc, setBloco] = useState('');
  const [email, setEmail] = useState('');
  const [id_enterprise, setEnterprise] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, apartament, bloc, email, id_enterprise };
/* # LINK PARA TESTAR EM PRODUÇÃO */
/*     axios.post('https://api-condon-production.up.railway.app/api/v1/users', data, { */     
 axios.post('http://127.0.0.1:3333/api/v1/users', data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  return (
    <div>
      <h2>Exemplo de Formulário em React</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <br />
        <label>
          Apartamento:
          <input
            type="text"
            value={apartament}
            onChange={(e) => setApartament(e.target.value)}
          />
        </label>
        <br />
        <label>
          Bloco:
          <input
            type="text"
            value={bloc}
            onChange={(e) => setBloco(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nome do Condominio:
          <input
            type="text"
            value={id_enterprise}
            onChange={(e) => setEnterprise(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
