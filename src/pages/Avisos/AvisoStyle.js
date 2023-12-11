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
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
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

export const Container = styled.div`
  padding: 50px;
`;