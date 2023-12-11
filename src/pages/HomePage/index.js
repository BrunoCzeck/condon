import React, { useState, useEffect } from 'react';
import getData from '../../components/services/api-users/AuthenticationUser';
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavbarNoPriority from '../../components/NavBar/NavBarNoPriority';
import { Link } from 'react-router-dom';
import getEnterprise from '../../components/services/api-enterprise/GetEnterprise';
import PageError from '../../pages/Error';
import {Container, Form, FormInput, Button, LoginFormContainer, NavBar, Text, Img, Linked} from './HomeStyle'
import { StyledLink } from './HomeStyle'; // Importe o componente StyledLink do arquivo separado
import homeIcon from '../../img/2.svg';

function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);
  const [enterprise, setUser] = useState(null);
  const [nome, setName] = useState(null);

/* Chama a API com os dados do Condominio Individual por ID. */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getEnterprise(users.data.id_enterprise); 
        const userData = response;
        setName(userData.data.data[0].name);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [enterprise]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUsers(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);
  /*  */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { senha, email };
    getData(data)
      .then((response) => {
        setUsers(response.data);
        setUser(response.data)
        setLoggedIn(true);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
        setError('Usuário não encontrado');
      });
  };
  
return (
    <>
      {loggedIn ? (
        <NavBar>
          {users.data.priority === '2' ? <NavbarPriority /> : <NavbarNoPriority />}
        </NavBar>
      ) : (
        <Container>
        <LoginFormContainer>
        <Img src={homeIcon} alt="Home" />
        <Text>Condon</Text>
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <FormInput
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
            />
            <Button type="submit">Acessar</Button>
            <Linked><StyledLink to="/form">Cadastro de Usuário</StyledLink></Linked>
          </Form>
          <p>{error}</p>
        </LoginFormContainer>
        </Container>
      )}
      </>
  );
}
export default Home;