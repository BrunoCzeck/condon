import axios from 'axios';
const deleteVoting = (id_voting) => {
const url = `http://127.0.0.1:3333/api/v1/voting/${id_voting}`;
if(deleteVoting)
return axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default deleteVoting;