<template>
  <div>
    <h3>My Favorites</h3>
    <input v-model="searchQuery" placeholder="Search favorites" />
    <div v-if="filteredFavoriteVideos.length">
      <ul>
        <li v-for="video in filteredFavoriteVideos" :key="video.id.videoId">
          <div class="card mb-4 position-relative" style="width: 18rem;">
            <img :src="video.snippet.thumbnails.high.url" class="card-img-top" :alt="video.snippet.title">
            <div class="card-body">
              <h5 class="card-title">{{ video.snippet.title }}</h5>
              <p class="card-text">{{ video.snippet.description }}</p>
              <p class="card-text"><small class="text-muted">{{ video.snippet.channelTitle }}</small></p>
              <p class="card-text"><small class="text-muted">{{ new Date(video.snippet.publishedAt).toLocaleDateString() }}</small></p>
              <button 
                class="btn btn-outline-danger position-absolute top-0 end-0 m-2" 
                @click="removeFavorite(video)"
              >
                <i class="bi bi-x-circle-fill"></i>
              </button>
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
import { ref, onMounted, computed } from 'vue';
import { getDoc, doc, setDoc } from '../api/firebase';
import { db, auth } from '../api/firebase';

export default {
  name: 'FavoritesView',
  setup() {
    const favoriteVideos = ref([]);
    const searchQuery = ref('');

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

    const saveFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          selectedVideos: favoriteVideos.value
        });
      }
    };

    const removeFavorite = (video) => {
      favoriteVideos.value = favoriteVideos.value.filter(v => v.id.videoId !== video.id.videoId);
      saveFavorites();
    };

    const filteredFavoriteVideos = computed(() => {
      return favoriteVideos.value.filter(video => video.snippet.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });

    onMounted(() => {
      loadFavorites();
    });

    return {
      favoriteVideos,
      searchQuery,
      removeFavorite,
      filteredFavoriteVideos
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
