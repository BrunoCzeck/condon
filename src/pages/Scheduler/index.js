import React, { useState, useEffect  } from 'react';
import NavbarNoPriority from '../../components/NavBar/NavBarNoPriority';
import { CenteredCalendar, DateDisplay, Container, StyledCalendar, CustomLabel, FormInput,CustomSelect, CustomOption, Form, Button, CardContainer, CardTitle } from './SchedulerStyle';
import getScheduler from '../../services/api-scheduler/GetScheduler';
import { Link } from 'react-router-dom';

const Scheduler = () => {
  
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('')
  const [nome, setNome] = useState('')
  const [apartament, setApartament] = useState('')
  const [bloc, setBloc] = useState('')
  const [id_scheduler, setSchedulerId] = useState([]);

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

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getScheduler(idEnterprise)
      .then((response) => {
        setEnterpriseOptions(response.data.data);
        const scheduler = enterpriseOptions.map((item) => item.id_scheduler); // Pega as datas da reserva.
        setSchedulerId(scheduler);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };
    fetchEnterpriseData();
  }, [idEnterprise]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
    <NavbarNoPriority />
      <Form onSubmit={handleSubmit}>
        {enterpriseOptions.map((option, index) => (
          <CardContainer>
              <CardTitle>{option.type}</CardTitle>
              {/* <Card.Subtitle className="mb-2 text-muted">{`Horário de Funcionamento:Segunda-Feira a Sexta-Feira:` + option.hours.hours }</Card.Subtitle> */}
              <Link to={`/scheduler/${option.id_scheduler}`}>
                <Button>
                      Reservar
                </Button>
              </Link>
          </CardContainer>
        ))}
      </Form>
    </Container>
  );
};

export default Scheduler;