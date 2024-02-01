import axios from 'axios';
const getCorrespondenceTypeId = (id_enterprise) => {

  return axios.get(`http://127.0.0.1:3333/api/v1/correspondence/types/${id_enterprise}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default getCorrespondenceTypeId;