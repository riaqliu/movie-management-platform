<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'

import VideoThumbnail from '@/components/video/VideoThumbnail.vue';

const store = useStore();

const movies = computed(() => store.state.movies);
const hasFetchedInitially = computed(() => store.state.hasFetchedInitially);

onMounted( async () => {
  // Initial video fetch
  if(!hasFetchedInitially.value) {
    await store.dispatch('fetchMovies');
    store.commit('setHasFetchedInitially', true);
  }
})


</script>
<template>
  <div class="catalog-wrapper">
    <div v-if="movies?.length" class="movie-container">
      <VideoThumbnail
        v-for="movie in movies"
        :key="movie.id"
        :image-url="movie.thumbnail.image_file"
        :title="movie.title"
      ></VideoThumbnail>
    </div>
    <div v-else>
      You have no movies uploaded.
    </div>
  </div>

</template>

<style>

</style>
