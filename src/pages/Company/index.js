import React, { useState, useEffect } from 'react';
import getDataEnterprise from '../../components/services/api-enterprise/GetEnterprises';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sendUserDataEnterprise from '../../components/services/api-enterprise/PostEnterprise';
import getAddress from '../../components/services/api-cep/GetViaCep';
import Table from 'react-bootstrap/Table';

function Company() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, address, number, cep, city, state };

    sendUserDataEnterprise(data)
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  const handleCepChange = (event) => {
    const inputValue = event.target.value;
    setCep(inputValue);

    if (inputValue.length === 8) {
      setLoading(true);
      getAddress(inputValue)
        .then((response) => {
          if (!response.erro) {
           /*  setAddress(response.data.street);
            setCity(response.data.city);
            setState(response.data.state);
            setResult(response.data);
          */
            setAddress(response.data.logradouro);
            setCity(response.data.localidade);
            setState(response.data.uf);
            setResult(response.data);
          } else {
            console.error('CEP não encontrado');
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Ocorreu um erro ao buscar o CEP:', error);
        });
    } else {
      setAddress('');
      setCity('');
      setState('');
    }
  };

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getDataEnterprise()
      .then((response) => {
        setEnterpriseOptions(response.data.data);
      })
      .catch((error) => {
        setError('Erro ao consultar usuários. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };

    fetchEnterpriseData();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Criar Condominio
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulário no Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>CEP</Form.Label>
              <Form.Control type="text" value={cep} onChange={handleCepChange} placeholder='CEP' />
              <Form.Text className="text-muted">
                Digite o CEP
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome' />
              <Form.Text className="text-muted">
                Digite o nome do condominio a ser cadastrado.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Endereço' />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Número</Form.Label>
              <Form.Control type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Número' />
              <Form.Text className="text-muted">
                Digite o número do condominio. Obs: Apenas o número sem complementos.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Cidade' />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='Estado' />
            </Form.Group>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Enviar
            </Button>
            </Modal.Footer>    
            </Form>              
        </Modal.Body>
      </Modal>
      
      <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Número</th>
          <th>Cidade</th>
          <th>Estado</th>
        </tr>
      </thead>
      {enterpriseOptions.map((enterprise) => (
        <>
      <tbody>
        <tr>
          <td>{enterprise.name}</td>
          <td>{enterprise.address.slice(0, 20)}</td>
          <td>{enterprise.number}</td>
          <td>{enterprise.city}</td>
          <td>{enterprise.state}</td>
          <Button variant="primary">
            Visualizar
          </Button>
          <Button variant="primary">
            Editar
          </Button>
        </tr>
      </tbody>
      </>
      ))}
    </Table>
  </>
  );
}

export default Company;