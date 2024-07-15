import axios from 'axios';
const getSchedulerEnterprise = (id_scheduler) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/scheduler/types/enterprise/${id_scheduler}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getSchedulerEnterprise;