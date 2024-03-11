import axios from 'axios';
const getEnterpriseVoting = (id_enterprise) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/voting/enterprise/${id_enterprise}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getEnterpriseVoting;