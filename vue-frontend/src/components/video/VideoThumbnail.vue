<script setup>

defineEmits(['thumbnailClick']);

const fallbackImage = new URL('@/assets/missing-image.png', import.meta.url).href

defineProps({
  imageUrl: {
    type: String
  },
  title: {
    type: String,
    default: 'Untitled'
  },
});

</script>
<template>
  <div class="thumb-card" @click="$emit('thumbnailClick')">
    <img :src="imageUrl || fallbackImage" alt="Thumbnail" />
    <div class="title">{{ title }}</div>
  </div>
</template>
<style scoped lang="scss">
.thumb-card {
  width: 220px;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.1s ease;
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
    padding-bottom: 12px;
    font-size: 14px;
    text-align: left;
    font-weight: 500;
    color: var(--nf-black);
  }
}

</style>
