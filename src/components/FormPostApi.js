import axios from 'axios';
const sendUserData = (data) => {
/*  PRODUÇÃO */
/*   return axios.post('https://api-condon-production.up.railway.app/api/v1/users', data, {  */  
  return axios.post('https://api-condon-production.up.railway.app/api/v1/users', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default sendUserData;