import React, { useState, useEffect } from 'react';
import getScheduler from '../../components/services/api-scheduler/GetScheduler';
import { Table, Tabletbody, Tablethead, TableTh, TableTd, TableTr, Button, Header, H1, Body, ButtonEdit, Logo, ButtonModal} from './style';
import {Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import sendScheduler from '../../components/services/api-scheduler/PostScheduler';
import editUser from '../../img/edit.svg';
import { Link } from 'react-router-dom';
import getCorrespondenceTypeId from '../../components/services/api-correspondence/api-correspondence-type/GetCorrespondenceIdType';
import sendDataCorrespondenceType from '../../components/services/api-correspondence/api-correspondence-type/PostCorrespondenceType';



function PageScheduler() {
  const [type, setTypeCorrespondence] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
      const fetchCorrespondenceType = async () => {
        try {
          const response = await getCorrespondenceTypeId(idEnterprise);
          setTypeCorrespondence(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchCorrespondenceType();
    }, [idEnterprise]);

  const handleCreatePostClick = () => {
    setShowModal(true);
  };


  // Aqui você pode implementar a lógica para enviar o post, etc.
  const handleCreatePost = (event) => {
      event.preventDefault();
  
      const data = { id_enterprise:idEnterprise, nome: nome };

      sendDataCorrespondenceType(data)
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
    <Body>
      <Header>
        <H1>Tipo de pacote</H1>
        <Button variant="primary" onClick={handleShow}>Cadastrar Tipo de Pacote</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar de Pacote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Aqui você pode adicionar o formulário ou o conteúdo para criar o post */}
            <Form.Group controlId="formPostDescription">
                <Form.Label>Tipo do Pacote</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Digite o Tipo do Pacote"
                  type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <ButtonModal variant="primary" onClick={handleCreatePost}>
              Criar
            </ButtonModal>
          </Modal.Footer>
        </Modal>
      </Header>
        <Table>
          <Tablethead>
            <TableTr>
              <TableTh>Tipo de Pacote</TableTh>
            </TableTr>
          </Tablethead>
          <Tabletbody>
            {type.map((option, index) => (
            <TableTr key={option.nome}>
              <TableTd>{option.nome}</TableTd>
            {console.log(type)}
            </TableTr>
            ))}
          </Tabletbody>
        </Table>
    </Body>
  );
}

export default PageScheduler;