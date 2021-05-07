import axios from 'axios';

const apiPortalDosPets = axios.create({
  baseURL: 'https://portaldospets-api.herokuapp.com/v1.0',
});

export default apiPortalDosPets;