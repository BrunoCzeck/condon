import axios from 'axios';
const sendScheduler = (data) => {

  return axios.post('http://127.0.0.1:3333/api/v1/scheduler', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default sendScheduler;