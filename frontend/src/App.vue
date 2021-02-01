<template>
  <nav-bar class="h-24" />

  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/app/NavBar.vue'
</script>
