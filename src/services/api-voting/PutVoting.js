import axios from 'axios';
const updateVoting = (id_voting, data) => {

  return axios.put(`http://127.0.0.1:3333/api/v1/voting/${id_voting}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default updateVoting;