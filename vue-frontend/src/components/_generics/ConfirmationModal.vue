<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: 'Are you sure?'
  }
});

const modalMessage = computed(() => props.message);

</script>
<template>
  <div class="confirmation-modal">
    <h1>{{ modalMessage }}</h1>
    <div class="modal-actions">
      <button @click="$emit('clickYes')">Yes</button>
      <button @click="$emit('clickNo')">No</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.confirmation-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-width: 90%;
  text-align: center;
  z-index: 9999;

  h1 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 12px;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      background-color: #eee;
      transition: background-color 0.2s;

      &:hover {
        background-color: #ddd;
      }

      &:first-of-type {
        background-color: var(--nf-red-300);
        color: white;

        &:hover {
          background-color: #2563eb;
        }
      }
    }
  }
}

</style>
