import axios from 'axios';

export default axios.create({
  baseURL: __BASE_URL,
  responseType: 'json',
});