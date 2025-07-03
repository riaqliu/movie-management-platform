<script setup>
  import HomePageCatalog from '@/components/HomePageCatalog.vue';

</script>
<template>
  <main class="home-wrapper">
    <h1>Catalog</h1>

    <HomePageCatalog/>
  </main>
</template>
<style scoped lang="scss">
.home-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

h1 {
  text-align: center;
}

</style>
