import axios from 'axios';
const getAddress = (cep) => {

/*   return axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`,{
 */  return axios.get(`https://viacep.com.br/ws/${cep}/json/`,{
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getAddress;