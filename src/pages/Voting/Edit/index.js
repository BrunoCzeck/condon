import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getVotingUsers from '../../../components/services/api-voting/GetVotingUsers';
import updateVoting from '../../../components/services/api-voting/PutVoting';
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
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getVotingUsers(id); 
        
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
        setChangeVoting(response.data.data.votacao_change);
        setDateInit(response.data.data.date_init);
        setDateEnd(response.data.data.date_end);
        setOption1(response.data.data.option_1);
        setOption2(response.data.data.option_2);
        setOption3(response.data.data.option_3);
        setOption4(response.data.data.option_4);
        setOption5(response.data.data.option_5);
        setOption6(response.data.data.option_6);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [id]);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEdit = (event) => {
  event.preventDefault();
    const formattedDateInit = date_init ? moment(date_init).tz('America/Sao_Paulo').format('DD/MM/YYYY') : '';
    const formattedDateEnd = date_end ? moment(date_end).tz('America/Sao_Paulo').format('DD/MM/YYYY') : '';
  
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
          type="text" name="description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          />
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Permitir Alterar Votação</InputGroup.Text>
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              checked={votacao_change === "1"} // Define o checkbox como marcado se votacao_change for "1"
              onChange={() => setChangeVoting(votacao_change === "1" ? "0" : "1")} // Alterna o estado de votacao_change entre "0" e "1"
            />
          </InputGroup>
          <CustomLabel htmlFor="inputDateStart">Data Inicio</CustomLabel>
          <FormInput
            type="date"
            id="inputDateStart"
            aria-describedby="dateStartHelpBlock"
            value={date_init ? moment(date_init).tz('America/Sao_Paulo').format('YYYY-MM-DD') : ''}
            onChange={(e) => setDateInit(e.target.value)}
          />
          <CustomLabel htmlFor="inputDateEnd">Data Fim</CustomLabel>
          <FormInput
            type="date"
            id="inputDateEnd"
            aria-describedby="dateEndHelpBlock"
            value={date_end ? moment(date_end).tz('America/Sao_Paulo').format('YYYY-MM-DD') : ''}
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