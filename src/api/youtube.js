import axios from 'axios';

// Configura Axios con la URL base y parámetros comunes
const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyCxXKVWDn93SKj2trtsQq0DnBCwX3BAHe4', // Reemplaza esto con tu clave de API de YouTube
    part: 'snippet',
    maxResults: 5
  }
});

youtubeApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      console.error('Quota limit reached. Please wait and try again later.');
    }
    return Promise.reject(error);
  }
);

export default youtubeApi;