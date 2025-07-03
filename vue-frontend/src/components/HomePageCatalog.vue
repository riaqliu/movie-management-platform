<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import VideoThumbnail from '@/components/video/VideoThumbnail.vue';
import VideoPageCreator from '@/components/VideoPageCreator.vue';

const store = useStore();
const router = useRouter()

const isCreating = ref(false);

const movies = computed(() => store.state.movies);

function thumbnailClickHandler({ id }) {
  router.push({ name: 'player', params: { id: id } })
}

</script>
<template>
  <div class="catalog-wrapper">
    <div v-if="movies?.length" class="movies-container">
      <VideoThumbnail
        v-for="movie in movies"
        :key="movie.id"
        :image-url="movie?.thumbnail?.image_file"
        :title="movie.title"
        :date="movie.date_added"
        @thumbnail-click="() => thumbnailClickHandler(movie)"
      ></VideoThumbnail>
    </div>
    <div v-else>
      You have no movies uploaded.
    </div>

    <div class="catalog-action">
      <button @click="isCreating = true">
        Upload
      </button>
    </div>

    <VideoPageCreator v-if="isCreating" @close="isCreating = false"/>
  </div>
</template>

<style scoped lang="scss">
.catalog-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  min-height: 100vh;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}

.catalog-action {
  display: flex;
  justify-content: center;
  padding-top: 10vh;

  button {
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #2563eb;
    }
  }
}

</style>
