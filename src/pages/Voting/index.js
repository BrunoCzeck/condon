import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Row} from 'react-bootstrap';
import getCorrespondence from '../../components/services/api-correspondence/GetCorrespondence';
import getCorrespondenceTypeId from '../../components/services/api-correspondence/api-correspondence-type/GetCorrespondenceIdType';
import getUserEnterprise from '../../components/services/api-users/GetUserEnterprise';
import getChatEnterpriseId from '../../components/services/api-chat/GetChatEnterprise';
import sendDataChat from '../../components/services/api-chat/PostChat';
import {CardContainer, CardTitle, CardText, Button, Container, ButtonAddPost, Logo, ButtonModal, TableMr} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import postSvg from '../../img/8.svg';
import { Link } from 'react-router-dom';
import getChat from '../../components/services/api-chat/GetChat';
import putSendDataChat from '../../components/services/api-chat/PutChat';

const ChatSection = ({ userId }) => {
  const [chatData, setChatData] = useState({});
  const [user_id, setChatDataId] = useState({});
  const [user_id_send_message, setChatSendIdMessage] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await getChat(userId); // Substitua pelo seu serviço real
        setChatData(response.data);
        setChatDataId(response.data.user_id);
        setChatSendIdMessage(response.data.chat[0].user_id_send_message);
      } catch (error) {
        console.error('Erro ao obter dados do chat:', error);
      }
    };

    fetchChatData();
  }, [userId]);

  const handleCreateMessage = (event) => {
    event.preventDefault();

    const data = { 
      chat:[
        {
          user_id:user_id,
          user_id_send_message:user_id_send_message, 
          description: description     
        }
      ]
    };

    putSendDataChat(user_id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  return (
  <div>
    <TableMr>
      <tbody>
        {chatData.chat &&
          chatData.chat.map((message, index) => (
            <tr key={index}>
              <td style={{ marginBottom: '10px' }}>
                {message.user_id_send_message === user_id ? (
                  <div
                    style={{
                      border: '2px solid #dedede',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '5px',
                      padding: '10px',
                      margin: '10px 0',
                      textAlign: 'right',
                      color: '#999',
                    }}
                  >
                    <p>{message.description}</p>
                    <p>{message.date_message}</p>
                  </div>
                ) : (
                  <div
                    style={{
                      border: '2px solid #dedede',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '5px',
                      padding: '10px',
                      margin: '10px 0',
                    }}
                  >
                    <p>{message.description}</p>
                    <p>{message.date_message}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button onClick={handleCreateMessage}>Enviar</button>
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
          </td>
        </tr>
      </tfoot>
    </TableMr>
  </div>    
  );
};

const Voting = () => {
  const [idEnterprise, setEnterprise] = useState(null);
  const [users, setUserEnterprise] = useState([]);
  const [chat, setUsersChatEnterprise] = useState([]);
  const [idUsers, setUsers] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ apartament: '', bloc: '', id: '' });
  const [selectedResponsavel, setSelectedResponsavel] = useState('');
  const [selectedChatUser, setSelectedChatUser] = useState(null);

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
    const fetchUserEnterprise = async () => {
      try {
        const response = await getUserEnterprise(idEnterprise);
        setUserEnterprise(response.data.data);
      } catch (error) {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      }
    };
    fetchUserEnterprise(idEnterprise);
  }, [idEnterprise]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await getChatEnterpriseId(idEnterprise);
        setUsersChatEnterprise(response.data);
      } catch (error) {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      }
    };
    fetchChatUsers(idEnterprise);
  }, [idEnterprise]);

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  const handleCardClick = (userId) => {
    // Defina o usuário selecionado para abrir o bate-papo
    setSelectedChatUser(userId);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();

    const data = {
      user_id: selectedUser.id,
      apartament: selectedUser.apartament,
      usuario: selectedResponsavel,
      bloc: selectedUser.bloc,
      id_enterprise: idEnterprise,
      chat: [
        {
          user_id: selectedUser.id,
          user_id_send_message: idUsers,
          description: description,
        },
      ],
    };

    sendDataChat(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });

    setShowModal(false);
  };

  return (
    <Container className="d-flex p-0">
      {priority === '2' ? <NavbarPriority /> : <NavBarNoPriority />}
      <Button onClick={handleCreatePostClick}>
        <Logo src={postSvg} alt="Adicionar Novo Post" />
      </Button>
      <Row>
        {chat.map((option, index) => (
          <div style={{display: 'flex'}} key={index}>
            <Link onClick={() => handleCardClick(option.user_id)}>
              <CardContainer>
                <Card.Subtitle className="mb-2 text-muted">
                  Apartamento: {option.apartament} Bloco: {option.bloc}
                </Card.Subtitle>
                <CardTitle>Morador: {option.usuario}</CardTitle>
                <CardText>{option.description}</CardText>
                <CardText>{option.date_message}</CardText>
              </CardContainer>
            </Link>
            {selectedChatUser === option.user_id && <ChatSection userId={option.user_id} />}
          </div>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* Aqui você pode adicionar o formulário ou o conteúdo para criar o post */}
            <Form.Group controlId="formPostDescription">
              <Form.Label>Selecione o Apartamento</Form.Label>
              <Form.Select
                value={selectedUser.id}
                onChange={(e) => {
                  const selectedUserId = e.target.value;
                  const selectedUserData = users.find((user) => user.id === selectedUserId);

                  setSelectedUser({
                    apartament: selectedUserData.apartament,
                    bloc: selectedUserData.bloc,
                    id: selectedUserId,
                  });
                  setSelectedResponsavel(selectedUserData.usuario);
                }}
                aria-label="Default select example"
              >
                <option>Selecione o Apartamento</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.apartament} {user.bloc}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formPostDescription">
            <Form.Label>Morador</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Résponsavel"
              type="text"
              name="title"
              value={selectedResponsavel} // Atualiza para usar o nome do responsável
              onChange={(e) => setSelectedResponsavel(e.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="formPostDescription">
            <Form.Label>Texto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="description"
              type="text"
              name="title"
              onChange={(e) => setDescription(e.target.value)}
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
    </Container>
  );
};
export default Voting;