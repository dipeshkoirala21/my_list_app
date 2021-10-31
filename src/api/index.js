import axios from 'axios';

export const BASE_URL = 'https://api.github.com/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const searchRepo = (query, page) =>
  api.get(`search/repositories?q=${query}&per_page=8&page=${page}`);
