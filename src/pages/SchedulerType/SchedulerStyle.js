import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export const CenteredCalendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Defina a altura desejada */
  width: 100%;
`;

export const DateDisplay = styled.div`
  font-size: 18px;
  display: inline-grid;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
`;

export const FormInput = styled.input`
  padding: 10px 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

export const CustomLabel = styled.label`
  font-size: 16px;
  color: white;
  margin-bottom: 5px;
`;

export const StyledCalendar = styled(Calendar)`
  width: 100%;
  display: inline-block;
  background: white;
  border: 1px solid #a0a096;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
`;

export const CustomSelect = styled.select`
  padding: 8px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  display: none;
`;

export const CustomOption = styled.option`
  font-size: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 200px 195px;
  border-radius: 8px;
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
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

