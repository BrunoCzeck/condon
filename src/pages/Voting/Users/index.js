import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';
import getEnterpriseVoting from '../../../services/api-voting/GetVotingEnterprise';
import getVotingUser from '../../../services/api-voting/GetVotingUser';
import postVotingUser from '../../../services/api-voting/PostVotingUsers'
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const UsersVoting = () => {
  const [voting, setVotingEnterprise] = useState([]);
  const [idEnterprise, setEnterprise] = useState(null);
  const [responseLocal, setResponseLocal] = useState([]);
  const [responseUserVoting, setVotingUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dataVotingInit, setDataInit] = useState('');
  const [dataVotingEnd, setDataEnd] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedVotingId, setSelectedVotingId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEnterprise(parsedUser.data.id_enterprise);
      setResponseLocal(parsedUser.data)
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

  useEffect(() => {
    if (selectedVotingId) {
      const data = {
        user_id: responseLocal.id,
        id_voting: selectedVotingId
      }
      const fetchVotingUserData = async () => {
        try {
          const response = await getVotingUser(data);
          setVotingUser(response.data);
          handleOpenModal(selectedVotingId);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchVotingUserData();
    }
  }, [selectedVotingId]);

  const handleOpenModal = (id_voting) => {
    setShowModal(true);
    setSelectedVotingId(id_voting);
    const selectedVoting = voting.find(item => item.id_voting === id_voting);
    if (selectedVoting) {
      const optionsArray = Object.entries(selectedVoting)
        .filter(([key, value]) => key.startsWith('option_') && value && typeof value === 'string' && value.trim() !== '')
        .map(([key, value], idx) => ({
          name: key,
          value: value,
          selected: responseUserVoting[key] === 1 // Marca como selecionado se o usuário já votou nesta opção
        }));
      setOptions(optionsArray);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVotingId(null);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setOptions(prevOptions =>
      prevOptions.map((opt, idx) => ({
        ...opt,
        selected: idx === index
      }))
    );
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
      user_id: responseLocal.id,
      id_enterprise: idEnterprise,
      id_voting: selectedVotingId,
      usuario: responseLocal.usuario,
      apartament: responseLocal.apartament,
      bloc: responseLocal.bloc,
      ...options.reduce((acc, opt) => {
        acc[opt.name] = opt.selected ? "1" : "0";
        return acc;
      }, {})
    };
    postVotingUser(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });

    setShowModal(false);
  };

  return (
    <div>
      {voting.map((option, index) => (
        <Card key={index}>
          <Card.Header as="h5"></Card.Header>
          <Card.Body>
            <Card.Title>Titulo: {option.title}</Card.Title>
            <Card.Text>
              Descrição: {option.description}
            </Card.Text>
            <Card.Text>
              Data de Inicio: {option.date_init}
            </Card.Text>
            <Card.Text>
              Data de Encerramento: {option.date_end}
            </Card.Text>
            <Link onClick={() => setSelectedVotingId(option.id_voting)}>
              <Button>Votar</Button>
            </Link>
            <Link to={`/voting/view/${option.id_voting}`}>
              <Button>Visualizar Votação</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Votar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {options.map((opt, idx) => (
              <Form.Group key={idx} className="d-flex justify-content-around">
                <Button
                  className="mt-3"
                  variant={opt.selected ? "primary" : "secondary"} // Altera a cor do botão com base na seleção
                  onClick={() => handleOptionClick(idx)}
                >
                  {opt.name}: "{opt.value}"
                </Button>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
          <Button variant="primary" onClick={handleCreateVoting}>Votar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersVoting;
