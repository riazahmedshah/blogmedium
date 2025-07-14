import axiosDefault from "axios";
import { getAuthToken } from "../modules/auth/helper/authToken"

const API_URL = new URL('/api/v1', "http://localhost:8787").toString()

const axios = axiosDefault.create({
  baseURL: API_URL
})

axios.interceptors.request.use(
  (config) => {
    const publicEndpoints = [
      'user/create',
      '/blog/bulk'
    ];
    if(!publicEndpoints.some(endpoint =>config.url && config.url.includes(endpoint))) {
      const token = getAuthToken();
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios