<script setup>
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import ConfirmationModal from '@/components/_generics/ConfirmationModal.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const route = useRoute();
const router = useRouter();

const paramId = route.params.id;

const isDeleting = ref(false);

const movies = computed(() => store.state.movies);
const currentMovie = computed(() => movies.value.find((movie) => movie.id == paramId));
const description = computed(
  () => currentMovie.value.description === '' ? 'Description is empty.' : currentMovie.value.description);

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
    <div class="video-container">
      <VideoPlayer
        :video-src="currentMovie?.video_file"
      ></VideoPlayer>
      <div class="details">
        <h1>{{currentMovie.title}}</h1>
        <p>{{description}}</p>
      </div>
      <div class="actions">
        <button>Edit</button>
        <button @click="() => isDeleting = true">Delete</button>
      </div>
    </div>
    <div class="recommendations-wrapper">

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
.video-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
