import axios from 'axios';
const putSendDataChat = (user_id) => {

  return axios.put(`http://127.0.0.1:3333/api/v1/chat/${user_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default putSendDataChat;