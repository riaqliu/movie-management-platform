<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <header>
      <div class="header-wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/editor">Editor</RouterLink>
          <RouterLink to="/player">Player</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped style="sass">
body {
  display: flex;
}

</style>
