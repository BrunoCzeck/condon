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

export const TableWrapper = styled.div`
  
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 95%;
  border: 1px solid #dddddd;
  margin: 20px;

`;

export const TableTh = styled.th`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

export const Tablethead = styled.thead`
  color:white;
  border: 1px solid #dddddd;
`;
export const Tabletbody = styled.tbody`
  color:white;
  border: 1px solid #dddddd;
`;

export const TableTr = styled.tr`
  color:black;
  border: 1px solid #dddddd;

`;

export const TableTd = styled.td`
  text-align: center;
  padding: 8px;
  border: 1px solid #dddddd;

`;

export const ButtonEdit = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 10px;
  cursor: pointer;
  margin: 5px;
`;

export const ButtonDelete = styled.button`
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
`;

export const Container = styled.div`
  display:flex;
`;

export const Logo = styled.img`
  width: 30px;
  height: auto;
`;

export const DividerLine = styled.hr`
  border: none;
  height: 5px;
  background-color: #000;
  width: 300px;
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

export const Body = styled.body`
  width: 100%;
  text-align: center;
`;

export const Header = styled.div`
  display: block;
  text-align: center;
`;

export const H1 = styled.h1`
  margin-top: 10px;
  font-size: 35px;
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

