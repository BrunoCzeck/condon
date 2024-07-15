import axios from 'axios';
const sendDataCorrespondenceType = (data) => {

  return axios.post('http://127.0.0.1:3333/api/v1/correspondence/types', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default sendDataCorrespondenceType;