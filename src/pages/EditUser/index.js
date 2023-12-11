import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getUser from '../../components/services/api-users/GetUser';
import putData from '../../components/services/api-users/PutUsers';
import {Container, Form, FormInput, Button, CustomLabel, CustomSubLabel, Img, Text, ContainerButton, ContainerImagem } from './EditStyle'
import homeIcon from '../../img/2.svg';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(id); 
        const userData = response.data.data[0];
        setUser(userData);
        // Preenchendo os campos de input com os valores do usuário
        setUsuario(userData.usuario);
        setSenha(userData.senha);
        setEmail(userData.email);
        setPriority(userData.priority);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, email, priority };

    putData(id, data)
      .then((response) => {
        console.log(response.data);
      /*   setResult(response.data); */
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };

  return (
    <>
    <Button onClick={handleGoBack}>Voltar</Button>
      <Container>
        {user && (
          <Form onSubmit={handleSubmit}>
            <ContainerImagem>
            <Img src={homeIcon} alt="Home" />
            <Text>Condon</Text>
            </ContainerImagem>
            <CustomLabel>Usuario</CustomLabel>
            <FormInput 
            placeholder="Usuário"
            type="text" 
            name="usuario" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            />
            <CustomLabel>Senha</CustomLabel>
            <FormInput 
            placeholder="Senha" 
            type="text" name="senha"
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            />
            <CustomLabel>E-mail</CustomLabel>
            <FormInput 
            placeholder="E-mail" 
            type="text"
            name="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
            <CustomLabel>Tipo de Usuário</CustomLabel>
            <CustomSubLabel>Informar 1 para usuários moradores, visitantes e 2 para usuário Administrador</CustomSubLabel>
            <FormInput
            placeholder="Tipo de Usuário"
            type="text" name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)} 
            />
            <ContainerButton>
            <Button type="submit">Alterar</Button>
            </ContainerButton>
          </Form>
        )}
      </Container>
    </>
  );
}

export default EditUser;