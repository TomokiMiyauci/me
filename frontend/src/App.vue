<template>
  <nav-bar class="h-24" />

  <main class="px-2">
    <router-view />
  </main>

  <the-footer class="px-2" />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

import NavBar from '@/components/app/NavBar.vue'
import TheFooter from '@/components/app/TheFooter.vue'
useHead({
  meta: [
    { property: 'og:title', content: 'Tomoki Miyauchi' },
    { property: 'og:image', content: 'https://miyauchi.dev/logo.png' },
    { name: 'description', content: "Tomoki Miyauchi's Portfolio" },
    { name: 'og:site_name', content: "Tomoki Miyauchi's Portfolio" },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@miyauchi_tomoki' }
  ]
})
</script>
