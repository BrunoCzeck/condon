import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getVotingUsers from '../../../services/api-voting/GetVotingUsers';
import updateVoting from '../../../services/api-voting/PutVoting';
import {Container, Form, FormInput, Button, CustomLabel, CustomSubLabel, Img, Text, ContainerButton, ContainerImagem } from './AvisoStyle'
import homeIcon from '../../../img/2.svg';
import NavbarPriority from '../../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../../components/NavBar/NavBarNoPriority';
import moment from 'moment-timezone';
import { InputGroup  } from 'react-bootstrap';

const EditVoting = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [votacao_change, setChangeVoting] = useState('');
  const [date_init, setDateInit] = useState('');
  const [date_end, setDateEnd] = useState('');
  const [option_1, setOption1] = useState('');
  const [option_2, setOption2] = useState('');
  const [option_3, setOption3] = useState('');
  const [option_4, setOption4] = useState('');
  const [option_5, setOption5] = useState('');
  const [option_6, setOption6] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getVotingUsers(id); 
        const { title, description, votacao_change, date_init, date_end, option_1, option_2, option_3, option_4, option_5, option_6 } = response.data.data;
        setTitle(title);
        setDescription(description);
        setChangeVoting(votacao_change);
        setDateInit(moment(date_init, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        setDateEnd(moment(date_end, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        setOption1(option_1);
        setOption2(option_2);
        setOption3(option_3);
        setOption4(option_4);
        setOption5(option_5);
        setOption6(option_6);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [id]);
  
  const handleCheckboxChange = () => {
    const newVotacaoChange = votacao_change === 1 ? 0 : 1;
    setChangeVoting(newVotacaoChange);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    
    const formattedDateInit = moment(date_init, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const formattedDateEnd = moment(date_end, 'YYYY-MM-DD').format('YYYY-MM-DD');
  
    const data = { 
      title: title, 
      description: description, 
      votacao_change: votacao_change, 
      date_init: formattedDateInit, 
      date_end: formattedDateEnd, 
      option_1: option_1, 
      option_2: option_2, 
      option_3: option_3,
      option_4: option_4, 
      option_5: option_5, 
      option_6: option_6
    };
  
    updateVoting(id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });  
  };

  return (
    <>
      <Container>
        <NavbarPriority/>
        <Form onSubmit={handleEdit}>
          <ContainerImagem>
            <Img src={homeIcon} alt="Home" />
            <Text>Condon</Text>
          </ContainerImagem>
          <CustomLabel>Titulo</CustomLabel>
          <FormInput 
            placeholder="Titulo"
            type="text" 
            name="titulo" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <CustomLabel>Descrição</CustomLabel>
          <FormInput 
            placeholder="Descrição" 
            type="text" 
            name="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Permitir Alterar Votação</InputGroup.Text>
            <InputGroup.Checkbox
              type="checkbox"
              aria-label="Checkbox for following text input"
              checked={votacao_change === 1 ? true : false}
              onChange={handleCheckboxChange}
            />
            {console.log(votacao_change)}
          </InputGroup>
          <CustomLabel htmlFor="inputDateStart">Data Inicio</CustomLabel>
          <FormInput
            type="date"
            id="inputDateStart"
            aria-describedby="dateStartHelpBlock"
            value={date_init}
            onChange={(e) => setDateInit(e.target.value)}
          />
          <CustomLabel htmlFor="inputDateEnd">Data Fim</CustomLabel>
          <FormInput
            type="date"
            id="inputDateEnd"
            aria-describedby="dateEndHelpBlock"
            value={date_end}
            onChange={(e) => setDateEnd(e.target.value)}
          />
            <CustomLabel>Opção 1</CustomLabel>
          <FormInput 
          placeholder="Opção 1" 
          type="text"
          name="option_1"
          value={option_1} 
          onChange={(e) => setOption1(e.target.value)} 
          />
          <CustomLabel>Opção 2</CustomLabel>
          <FormInput 
          placeholder="Opção 2" 
          type="text"
          name="option_2"
          value={option_2}
          onChange={(e) => setOption2(e.target.value)} 
          />
          <CustomLabel>Opção 3</CustomLabel>
          <FormInput 
          placeholder="Opção 3" 
          type="text"
          name="option_1"
          value={option_3} 
          onChange={(e) => setOption3(e.target.value)} 
          />
          <CustomLabel>Opção 4</CustomLabel>
          <FormInput 
          placeholder="Opção 4" 
          type="text"
          name="option_4"
          value={option_4} 
          onChange={(e) => setOption4(e.target.value)} 
          />
          <CustomLabel>Opção 5</CustomLabel>
          <FormInput 
          placeholder="Opção 5" 
          type="text"
          name="option_5"
          value={option_5} 
          onChange={(e) => setOption5(e.target.value)} 
          />
          <CustomLabel>Opção 6</CustomLabel>
          <FormInput 
          placeholder="Opção 6" 
          type="text"
          name="option_6"
          value={option_6} 
          onChange={(e) => setOption6(e.target.value)} 
          />
          <ContainerButton>
            <Button type="submit">Alterar</Button>
          </ContainerButton>
        </Form>
      </Container>
    </>
  );
};

export default EditVoting;