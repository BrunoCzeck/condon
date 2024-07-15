import axios from 'axios';
const getAvisos = (id_users) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/mural/${id_users}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getAvisos;