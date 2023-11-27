import React, { useState, useEffect } from 'react';
import getUsers from '../../components/GetUsers';
import deleteUser from '../../components/DeleteUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import getUser from '../../components/GetUser';
import { Link } from 'react-router-dom';


function GetUsers() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getUsers()
      .then((response) => {
        setEnterpriseOptions(response.data.data);
      })
      .catch((error) => {
        setError('Erro ao consultar usuários. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };

    fetchEnterpriseData();
  }, []);

  const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };

  return (
    <div>
    <Button onClick={handleGoBack}>Voltar</Button>
    <h2>Listagem de Empresas</h2>
    <ul>
      {enterpriseOptions.map((enterprise) => (
        <>
        <br/>
        <li>
          Nome: {enterprise.usuario}
        </li>
        <li>
          Apartamento: {enterprise.apartament}
        </li>
        <li>
          Bloco: {enterprise.bloc}
        </li>
        <li>
          E-mail: {enterprise.email}
        </li>
        <li>
          Tipo de Usuário: {enterprise.priority === "2" ? "Administrador" : "Usuário"}
        </li>
          <Link to={`/edituser/${enterprise.id}`}>
        <button onClick={() => getUser(enterprise.id)}>Editar</button>
         </Link>
        <button onClick={() => deleteUser(enterprise.id)}>Deletar</button>
        </>
      ))}
    </ul>
  </div>
  );
}

export default GetUsers;