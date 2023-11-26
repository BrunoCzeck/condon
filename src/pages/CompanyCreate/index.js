import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sendUserDataEnterprise from '../../components/FormEnterprise';
import getAddress from '../../components/GetViaCep';

function CompanyCreate() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, address, number, cep, city, state };
    sendUserDataEnterprise(data)
      .then((response) => {
        // handle response if needed
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  const handleCepChange = (event) => {
    const inputValue = event.target.value;
    setCep(inputValue);

    if (inputValue.length === 8) {
      setLoading(true);
      getAddress(inputValue)
        .then((response) => {
          if (!response.erro) {
            setAddress(response.data.street);
            setCity(response.data.city);
            setState(response.data.state);
            setResult(response.data);
          } else {
            console.error('CEP não encontrado');
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Ocorreu um erro ao buscar o CEP:', error);
        });
    } else {
      setAddress('');
      setCity('');
      setState('');
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {console.log(result.state)}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome'/>
        <br />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Endereço'/>
        <br />
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Número'/>
        <br />
        <input type="text" value={cep} onChange={handleCepChange} placeholder='CEP'/>
        <br />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Cidade'/>
        <br />
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='Estado'/>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CompanyCreate;