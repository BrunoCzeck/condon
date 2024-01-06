import axios from 'axios';
const getSchedulerReserve = (id_enterprise, type) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/scheduler/reserve/${id_enterprise}?space=${type}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getSchedulerReserve;