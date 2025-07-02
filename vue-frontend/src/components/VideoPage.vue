<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'

import VideoPlayer from '@/components/video/VideoPlayer.vue';
import ConfirmationModal from '@/components/_generics/ConfirmationModal.vue';
import VideoPageEditor from '@/components/VideoPageEditor.vue';
import VideoThumbnail from '@/components/video/VideoThumbnail.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const paramId = route.params.id;

const isDeleting = ref(false);
const isEditing = ref(false);

const movies = computed(() => store.state.movies);
const otherMovies = computed(() => store.state.movies.filter((movie) => movie.id != paramId));
const currentMovie = computed(() => movies.value.find((movie) => movie.id == paramId));
const description = computed(
  () => currentMovie.value?.description === '' ? 'Description is empty.' : currentMovie.value?.description);

onMounted( async () => {
  const payload = { id: paramId };
  await store.dispatch('fetchMovies', payload);
});

async function confimedDeleteHandler() {
  await store.dispatch('deleteMovie', paramId);
  router.replace({ name: 'home' })
}

function backButtonClickHandler() {
  router.replace({ name: 'home' })
}

function thumbnailClickHandler({ id }) {
  router.replace({ name: 'player', params: { id } }).then(() => {
    window.location.reload(); // forces full reload
  });
}

</script>
<template>
  <div class="video-wrapper">
    <VideoPageEditor
      v-if="isEditing"
      :movie="currentMovie"
      is-editing
      @form-submit="isEditing = false"
    />
    <div v-else class="video-container">
      <button class="back-button" @click="backButtonClickHandler">Back</button>
      <VideoPlayer
        :video-src="currentMovie?.video_file"
      ></VideoPlayer>
      <div class="details">
        <h1>{{currentMovie?.title}}</h1>
        <p>{{description}}</p>
      </div>
      <div class="actions">
        <button @click="() => isEditing = true">Edit</button>
        <button @click="() => isDeleting = true">Delete</button>
      </div>
      <div v-if="otherMovies" class="recommendations-wrapper">
          <VideoThumbnail
            class="thumbnail"
            v-for="movie in otherMovies"
            :key="movie.id"
            :image-url="movie?.thumbnail?.image_file"
            :title="movie.title"
            @thumbnail-click="() => thumbnailClickHandler(movie)"
          ></VideoThumbnail>
      </div>
      <p v-else>No other movies to show</p>
    </div>
    <ConfirmationModal
      v-show="isDeleting"
      class="confimationModal"
      :message="'Do you want to delete this video?'"
      @clickYes="confimedDeleteHandler"
      @clickNo="() => isDeleting = false"
    />
  </div>
</template>
<style scoped lang="scss">
.video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  height: 100vh;
  box-sizing: border-box;
}

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--nf-grey-100);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  width: 100%;
}

.details {
  text-align: center;

  h1 {
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
  }

  p {
    color: #555;
    font-size: 1rem;
    line-height: 1.5;
  }
}



button {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.back-button {
    margin-left: auto;
  }
}

.actions {
  display: flex;
  gap: 1rem;
  :first-child {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  :last-child {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }
}

.recommendations-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  min-height: 100px;
  background-color:  var(--nf-grey-100);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  overflow: auto;

  .thumbnail {
    min-width: 200px;
  }
}

.confimationModal {
  z-index: 1000;
}
</style>
