<script setup>
import { computed } from 'vue';

defineEmits(['thumbnailClick']);

const fallbackImage = new URL('@/assets/missing-image.png', import.meta.url).href;

const props = defineProps({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
    default: 'Untitled',
  },
  date: {
    type: [Date, String], // Accept string too in case it's serialized
  },
});

const formattedDate = computed(() => {
  if (!props.date) return '';
  const dateObj = typeof props.date === 'string' ? new Date(props.date) : props.date;
  return isNaN(dateObj) ? '' : dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
});
</script>
<template>
  <div class="thumb-card" @click="$emit('thumbnailClick')">
    <img :src="imageUrl || fallbackImage" alt="Thumbnail" />
    <div class="title">{{ title }}</div>
    <div class="date" v-if="formattedDate">{{ formattedDate }}</div>
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
    padding-bottom: 1px;
    font-size: 14px;
    text-align: left;
    font-weight: 500;
    color: var(--nf-black);
  }

  .date {
    padding: 0 8px 12px;
    font-size: 12px;
    color: #777;
    text-align: left;
  }
}

</style>
