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
  } from './NavBarPriorityStyle'; 
import { StyledLink } from './NavBarPriorityStyle';

const NavbarPriority = () => {

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
          <StyledLink to="/users">
            <NavLink>Usuários</NavLink>
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
          <StyledLink to="/">
            <NavLink>Assembleia</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/correspondence">
            <NavLink>Correspondecia</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/#">
            <NavLink>Votação</NavLink>
          </StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/settings">
            <NavLink>Configurações</NavLink>
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

export default NavbarPriority;