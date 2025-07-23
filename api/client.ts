import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.PARCEL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };
