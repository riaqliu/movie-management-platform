<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const videos = computed(() => store.state.videos);

onMounted(() => {

  // Initial video fetch
  if(!videos.value.length) store.dispatch('fetchVideos');
})


</script>
<template>
  <div class="catalog-wrapper">
    Videos here
  </div>

</template>

<style>

</style>
