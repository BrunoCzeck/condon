import React, { useState, useEffect } from 'react';
import sendUserData from '../../components/services/api-users/PostUser';
import Notification from '../../components/Notification';
import getDataEnterprise from '../../components/services/api-enterprise/GetEnterprises';
import {Container, Form, FormInput, Button, CustomOption, CustomSelect, Text, Img, ButtonBack} from './UsersStyle'
import homeIcon from '../../img/2.svg';


function FormUsers() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [apartament, setApartament] = useState('');
  const [bloc, setBloco] = useState('');
  const [email, setEmail] = useState('');
  const [id_enterprise, setEnterprise] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getDataEnterprise()
      .then((response) => {
        setEnterpriseOptions(response.data.data);
      })
      .catch((error) => {
        setError('Erro ao cadastrar usuário. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };

    fetchEnterpriseData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, apartament, bloc, email, id_enterprise };

    sendUserData(data)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setError('Erro ao cadastrar usuário. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };
  
  const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };


  return (
    <>
    <ButtonBack onClick={handleGoBack}>Voltar</ButtonBack>
    <Container>
    {users ? (
    <Notification/>
    ) : (
      <Container>
        <Form onSubmit={handleSubmit}>
        <p>{error}</p>
        <Img src={homeIcon} alt="Home" />
        <Text>Condon</Text>
        <FormInput placeholder="Usuário" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        <FormInput placeholder="Senha" type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <FormInput placeholder="Apartamento" type="text" value={apartament} onChange={(e) => setApartament(e.target.value)}/>
        <FormInput placeholder="Bloco" type="text" value={bloc} onChange={(e) => setBloco(e.target.value)}/>
        <FormInput placeholder="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <CustomSelect value={id_enterprise} onChange={(e) => setEnterprise(e.target.value)}>
            <CustomOption value="">Selecione um Condomínio</CustomOption>
              {Array.isArray(enterpriseOptions) &&
              enterpriseOptions.map((enterprise) => (
            <CustomOption key={enterprise.id_enterprise} value={enterprise.id_enterprise}>
            {enterprise.name}
            </CustomOption>
            ))}
        </CustomSelect>
            <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
   
      )}
    </Container>
    </>
  );
}

export default FormUsers;