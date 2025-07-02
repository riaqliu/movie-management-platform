<script setup>

</script>
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Create a Video</h2>
      <p>VideoPageCreator content goes here...</p>
      <button @click="$emit('close')">Close</button>
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
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
