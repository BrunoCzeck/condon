import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getSchedulerEnterprise from '../../components/services/api-scheduler/GetSchedulerEnterprise';
import putScheduler from '../../components/services/api-scheduler/PutScheduler';
import { Form, InputGroup } from 'react-bootstrap';
import {
  Container,
  FormInput,
  Button,
  CustomLabel,
  CustomSubLabel,
  Img,
  Body,
  NavBar,
  Text,
  ContainerButton,
  ContainerImagem,
  ContainerPrincipal,
  CampoInputs,
  CampoHours,
  Formulario
 } from './EditStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavbarNoPriority from '../../components/NavBar/NavBarNoPriority';

function EditUser() {
  const { id } = useParams();
  const [hours, setHours] = useState([]);
  const [result, setSchedulerData] = useState([]);
  const [type, setSchedulerType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [priority, setPriority] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]); // Estado para armazenar os horários selecionados

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);      
      setPriority(parsedUser.data.priority);
      setLoggedIn(true);
    }
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSchedulerEnterprise(id); 
        const schedulerData = response.data;
        const schedulerHours = response.data.data[0].hours.hours;
        const schedulerType = response.data.data[0].type;
        setSchedulerData(schedulerData);
        setHours(schedulerHours)
        setSchedulerType(schedulerType);
        // Preenchendo os campos de input com os valores do usuário
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { hours:selectedHours };

    putScheduler(id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

    const horarios = [
    '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
    
    const handleHourSelection = (horario) => {
      // Verifica se o horário já está no array de horários selecionados
      const isSelected = selectedHours.includes(horario);
  
      // Se estiver selecionado, remove da lista, senão adiciona
      if (isSelected) {
        const updatedHours = selectedHours.filter((hour) => hour !== horario);
        setSelectedHours(updatedHours);
      } else {
        setSelectedHours([...selectedHours, horario]);
      }
    };

  return (
    <Body>
        <NavBar>
        {priority === '2' ? <NavbarPriority /> : <NavbarNoPriority />}
        </NavBar>
        <Formulario onSubmit={handleSubmit}>
        <Form.Label>Nome do Espaço</Form.Label>
        <Form.Control type="text" value={type} onChange={(e) => setSchedulerType(e.target.value)} placeholder='Nome do Espaço' disabled/>
        <Form.Label>Horários Antigos</Form.Label>
        <Form.Group controlId="formBasicCheckbox">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {[...Array(Math.ceil(horarios.length / 3))].map((_, columnIndex) => (
          <div key={columnIndex} style={{ flex: '0 0 5%'}}>
            {hours.slice(columnIndex * 3, columnIndex * 3 + 3).map((hours, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <Form.Label>{hours}</Form.Label>
                <InputGroup>
                  <InputGroup.Checkbox
                    aria-label={`Checkbox for ${hours}`}
                    label={hours}
                    checked={true}
                  />
                </InputGroup>
              </div>
            ))}
          </div>
        ))}
        </div>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Selecione os Novos Horários</Form.Label>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[...Array(Math.ceil(horarios.length / 3))].map((_, columnIndex) => (
            <div key={columnIndex} style={{ flex: '0 0 5%'}}>
              {horarios.slice(columnIndex * 3, columnIndex * 3 + 3).map((horario, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <Form.Label>{horario}</Form.Label>
                  <InputGroup>
                    <InputGroup.Checkbox
                      aria-label={`Checkbox for ${horario}`}
                      label={horario}
                      checked={selectedHours.includes(horario)}
                      onChange={() => handleHourSelection(horario)}
                    />
                  </InputGroup>
                </div>
              ))}
            </div>
          ))}
        </div>
        </Form.Group>
              {console.log(selectedHours)}
          <Button type="submit">
            Cadastrar
          </Button>
      </Formulario>
    </Body>
  );
}

export default EditUser;