import axios from 'axios';
const getMeeting = (id_enterprise) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/meeting/${id_enterprise}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getMeeting;