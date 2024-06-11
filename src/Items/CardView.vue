<template>
    <div class="card mb-4 position-relative">
      <img :src="image" class="card-img-top" alt="Video thumbnail">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <p class="card-text"><small class="text-muted">{{ channel }}</small></p>
        <p class="card-text"><small class="text-muted">{{ formattedDate }}</small></p>
        
        <button 
          class="btn btn-outline-primary position-absolute top-0 end-0 m-2" 
          @click="toggleSelection"
        >
          <i class="bi" :class="selected ? 'bi-check-circle-fill' : 'bi-check-circle'"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardView',
    props: {
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      channel: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFavorite: false
      };
    },
    computed: {
      formattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.date).toLocaleDateString(undefined, options);
      }
    },
    methods: {
      
      toggleSelection() {
        this.$emit('toggle-selection');
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  