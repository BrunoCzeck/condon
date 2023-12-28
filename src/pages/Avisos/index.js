import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form } from 'react-bootstrap';
import getAvisos from '../../components/services/api-mural/GetAvisos';
import sendPosts from '../../components/services/api-mural/PostMural'
import Row from 'react-bootstrap/Row';
import {CardContainer, CardTitle, CardText, Button, Container, ButtonAddPost, Logo, ButtonModal} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import postSvg from '../../img/8.svg';

const Posts = () => {
  const [enterpriseOptions, setAvisos] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEnterprise(parsedUser.data.id_enterprise);
      setUsers(parsedUser.data.id);
      setPriority(parsedUser.data.priority);

      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (idEnterprise) {
      const fetchEnterpriseData = async () => {
        try {
          const response = await getAvisos(idEnterprise);
          setAvisos(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchEnterpriseData();
    }
  }, [idEnterprise]);

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  // Aqui você pode implementar a lógica para enviar o post, etc.
  const handleCreatePost = (event) => {
      event.preventDefault();
  
      const data = { title, description, user_id:idUsers, id_enterprise:idEnterprise };
      sendPosts(data)
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

  return (
    <Container className="d-flex p-0">
      {priority === "2" ? <NavbarPriority/> : <NavBarNoPriority/>}
      <Row className="d-flex g-0 p-4">
      {enterpriseOptions.map((option, index) => (
          <CardContainer>
            <CardTitle>{option.title}</CardTitle>
            <Card.Subtitle className="mb-2 text-muted">Descrição</Card.Subtitle>
            <CardText>
              {option.description}
            </CardText>
          </CardContainer>
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
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite a descrição do post"
                  type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
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

export default Posts;