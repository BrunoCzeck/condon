import axios from 'axios';
const getChatUser = (user_id) => {
const url = `http://127.0.0.1:3333/api/v1/chat/user/${user_id}`;

return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getChatUser;