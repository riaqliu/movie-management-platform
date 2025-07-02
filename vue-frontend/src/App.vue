<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';


const store = useStore();
const hasFetchedInitially = computed(() => store.state.hasFetchedInitially);

onMounted( async () => {
  // Initial video fetch
  if(!hasFetchedInitially.value) {
    await store.dispatch('fetchMovies');
    store.commit('setHasFetchedInitially', true);
  }
})

</script>

<template>
  <div class="wrapper">
    <header>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped style="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: center;

  a {
    padding: 4px  2rem;
  }
}


</style>
