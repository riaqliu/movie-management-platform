<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import VideoThumbnail from '@/components/video/VideoThumbnail.vue';

const store = useStore();
const router = useRouter()

const movies = computed(() => store.state.movies);
const hasFetchedInitially = computed(() => store.state.hasFetchedInitially);

onMounted( async () => {
  // Initial video fetch
  if(!hasFetchedInitially.value) {
    await store.dispatch('fetchMovies');
    store.commit('setHasFetchedInitially', true);
  }
})

function thumbnailClickHandler({ id }) {
  router.push({ name: 'player', query: { id: id } })
}

</script>
<template>
  <div class="catalog-wrapper">
    <div v-if="movies?.length" class="movies-container">
      <VideoThumbnail
        v-for="movie in movies"
        :key="movie.id"
        :image-url="movie.thumbnail.image_file"
        :title="movie.title"
        @thumbnail-click="() => thumbnailClickHandler(movie)"
      ></VideoThumbnail>
    </div>
    <div v-else>
      You have no movies uploaded.
    </div>
  </div>

</template>

<style>
.movies-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

</style>
