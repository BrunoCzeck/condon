// src/components/Navbar/NavbarStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const StyledNavbar = styled.nav`
  display: flex;
  width: 300px;
  height: 930px;
  align-items: center;
  flex-direction: column;
  background-color: #7800D7;
  color: white;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  align-items: end;
  display:flex;
`;

export const LogoImagem = styled.img`
  width: 50px;
  height: auto;
`;

export const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column; 
  padding-left: 0rem;
`;

export const NavLinkItem = styled.li`
  text-align: center;
  margin-bottom: 1rem;
`;

export const NavLink = styled.button`
  color: white; 
  background-color: transparent;
  border: none;
  padding: 10px 60px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  &:hover {
    background-color: #ddd; 
    color: black;
    padding: 10px 60px;
  }
`;

export const NavTexto = styled.h1`
  color: white;
  font-size: 24px;
`;

export const DividerLine = styled.hr`
  border: none;
  height: 5px;
  background-color: #fff;
  width: 300px;
`;