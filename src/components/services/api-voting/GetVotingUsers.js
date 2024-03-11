import axios from 'axios';
const getVotingUsers = (id_voting) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/voting/${id_voting}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getVotingUsers;