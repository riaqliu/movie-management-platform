<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <header>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/editor">Editor</RouterLink>
          <RouterLink to="/player">Player</RouterLink>
        </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped style="sass">
body {
  display: flex;
  flex-direction: column;
  width: 100%;
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
