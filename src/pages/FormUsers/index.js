import React, { useState } from 'react';
import sendUserData from '../../components/FormPostApi';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';

function FormUsers() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [apartament, setApartament] = useState('');
  const [bloc, setBloco] = useState('');
  const [email, setEmail] = useState('');
  const [id_enterprise, setEnterprise] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, apartament, bloc, email, id_enterprise };

    sendUserData(data)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setError('Erro ao cadastrar usuário favor verificar as informações')
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  return (
    <div>
      {users ? (
      <Notification/>
      ) : (
        <>
      <h2>Exemplo de Formulário em React</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:<input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        </label>
        <br />
        <label>
          Senha:<input type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        </label>
        <br />
        <label>
          Apartamento:<input type="text" value={apartament} onChange={(e) => setApartament(e.target.value)}/>
        </label>
        <br />
        <label>
          Bloco:<input type="text" value={bloc} onChange={(e) => setBloco(e.target.value)}/>
        </label>
        <br />
        <label>
          Email:<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <br />
        <label>
          Nome do Condominio:<input type="text" value={id_enterprise} onChange={(e) => setEnterprise(e.target.value)}/>
        </label>
        <br />
          <button type="submit">Enviar</button>
      </form>
      <p>{error}</p>
      </>
       )}
    </div>
  );
}

export default FormUsers;