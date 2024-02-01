import axios from 'axios';
const getCorrespondenceUser = (user_id) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/correspondence/user/${user_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getCorrespondenceUser;