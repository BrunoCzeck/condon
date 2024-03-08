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

export const CardContainer = styled.div`
  /* Adicione seus estilos existentes para o CardContainer */
  border: 1px solid #ccc;
  width: 500px;
  height: 130px;
  padding: 5px 30px 10px 10px;
  margin-top: 10px;
}
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  font-size: 14px;
  color: #666;
`;

export const Button = styled.button`
  padding: 10px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 25px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonModal = styled.button`
  padding: 10px 30px;
  height: 45px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Container = styled.div`
  height: 100px;
  padding: 15px;
`;

export const ButtonAddPost = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 5px;
`;

export const Logo = styled.img`
  width: 30px;
  height: auto;
`;

export const Div = styled.div`
  /* Adicione seus estilos para o conteúdo do lado direito */
  flex: 1;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
`;


export const ChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

export const RightContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

export const TableMr = styled.table`
    width: 900px;
    height: 700px;
    border-collapse: collapse;
    overflow-y: auto;
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;

`;

