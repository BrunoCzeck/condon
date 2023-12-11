import axios from 'axios';
const getEnterprise = (id) => {
const url = `http://127.0.0.1:3333/api/v1/enterprise/${id}`;

return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getEnterprise;