import { Config } from './config';
import {getToken} from '../Auth/auth.local'
import axios from 'axios';

const config = new Config();
const api = axios.create({
  baseURL: config.apiURL,
  headers:{
    'Content-Type': 'application/json',
  },
  withCredentials: true
});
export const apiPrivate = axios.create({
  baseURL: config.apiURL,
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getToken() },
  withCredentials: true
});

export default api;