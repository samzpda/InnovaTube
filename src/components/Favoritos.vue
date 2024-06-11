<template>
    <div>
      <h3>My Favorites</h3>
      <div v-if="favoriteVideos.length">
        <ul>
          <li v-for="video in favoriteVideos" :key="video.id.videoId">
            <div class="card mb-4 position-relative" style="width: 18rem;">
              <img :src="video.snippet.thumbnails.high.url" class="card-img-top" :alt="video.snippet.title">
              <div class="card-body">
                <h5 class="card-title">{{ video.snippet.title }}</h5>
                <p class="card-text">{{ video.snippet.description }}</p>
                <p class="card-text"><small class="text-muted">{{ video.snippet.channelTitle }}</small></p>
                <p class="card-text"><small class="text-muted">{{ new Date(video.snippet.publishedAt).toLocaleDateString() }}</small></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No favorites selected yet.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getDoc, doc } from '../api/firebase';
  import { db, auth } from '../api/firebase';
  
  export default {
    name: 'FavoritesView',
    setup() {
      const favoriteVideos = ref([]);
  
      const loadFavorites = async () => {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            favoriteVideos.value = docSnap.data().selectedVideos || [];
          }
        }
      };
  
      onMounted(() => {
        loadFavorites();
      });
  
      return {
        favoriteVideos
      };
    }
  };
  </script>
  
  <style>
  .card-img-top {
    height: 180px;
    object-fit: cover;
  }
  </style>