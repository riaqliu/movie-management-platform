<script setup>
import { defineEmits } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['close']);

import VideoPageEditor from '@/components/VideoPageEditor.vue';


async function submissionHandler() {
    await store.dispatch('fetchMovies');
    emit('close');
}

</script>
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <VideoPageEditor
        @close="$emit('close')"
        @form-submit="submissionHandler"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  color: black;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
