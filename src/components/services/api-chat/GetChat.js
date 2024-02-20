import axios from 'axios';
const getChatId = (id_enterprise) => {
const url = `http://127.0.0.1:3333/api/v1/correspondence/${id_enterprise}`;

return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getChatId;