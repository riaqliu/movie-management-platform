<script setup>
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import ConfirmationModal from '@/components/_generics/ConfirmationModal.vue';
import VideoPageEditor from '@/components/VideoPageEditor.vue';

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const route = useRoute();
const router = useRouter();

const paramId = route.params.id;

const isDeleting = ref(false);
const isEditing = ref(false);

const movies = computed(() => store.state.movies);
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

</script>
<template>
  <div class="video-wrapper">
    <VideoPageEditor
      v-if="isEditing"
      :movie="currentMovie"
      @form-submit="isEditing = false"
    />
    <div v-else class="video-container">
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
      <div class="recommendations-wrapper">
    </div>



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

.actions {
  display: flex;
  gap: 1rem;

  button {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:first-child {
      background-color: #3b82f6;
      color: white;

      &:hover {
        background-color: #2563eb;
      }
    }

    &:last-child {
      background-color: #ef4444;
      color: white;

      &:hover {
        background-color: #dc2626;
      }
    }
  }
}

.recommendations-wrapper {
  width: 100%;
  max-width: 800px;
  min-height: 100px;
  background-color:  var(--nf-grey-100);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.confimationModal {
  z-index: 1000;
}
</style>
