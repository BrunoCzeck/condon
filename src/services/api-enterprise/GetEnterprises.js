import axios from 'axios';
const getDataEnterprise = (data) => {

  return axios.get('http://127.0.0.1:3333/api/v1/enterprise', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getDataEnterprise;