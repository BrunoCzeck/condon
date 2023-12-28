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

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export const ContainerButton = styled.div`
  display: contents;
`;

export const ContainerImagem = styled.div`
  display: block;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  background-color: #7800D7;
  flex-direction: column;
  padding: 40px 160px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const FormInput = styled.input`
  margin-bottom: 12px;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
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
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Text = styled.h1`
  color: white;
  font-size: 24px;
  margin-bottom: 2rem;
`;

export const Img = styled.img`
  width: 50px;
  height: auto;

`;

export const Linked = styled.a`
  text-decoration: none;
  color: white;
  font-size: 16px;
`;

export const CustomSelect = styled.select`
  padding: 8px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const CustomOption = styled.option`
  font-size: 16px;
`;

export const CustomLabel = styled.label`
  font-size: 16px;
  color: white;
  margin-bottom: 5px;
`;

export const CustomSubLabel = styled.label`
  font-size: 12px;
  color: white;
  margin-bottom: 2px;
`;