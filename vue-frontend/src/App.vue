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
  width: 100%;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--nf-grey-850);
  padding: 1rem 0;

  a {
    padding: 12px 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--nf-red-200);
    text-transform: uppercase;
    transition: color 0.2s, border-bottom 0.2s;
    border-radius: 5px;

    &:hover {
      color: var(--nf-red-100);
      border-bottom: 2px solid var(--nf-primary);
    }
  }
}

</style>
