import axios from 'axios';

const apiServer = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    accept: 'application/json',
  },
});

// Add auth token to every request
apiServer.interceptors.request.use(
  (config) => {
    const token = process.env.TMDB_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiServer;
