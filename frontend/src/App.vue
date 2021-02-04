<template>
  <nav-bar class="h-24" />

  <main class="px-2">
    <router-view />
  </main>

  <the-footer class="px-2" />
</template>

<script setup lang="ts">
import NavBar from '@/components/app/NavBar.vue'
import TheFooter from '@/components/app/TheFooter.vue'
</script>
