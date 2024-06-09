import axios from 'axios';

const KEY = 'AIzaSyDnm0eB-FQEVVYXgQadeFq_a8WRhB7KsTE'; 

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY,
  }
});

export default youtubeApi;