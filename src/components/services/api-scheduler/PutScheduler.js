import axios from 'axios';
const putScheduler = (id_scheduler, data) => {

  return axios.put(`http://127.0.0.1:3333/api/v1/scheduler/types/${id_scheduler}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default putScheduler;