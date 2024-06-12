<template>
  <div>
    <div class="d-flex justify-content-center ">
      <div class="input-group pt-3 mb-3 w-50">
        <input class="form-control rounded" v-model="query" placeholder="Buscar Youtube" @keyup.enter="searchVideos" aria-label="Search" aria-describedby="search-addon">
        <button class="btn btn-outline-primary" @click="searchVideos" data-mdb-ripple-init>Buscar</button>
      </div>
    </div>
    <div v-if="videos.length">
      <h3 class="pt-3">Resultados:</h3>
      <div class="grid p-5">
        <div class="grid-item" v-for="video in videos" :key="video.id.videoId">
          <div class="card mb-1 position-relative" style="width: 20rem;">
            <img :src="video.snippet.thumbnails.high.url" class="card-img-top" :alt="video.snippet.title">
            <div class="card-body">
              <h5 class="card-title">{{ video.snippet.title }}</h5>
              <p class="card-text">{{ video.snippet.description }}</p>
              <p class="card-text"><small class="text-muted">{{ video.snippet.channelTitle }}</small></p>
              <p class="card-text"><small class="text-muted">{{ new Date(video.snippet.publishedAt).toLocaleDateString() }}</small></p>
              <button
                class="btn btn-outline-primary position-absolute top-0 end-0 m-2"
                @click="toggleSelection(video)"
              >
                <i class="bi" :class="isSelected(video) ? 'bi-check-circle-fill' : 'bi-check-circle'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import youtubeApi from '../api/youtube';
import { ref, onMounted } from 'vue';
import { setDoc, getDoc, doc } from '../api/firebase.js';
import { db, auth } from '../api/firebase.js';

export default {
  name: 'HomePage',
  components: {},
  setup() {
    const query = ref('');
    const videos = ref([]);
    const selectedVideos = ref([]);

    const searchVideos = async () => {
      try {
        const response = await youtubeApi.get('/search', {
          params: {
            q: query.value
          }
        });
        videos.value = response.data.items;
      } catch (error) {
        console.error('Error fetching videos', error);
      }
    };

    const loadSelections = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          selectedVideos.value = docSnap.data().selectedVideos || [];
        }
      }
    };

    const saveSelections = async () => {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          selectedVideos: selectedVideos.value
        });
      }
    };

    const toggleSelection = (video) => {
      const videoIndex = selectedVideos.value.findIndex(v => v.id.videoId === video.id.videoId);
      if (videoIndex !== -1) {
        selectedVideos.value.splice(videoIndex, 1);
      } else {
        selectedVideos.value.push(video);
      }
      saveSelections();
    };

    const isSelected = (video) => {
      return selectedVideos.value.some(v => v.id.videoId === video.id.videoId);
    };

    onMounted(() => {
      loadSelections();
    });

    return {
      query,
      videos,
      selectedVideos,
      searchVideos,
      toggleSelection,
      isSelected
    };
  }
};
</script>

<style>
.card-img-top {
  height: 180px;
  object-fit: cover;
}
.btn-outline-secondary {
  border: none;
  color: gray;
}
.btn-warning {
  color: yellow;
  border: none;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 16px;
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
