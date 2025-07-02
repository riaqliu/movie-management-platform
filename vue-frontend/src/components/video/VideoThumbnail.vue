<script setup>
import { defineProps } from 'vue';

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Untitled'
  },
});

</script>
<template>
  <div class="thumb-card" @click="$emit('click')">
    <img :src="imageUrl" alt="Thumbnail" />
    <div class="title">{{ title }}</div>
  </div>
</template>
<style scoped lang="scss">
.thumb-card {
  width: 220px;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #fff;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }

  .title {
    padding: 8px;
    font-size: 14px;
    text-align: left;
    font-weight: 500;
    color: var(--nf-black);
  }
}

</style>
