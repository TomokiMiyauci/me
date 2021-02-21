<template>
  <nav-bar class="h-14 sm:h-24" />

  <main>
    <router-view />
  </main>

  <the-footer class="px-2" />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

import NavBar from '@/components/app/NavBar.vue'
import TheFooter from '@/components/app/TheFooter.vue'
const { locale } = useI18n()
useHead({
  htmlAttrs: [{ lang: locale.value }],
  meta: [
    { name: 'description', content: "Tomoki Miyauchi's Portfolio" },
    { name: 'author', content: 'Tomoki Miyauchi' },
    { name: 'copyright', content: '2021 ©Tomoki Miyauchi' },
    { property: 'og:title', content: 'Tomoki Miyauchi' },
    { property: 'og:description', content: "Tomoki Miyauchi's Portfolio" },
    { property: 'og:image', content: 'https://miyauchi.dev/logo.png' },
    { property: 'og:site_name', content: "Tomoki Miyauchi's Portfolio" },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@miyauchi_tomoki' }
  ]
})
</script>
