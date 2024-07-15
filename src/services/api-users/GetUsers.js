import axios from 'axios';
const getUsers = (data) => {

  return axios.get('http://127.0.0.1:3333/api/v1/users', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getUsers;