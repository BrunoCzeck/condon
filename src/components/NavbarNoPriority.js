import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import homeIcon from '../img/home.svg'; // Certifique-se de que o caminho do arquivo SVG está correto

function NavbarNoPriority() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
    <Navbar.Brand as={Link} to="/">
        <img
            src={homeIcon}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/users">Mural</Nav.Link>
          <Nav.Link as={Link} to="/contato">Chat Portaria</Nav.Link>
          <Nav.Link as={Link} to="/scheduler">Agendamentos</Nav.Link>
          <Nav.Link as={Link} to="/posts">Assembleia</Nav.Link>
          <Nav.Link as={Link} to="/posts">Chat Sindico</Nav.Link>
          <Nav.Link as={Link} to="/posts">Boletos</Nav.Link>
          <Nav.Link as={Link} to="/posts">Correspondencia</Nav.Link>
          <Nav.Link as={Link} to="/posts">Votação</Nav.Link>
          <Nav.Link as={Link} to="/posts">Sair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarNoPriority;