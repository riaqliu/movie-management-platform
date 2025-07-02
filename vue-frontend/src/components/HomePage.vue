<script setup>
  import HomePageCatalog from '@/components/HomePageCatalog.vue';

</script>
<template>
  <main class="home-wrapper">
    <h1>Home Catalog</h1>

    <HomePageCatalog/>
  </main>
</template>
<style scoped lang="scss">
.home-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 100vh;
  box-sizing: border-box;
}

h1 {
  text-align: center;
}

</style>
