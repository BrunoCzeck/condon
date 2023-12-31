import React, { useState, useEffect } from 'react';
import getScheduler from '../../components/services/api-scheduler/GetScheduler';
import { Table, Tabletbody, Tablethead, TableTh, TableTd, TableTr, Button, Header, H1, Body, ButtonEdit, Logo} from './style';
import {Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import sendScheduler from '../../components/services/api-scheduler/PostScheduler';
import editUser from '../../img/edit.svg';
import { Link } from 'react-router-dom';
import getSchedulerEnterprise from '../../components/services/api-scheduler/GetSchedulerEnterprise';


function PageScheduler() {
  const [error, setError] = useState('');
  const [schedulerData, setSchedulerData] = useState([]);
  const [idScheduler, setIdScheduler] = useState([]); 
  const [show, setShow] = useState(false);
  const [selectedHours, setSelectedHours] = useState([]); // Estado para armazenar os horários selecionados
  const [tipo, setTipo] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!!storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdScheduler(parsedUser.data.id_enterprise);
    }
  }, []);

  useEffect(() => {
    if (idScheduler.length > 0) {
      getScheduler(idScheduler)
        .then((response) => {
          setSchedulerData(response.data.data);
        })
        .catch((error) => {
          setError('Erro ao consultar usuários. Favor verificar as informações.');
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    }
  }, [idScheduler]);

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

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        id_enterprise: idScheduler,
        tipo,
        hours: selectedHours
      };

      sendScheduler(data)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    };

return (
    <Body>
      <Header>
        <H1>Espaços</H1>
        <Button variant="primary" onClick={handleShow}>Cadastrar Espaço</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Espaço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nome do Espaço</Form.Label>
              <Form.Control type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder='Nome do Espaço' />
              <Form.Text className="text-muted">
                Espaço do condomínio
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {[...Array(Math.ceil(horarios.length / 3))].map((_, columnIndex) => (
                  <div key={columnIndex} style={{ flex: '0 0 5%', textAlign: 'center' }}>
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
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Cadastrar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      </Header>
        <Table>
          <Tablethead>
            <TableTr>
              <TableTh>Espaços do Condomínio</TableTh>
              <TableTh>Horário de Funcionamento</TableTh>
              <TableTh>Editar</TableTh>
            </TableTr>
          </Tablethead>
          <Tabletbody>
            {schedulerData.map((scheduler) => (
            <TableTr key={scheduler.id_enterprise}>
              <TableTd>{scheduler.type}</TableTd>
              <TableTd>{scheduler.hours.hours[0] + ' As ' + scheduler.hours.hours[scheduler.hours.hours.length - 1]}</TableTd>
              <TableTd>
              <Link to={`/edit_scheduler/${scheduler.id_scheduler}`}> 
              <ButtonEdit  onClick={() => getSchedulerEnterprise(scheduler.id_scheduler)}>
                <Logo src={editUser} alt="Editar"/>
              </ButtonEdit>
              </Link>
              </TableTd>
             {/*  <Button variant="primary" onClick={handleShow}>Cadastrar Espaço</Button> */}
            </TableTr>
            ))}
          </Tabletbody>
        </Table>
    </Body>
  );
}

export default PageScheduler;