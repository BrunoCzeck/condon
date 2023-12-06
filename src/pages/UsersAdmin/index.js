import React, { useState, useEffect } from 'react';
import getUsers from '../../components/GetUsers';
import deleteUser from '../../components/DeleteUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import getUser from '../../components/GetUser';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import NavbarPriority from '../../components/NavbarPriority';

function GetUsers() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

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
    window.history.back();
  };

  return (
    <div>
      <h2>Listagem de Usuario</h2>
      <NavbarPriority />
      <div className="d-flex">
        {enterpriseOptions.map((enterprise) => (
          <div key={enterprise.id}>
            <ListGroup>
              <ListGroup.Item>Nome: {enterprise.usuario}</ListGroup.Item>
              <ListGroup.Item>Apartamento: {enterprise.apartament}</ListGroup.Item>
              <ListGroup.Item>Bloco: {enterprise.bloc}</ListGroup.Item>
              <ListGroup.Item>E-mail: {enterprise.email}</ListGroup.Item>
              <ListGroup.Item>Tipo de Usuário: {enterprise.priority === "2" ? "Administrador" : "Usuário"}</ListGroup.Item>
            </ListGroup>
            <Link to={`/edituser/${enterprise.id}`}>
              <Button variant="secondary" onClick={() => getUser(enterprise.id)} className="btn btn-primary ml-2">Editar</Button>
            </Link>
            <Button variant="danger" onClick={() => deleteUser(enterprise.id)}>Deletar</Button>
          </div>
        ))}
      </div>
      <Button onClick={handleGoBack} className="btn btn-primary mt-3 mr-3">Voltar</Button>
    </div>
  );
}

export default GetUsers;
