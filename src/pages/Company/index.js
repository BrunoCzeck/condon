import React, { useState, useEffect } from 'react';
import getDataEnterprise from '../../components/GetEnterprises';
import { Link } from 'react-router-dom';


function Company() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getDataEnterprise()
      .then((response) => {
        setEnterpriseOptions(response.data.data);
      })
      .catch((error) => {
        setError('Erro ao consultar usuários. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };

    fetchEnterpriseData();
  }, []);

  return (
    <>
    <Link to='/company/create'>
      <button>Criar Condominio</button>
    </Link> 
    <div>
    <h2>Listagem de Empresas</h2>
    <ul>
      {enterpriseOptions.map((enterprise) => (
        <>
        <br/>
        <li>
          Nome: {enterprise.name}
        </li>
        <li>
          Endereço: {enterprise.address}{', '}{enterprise.number}{' - '}{enterprise.city}{', '}{enterprise.state}
        </li>
        </>
      ))}
    </ul>
  </div>
  </>
  );
}

export default Company;