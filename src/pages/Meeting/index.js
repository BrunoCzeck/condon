import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';
import getMeeting from '../../components/services/api-meeting/GetMeeting';
import sendMeeting from '../../components/services/api-meeting/PostMeeting'
import Row from 'react-bootstrap/Row';
import {CardContainer, CardTitle, CardText, Container, ButtonAddPost, Logo, ButtonModal} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import postSvg from '../../img/8.svg';
import moment from 'moment-timezone';


const Meeting = () => {
  const [meeting, setMeeting] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [dataMeeting, setData] = useState(''); // Novo estado para armazenar a data da retirada

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEnterprise(parsedUser.data.id_enterprise);
      setPriority(parsedUser.data.priority);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (idEnterprise) {
      const fetchMeetingData = async () => {
        try {
          const response = await getMeeting(idEnterprise);
          setMeeting(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchMeetingData();
    }
  }, [idEnterprise]);

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  // Aqui você pode implementar a lógica para enviar o post, etc.
  const handleCreatePost = (event) => {
      event.preventDefault();

      const formattedDate = dataMeeting
      ? moment(dataMeeting).tz('America/Sao_Paulo').format('DD/MM/YYYY')
      : '';

      const data = { title, link, date_meeting:formattedDate, id_enterprise:idEnterprise };
      sendMeeting(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    
    setShowModal(false);
    window.location.reload() // Recarrega a pagina apos o cadastro do posts.
   };

   const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };
  const handleAcessarClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <Container className="d-flex p-0">
      {priority === "2" ? <NavbarPriority/> : <NavBarNoPriority/>}
      <Row className="d-flex g-0 p-4">
      {meeting.map((option, index) => (
          <Card className="m-1">
          <Card.Header as="h5">Reunião</Card.Header>
          <Card.Body>
            <Card.Title>Titulo:{option.title}</Card.Title>
            <Card.Text>
              Link para Acessar Reunião: {option.link}
            </Card.Text>
            <Card.Text>
              Data da Reunião: {option.date_meeting}
            </Card.Text>
            <Button variant="primary" onClick={() => handleAcessarClick(option.link)}>Acessar</Button>
          </Card.Body>
        </Card>
      ))}

      {/* Modal para criar post */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Aqui você pode adicionar o formulário ou o conteúdo para criar o post */}
            <Form.Group controlId="formPostDescription">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Digite o titulo"
                  type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPostDescription">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Digite a descrição do post"
                  type="text" name="link" value={link} onChange={(e) => setLink(e.target.value)}
                />
              </Form.Group>
              <Form.Label htmlFor="inputPassword5">Data da Reunião</Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={dataMeeting}
                onChange={(e) => setData(e.target.value)}
              />
          </Modal.Body>
          <Modal.Footer>
            <ButtonModal variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </ButtonModal>
            <ButtonModal variant="primary" onClick={handleCreatePost}>
              Criar
            </ButtonModal>
          </Modal.Footer>
        </Modal>
      </Row>
      {priority === "2" ?
      <Button onClick={handleCreatePostClick}>
        <Logo src={postSvg} alt="Adicionar Novo Post"/>
      </Button> : ''}
      {/* {priority === "2" ? <Button onClick={handleCreatePostClick}>Criar Post</Button> : ''} */}
    </Container>
  );
};

export default Meeting;