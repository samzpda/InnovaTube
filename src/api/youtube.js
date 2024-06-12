import axios from 'axios';

// Configuracion de axios para api de youtube
const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyB4YBksW7wvMS1PP8TcvTzAfz1vmBYIJOw', 
    part: 'snippet',
    maxResults: 5 //resultado maximos de videos
  }
});


//Indicador de limite de usos de api
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