import axios from 'axios';
const sendPosts = (data) => {

  return axios.post('http://127.0.0.1:3333/api/v1/mural', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default sendPosts;