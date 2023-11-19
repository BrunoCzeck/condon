import axios from 'axios';
const getData = (data) => {
/*  PRODUÇÃO */
/*   return axios.get('https://api-condon-production.up.railway.app/api/v1/users/usersvalidate', data, {  */  
  return axios.post('http://127.0.0.1:3333/api/v1/users/usersvalidate', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getData;