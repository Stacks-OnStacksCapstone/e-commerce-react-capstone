import axios, { AxiosResponseHeaders } from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
  headers: AxiosResponseHeaders;
}

export default eCommerceClient;