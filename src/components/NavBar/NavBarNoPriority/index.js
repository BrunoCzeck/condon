import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../../img/2.svg'; // Certifique-se de que o caminho do arquivo SVG está correto

import {
  StyledNavbar,
  Logo,
  LogoImagem,
  NavLinks,
  NavLinkItem,
  NavLink,
  NavTexto,
  DividerLine,
} from './NavBarNoPriorityStyle'; 
import { StyledLink } from './NavBarNoPriorityStyle'; // Importe o componente StyledLink do arquivo separado

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
          <StyledLink to="/scheduler">
            <NavLink>Agendamentos</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
            <NavLink>Boletos</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
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