<script setup>
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'

const store = useStore();
const route = useRoute();

const paramId = route.params.id;
const movies = computed(() => store.state.movies);
const currentMovie = computed(() => movies.value.find((movie) => movie.id == paramId))

onMounted( async () => {
  const payload = { id: paramId };
  await store.dispatch('fetchMovies', payload);
})


</script>
<template>
  <div class="video-wrapper">
    <div class="video-container">
      <VideoPlayer
        :video-src="currentMovie.video_file"

      ></VideoPlayer>
    </div>
    <div class="recommendations-wrapper">
    </div>

  </div>
</template>
<style scoped lang="scss">

</style>
