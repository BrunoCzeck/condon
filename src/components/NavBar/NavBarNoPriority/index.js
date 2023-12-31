import React, { useState, useEffect } from 'react';
import homeIcon from '../../../img/2.svg';
import {
  StyledNavbar,
  Logo,
  LogoImagem,
  NavLinks,
  NavLinkItem,
  NavLink,
  NavTexto,
  DividerLine
  } from './NavBarNoPriorityStyle'; 
import { StyledLink } from './NavBarNoPriorityStyle';
import Dropdown from 'react-bootstrap/Dropdown';

const NavbarNoPriority = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  
  return ( 
    <StyledNavbar>  
      <NavLinks>
        <NavLinkItem>
          <StyledLink to="/">
            <LogoImagem src={homeIcon} alt="Home" />
            <NavTexto>Condon</NavTexto>
          </StyledLink>
          <DividerLine/>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/">
            <NavLink>Perfil</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/posts">
            <NavLink>Mural</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
            <NavLink>Chat Portaria</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
        <Dropdown>
          <Dropdown.Toggle style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white'}} 
            id="dropdown-basic">
            Agendamentos
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/scheduler">Agendar</Dropdown.Item>
            <Dropdown.Item href="/history">Historico</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/">
            <NavLink>Assembleia</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/">
            <NavLink>Correspondencia</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
            <NavLink>Votação</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
            <NavLink onClick={handleLogout}>Sair</NavLink>
          </StyledLink>
        </NavLinkItem>
      </NavLinks>
    </StyledNavbar>
  );
}

export default NavbarNoPriority;