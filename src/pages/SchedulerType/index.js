import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavbarNoPriority from '../../components/NavBar/NavBarNoPriority';
import { CenteredCalendar, DateDisplay, Container, StyledCalendar, CustomLabel, FormInput, CustomSelect, CustomOption, Form, Button } from './SchedulerStyle';
import getAllEnterpriseId from '../../components/services/api-scheduler/GetSchedulerEnterpriseAll';
import getSchedulerReserve from '../../components/services/api-scheduler/GetSchedulerReserve';
import getScheduler from '../../components/services/api-scheduler/GetScheduler';
import sendScheduler from '../../components/services/api-scheduler/PostScheduler';
import { useParams } from 'react-router-dom';
import getSchedulerEnterprise from '../../components/services/api-scheduler/GetSchedulerEnterprise';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const SchedulerType = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [type, setType] = useState([]);
  const [idEnterprise, setEnterprise] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [nome, setNome] = useState('');
  const [apartament, setApartament] = useState('');
  const [bloc, setBloc] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [schedulerEnterprise, setSchedulerEnterprise] = useState([]);
  const [dateReserveArray, setDateReserveArray] = useState([]);
  const [scheduler_type, setSchedulerType] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setFormattedDate(formatDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEnterprise(parsedUser.data.id_enterprise);
      setUserId(parsedUser.data.id);
      setNome(parsedUser.data.usuario);
      setApartament(parsedUser.data.apartament);
      setBloc(parsedUser.data.bloc);
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id_enterprise: idEnterprise,
      user_id: userId,
      nome: nome,
      apartament: apartament,
      bloc: bloc,
      date_reserve: formattedDate,
      space: scheduler_type
    };

    sendScheduler(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  useEffect(() => {
    // Recuperar dateReserveArray do localStorage
    const storedDateReserveArray = localStorage.getItem('dateReserveArray');
    if (storedDateReserveArray) {
      setDateReserveArray(JSON.parse(storedDateReserveArray));
    }
  }, []);

  useEffect(() => {
    const fetchSchedulerReserve = async () => {
      try {
        const response = await getSchedulerReserve(idEnterprise, scheduler_type);
        const reserveDates = response.data.data.map((item) => item.date_reserve);
        setDateReserveArray(reserveDates);

        // Armazenar dateReserveArray no localStorage
        localStorage.setItem('dateReserveArray', JSON.stringify(reserveDates));
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados:', error);
      }
    };

    if (idEnterprise) {
      fetchSchedulerReserve();
    }
  }, [idEnterprise, scheduler_type]);

  useEffect(() => {
    const fetchSchedulerId = async () => {
      try {
        const response = await getSchedulerEnterprise(id);
        const schedulerType = response.data.data[0].type;
        setSchedulerType(schedulerType);
        // Preenchendo os campos de input com os valores do usuário
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchSchedulerId();
  }, [id]);

  const isDateReserved = ({ date }) => {
    const formattedDate = formatDate(date);
    return dateReserveArray.includes(formattedDate);
  };

  return (
    <Container>
      <NavbarNoPriority />
      <Form onSubmit={handleSubmit}>
        <DateDisplay>
          <CustomLabel>Espaço para Reserva</CustomLabel>
          <StyledCalendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={isDateReserved}
          />
          <div>Data selecionada: {formattedDate}</div>
          {console.log(dateReserveArray)}
        </DateDisplay>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default SchedulerType;
