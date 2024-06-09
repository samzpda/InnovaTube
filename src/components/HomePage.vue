<template>
     <div>
    <!--<input v-model="query" placeholder="Search YouTube" @keyup.enter="searchVideos">-->
    <button @click="searchVideos">Search</button>
    <div v-if="videos.length">
      <h3>Search Results:</h3>
      <ul>
        <li v-for="video in videos" :key="video.id.videoId">
          <h4>{{ video.snippet.title }}</h4>
          <img :src="video.snippet.thumbnails.default.url" :alt="video.snippet.title">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import youtubeApi from '../api/youtube';

export default {
    name: 'HomePage',
  data() {
    return {
      query: '',
      videos: []
    };
  },
  methods: {
    async searchVideos() {
      try {
        const response = await youtubeApi.get('/search', {
          params: {
            q: this.query
          }
        });
        this.videos = response.data.items;
      } catch (error) {
        console.error('Error fetching videos', error);
      }
    }
  }
};

</script>