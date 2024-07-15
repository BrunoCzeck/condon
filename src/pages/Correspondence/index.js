import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form } from 'react-bootstrap';
import getCorrespondence from '../../services/api-correspondence/GetCorrespondence';
import getCorrespondenceTypeId from '../../services/api-correspondence/api-correspondence-type/GetCorrespondenceIdType';
import getUserEnterprise from '../../services/api-users/GetUserEnterprise';
import sendDataCorrespondence from '../../services/api-correspondence/PostCorrespondence';
import Row from 'react-bootstrap/Row';
import {CardContainer, CardTitle, CardText, Button, Container, ButtonAddPost, Logo, ButtonModal} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import postSvg from '../../img/8.svg';
import { format } from 'date-fns';
import moment from 'moment-timezone';


const Posts = () => {
  const [correspondence, setCorrespondence] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [users, setUserEnterprise] = useState([]);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ apartament: '', bloc: '', id: '' });
  const [selectedResponsavel, setSelectedResponsavel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [correspondenceTypes, setCorrespondeTypes] = useState([]);
  const [dateCorrespondence, setDateCorrespondence] = useState(''); // Novo estado para armazenar a data da retirada

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
      const fetchCorrespondenceUsers = async () => {
        try {
          const response = await getCorrespondence(idEnterprise);
          setCorrespondence(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchCorrespondenceUsers(idEnterprise);
    }, [idEnterprise]);

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
      const fetchCorrespondenceIdType = async () => {
        try {
          const response = await getCorrespondenceTypeId(idEnterprise);
          setCorrespondeTypes(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchCorrespondenceIdType(idEnterprise);
    }, [idEnterprise]);
    


  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  // Aqui você pode implementar a lógica para enviar o post, etc.
  const handleCreatePost = (event) => {
      event.preventDefault();

      //const formattedDate = dateCorrespondence ? format(new Date(dateCorrespondence), 'dd/MM/yyyy') : '';
      
      const formattedDate = dateCorrespondence
      ? moment(dateCorrespondence).tz('America/Sao_Paulo').format('DD/MM/YYYY')
      : '';

      const data = { 
        user_id:selectedUser.id,
        nome: selectedResponsavel,
        apartament: selectedUser.apartament,
        bloc: selectedUser.bloc,
        tipo: selectedType,
        date_correspondence: formattedDate,
        id_enterprise: idEnterprise
      };
      
      sendDataCorrespondence(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    
    setShowModal(false);
    //window.location.reload() // Recarrega a pagina apos o cadastro do posts.
   };

   const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };

  return (
    <Container className="d-flex p-0">
      {priority === "2" ? <NavbarPriority/> : <NavBarNoPriority/>}
      <Row className="d-flex g-0 p-4">
      {correspondence.map((option, index) => (
          <CardContainer>
            <Card.Subtitle className="mb-2 text-muted">Apartamento: {option.apartament}</Card.Subtitle>
            <CardTitle>Responsável pela retirada: {option.nome}</CardTitle>
            <CardText>
              Bloco: {option.bloc}
            </CardText>
            <CardText>
              Tipo do Pacote: {option.tipo}
            </CardText>
            <CardText>
              Data Retirada: {option.date_correspondence}
              {console.log(users)}
            </CardText>
          </CardContainer>
      ))}

      {/* Modal para criar post */}
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
              <Form.Label>Résponsavel pela Retirada</Form.Label>
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
                <Form.Label>Selecione o Tipo do Pacote</Form.Label>
                <Form.Select value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Default select example">
                  {correspondenceTypes.map((type, index) => (
                    <option key={index} value={type.nome}>
                      {type.nome}
                    </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Label htmlFor="inputPassword5">Data da Retirada</Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={dateCorrespondence}
                onChange={(e) => setDateCorrespondence(e.target.value)}
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
      <Button onClick={handleCreatePostClick}>
        <Logo src={postSvg} alt="Adicionar Novo Post"/>
      </Button> 
      {/* {priority === "2" ? <Button onClick={handleCreatePostClick}>Criar Post</Button> : ''} */}
    </Container>
  );
};
export default Posts;