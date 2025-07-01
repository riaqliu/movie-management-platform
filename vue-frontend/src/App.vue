<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/editor">Editor</RouterLink>
        <RouterLink to="/player">Player</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped style="sass">

</style>
