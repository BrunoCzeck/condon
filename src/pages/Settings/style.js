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
  width: 100%;
  height: fit-content;
  margin: 10px;
`;

export const TableHeader = styled.th`
  background-color: #6500b1;
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

export const Tablethead = styled.thead`
  color:white;
`;

export const TableTr = styled.tr`
  color:black;
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 8px;
`;

export const ButtonEdit = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 5px;
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