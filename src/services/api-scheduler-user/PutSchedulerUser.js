import axios from 'axios';
const putSchedulerUser = (id_scheduler) => {

  return axios.put(`http://127.0.0.1:3333/api/v1/scheduler/${id_scheduler}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default putSchedulerUser;