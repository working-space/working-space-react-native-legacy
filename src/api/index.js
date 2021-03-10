import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nomad-cafe.yonghochoi.com/api/v1',
});

export function createCancelSource() {
  return axios.CancelToken.source();
}

export default api;
