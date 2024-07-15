import axios from 'axios';
const getSchedulerUser = (user_id) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/scheduler/${user_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getSchedulerUser;