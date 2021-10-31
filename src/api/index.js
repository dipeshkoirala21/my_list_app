import axios from 'axios';

export const BASE_URL = 'https://api.github.com/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const searchRepo = data => api.post('search/repositories', data);
