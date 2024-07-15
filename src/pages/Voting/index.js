import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button, InputGroup  } from 'react-bootstrap';
import getEnterpriseVoting from '../../services/api-voting/GetVotingEnterprise';
import sendVoting from '../../services/api-voting/PostVoting'
import deleteVoting from '../../services/api-voting/DeleteVoting'
import Row from 'react-bootstrap/Row';
import {CardContainer, CardTitle, CardText, Container, ButtonAddPost, Logo, ButtonModal} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import postSvg from '../../img/8.svg';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';


const Voting = () => {
  const [voting, setVotingEnterprise] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [option_1, setOption1] = useState('');
  const [option_2, setOption2] = useState('');  
  const [option_3, setOption3] = useState('');  
  const [option_4, setOption4] = useState('');  
  const [option_5, setOption5] = useState('');  
  const [option_6, setOption6] = useState('');  
  const [description, setDescription] = useState('');
  const [dataVotingInit, setDataInit] = useState(''); // Novo estado para armazenar a data da retirada
  const [dataVotingEnd, setDataEnd] = useState(''); // Novo estado para armazenar a data da retirada
  const [votacao_change, setChangeVoting] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [id_voting, setIdVoting] = useState([]);

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
      const fetchVotingEnterpriseData = async () => {
        try {
          const response = await getEnterpriseVoting(idEnterprise);
          setVotingEnterprise(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchVotingEnterpriseData();
    }
  }, [idEnterprise]);

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  const handleEditClick = () => {
    // Aqui você pode adicionar a lógica para preencher os campos do modal de edição com os dados do item selecionado
    // Por enquanto, apenas mostrando o modal de edição
    setShowModal(true);
  };

  const handleCreateVoting = (event) => {
      event.preventDefault();

      const formattedDateInit = dataVotingInit
      ? moment(dataVotingInit).tz('America/Sao_Paulo').format('DD/MM/YYYY')
      : '';

      const formattedDateEnd = dataVotingEnd
      ? moment(dataVotingEnd).tz('America/Sao_Paulo').format('DD/MM/YYYY')
      : '';

        const data = { 
        id_enterprise:idEnterprise, 
        title, 
        description, 
        votacao_change: isChecked, 
        date_init: formattedDateInit, 
        date_end: formattedDateEnd, 
        option_1, 
        option_2, 
        option_3,
        option_4, 
        option_5, 
        option_6
      };
      sendVoting(data)
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
  const handleAcessarClick = (link) => {
    window.open(link, '_blank');
  };

  const handleDeletarVoting = (id_voting) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este usuário?');

    if (confirmDelete) {
      // Chama a função passando o id e deletando o usuário
      window.location.reload(); // Recarrega a pagina apos deletar
      deleteVoting(id_voting);
    }
  };

  return (
    <Container className="d-flex p-0">
      {priority === "2" ? <NavbarPriority/> : <NavBarNoPriority/>}
      <Row className="d-flex g-0 p-4">
      {voting.map((option, index) => (
          <Card className="m-1">
          <Card.Header as="h5"> </Card.Header>
          <Card.Body>
            <Card.Title>Titulo:{option.title}</Card.Title>
            <Card.Text>
              Descrição: {option.description}
            </Card.Text>
            <Card.Text>
              Data de Inicio: {option.date_init}
            </Card.Text>
            <Card.Text>
              Data de Encerramento: {option.date_end}
            </Card.Text>
            <Link to={`/voting/view/${option.id_voting}`}>
              <Button>
                Votação
              </Button>
            </Link>
            <Link to={`/voting/${option.id_voting}`}>
              <Button>
                Alterar
              </Button>
            </Link>
            <Link to={`/voting`}>
              <Button onClick={() => handleDeletarVoting(option.id_voting)}>
                Deletar
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}

      {/* Modal para criar post */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Votação</Modal.Title>
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
              <Form.Label htmlFor="inputPassword5">Data Inicio</Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={dataVotingInit}
                onChange={(e) => setDataInit(e.target.value)}
              />
              <Form.Label htmlFor="inputPassword5">Data Fim</Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={dataVotingEnd}
                onChange={(e) => setDataEnd(e.target.value)}
              />
              <InputGroup className="mb-3 mt-3">
                <InputGroup.Checkbox
                  aria-label="Checkbox for following text input"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <Form.Control
                  aria-label="Text input with checkbox"
                  placeholder="Permitir Alterar Voto Durante a Votação"
                  disabled={!isChecked} // desabilita o campo de entrada se o checkbox não estiver marcado
                  name="votacao_change"
                  value={votacao_change}
                  onChange={(e) => setChangeVoting(e.target.value)}
                />
                {console.log(id_voting)}
              </InputGroup>
              <Form.Text id="passwordHelpBlock" muted>
                Cadastre a quantidade de opções que você gostaria na votação 
              </Form.Text>
              <Form.Group controlId="formPostDescription">
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 1"
                type="text" name="option_1" value={option_1} onChange={(e) => setOption1(e.target.value)}
                />
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 2"
                type="text" name="option_2" value={option_2} onChange={(e) => setOption2(e.target.value)}
                />
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 3"
                type="text" name="option_3" value={option_3} onChange={(e) => setOption3(e.target.value)}
                />
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 4"
                type="text" name="option_4" value={option_4} onChange={(e) => setOption4(e.target.value)}
                />
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 5"
                type="text" name="option_5" value={option_5} onChange={(e) => setOption5(e.target.value)}
                />
                <Form.Control
                className="mt-1"
                as="textarea"
                rows={1}
                placeholder="Opção 6"
                type="text" name="option_6" value={option_6} onChange={(e) => setOption6(e.target.value)}
                />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <ButtonModal variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </ButtonModal>
          <ButtonModal variant="primary" onClick={handleCreateVoting}>
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

export default Voting;
