import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`

  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const ContainerButton = styled.div`

`;

export const ContainerImagem = styled.div`
 
`;

export const Formulario = styled.form`
    width: 75%;
    display: inline-block;
    padding: 30px;
    margin: 150px 0px 100px 125px;
`;


export const Button = styled.button`
  padding: 10px 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 15px;

    &:hover {
      background-color: #0056b3;
    }
`;

export const ButtonBack = styled.button`

`;

export const Text = styled.h1`
 
`;

export const Img = styled.img`
  
`;

export const Linked = styled.a`
  
`;

export const CustomSelect = styled.select`

`;

export const CustomOption = styled.option`
  
`;

export const CustomSubLabel = styled.label`
  
`;

export const NavBar = styled.div`
  
`;

export const Body = styled.div`
  display: flex;
`;

export const ContainerPrincipal = styled.div`
  
`;

export const CampoHours = styled.div`
  
`;

export const CampoInputs = styled.div`
  
`;

export const Container = styled.div`
  /* Estilos para o container geral */
  display: flex;
  flex-direction: column;
  /* Adicione outros estilos conforme necessário */
`;

export const CustomLabel = styled.label`
  /* Estilos para o rótulo */
  font-size: 16px;
  margin-bottom: 5px;
  /* Adicione outros estilos conforme necessário */
`;

export const FormInput = styled.input`
  /* Estilos para o input */
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* Adicione outros estilos conforme necessário */
`;