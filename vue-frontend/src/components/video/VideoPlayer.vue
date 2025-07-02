<script setup>
import { defineProps, ref, watch, onBeforeUnmount  } from 'vue';

const props = defineProps({
  videoSrc: {
    type: [String, Object], // File or URL
    required: true
  }
});

const resolvedSrc = ref('')
let objectUrl = null

watch(
  () => props.videoSrc,
  (newValue) => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      objectUrl = null
    }

    if (typeof newValue === 'string') {
      resolvedSrc.value = newValue
    } else if (newValue instanceof File) {
      objectUrl = URL.createObjectURL(newValue)
      resolvedSrc.value = objectUrl
    } else {
      resolvedSrc.value = ''
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (objectUrl) URL.revokeObjectURL(objectUrl)
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
      :src="resolvedSrc"
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
