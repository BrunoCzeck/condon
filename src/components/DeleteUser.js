import axios from 'axios';
const deleteUser = (id) => {
const url = `http://127.0.0.1:3333/api/v1/users/${id}`;
if(deleteUser)
window.location.reload(); // Recarrega a pagina apos deletar
return axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default deleteUser;