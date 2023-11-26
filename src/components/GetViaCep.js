import axios from 'axios';
const getAddress = (cep) => {

  return axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`,{
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getAddress;