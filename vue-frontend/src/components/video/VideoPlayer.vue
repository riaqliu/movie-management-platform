<script setup>
import { defineProps } from 'vue';

defineProps({
  videoSrc: {
    type: String,
    required: true
  }
});

function playHandler() {
  console.log("playing");
}

function pauseHandler() {
  console.log("paused");
}

function endHandler() {
  console.log('ended');
}
</script>
<template>
  <div class="video-player">
    <video
      :src="videoSrc"
      controls
      @play="playHandler"
      @pause="pauseHandler"
      @ended="endHandler"
      width="640"
      height="360"
    ></video>
  </div>
</template>
<style scoped lang="scss">
.video-player {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
