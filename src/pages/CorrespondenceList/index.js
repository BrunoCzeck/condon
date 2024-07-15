import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import getCorrespondenceUser from '../../services/api-correspondence/GetCorrespondenceId';
import Row from 'react-bootstrap/Row';
import {CardContainer, CardTitle, CardText, Button, Container, ButtonAddPost, Logo, ButtonModal} from './AvisoStyle'
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';

const Posts = () => {
  const [correspondence, setCorrespondence] = useState([]); // Inicializando como uma array vazia
  const [idEnterprise, setEnterprise] = useState(null);
  const [idUsers, setUsers] = useState(null);
  const [priority, setPriority] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
      const fetchCorrespondenceUser = async () => {
        try {
          const response = await getCorrespondenceUser(idUsers);
          setCorrespondence(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchCorrespondenceUser(idUsers);
    }, [idUsers]);

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
              {console.log(idUsers)}
            </CardText>
          </CardContainer>
      ))}
      </Row>
    </Container>
  );
};
export default Posts;