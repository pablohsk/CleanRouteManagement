// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL do seu servidor back-end
});

export default api;
