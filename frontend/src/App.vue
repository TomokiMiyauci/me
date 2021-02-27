<template>
  <nav-bar class="h-14 sm:h-24" />

  <main>
    <router-view />
  </main>

  <the-footer />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import urlJoin from 'url-join'
import { useRouter } from 'vue-router'

import NavBar from '@/components/app/NavBar.vue'
import TheFooter from '@/components/app/TheFooter.vue'
import { DOMAIN } from '@/constants'
import { jsonld } from '@/packages/jsonld'
import i18n from '@/plugins/i18n'
const { currentRoute } = useRouter()
if (currentRoute.value.path.startsWith('/ja')) {
  if (i18n.global.locale.value !== 'ja') {
    i18n.global.locale.value = 'ja'
  }
} else if (i18n.global.locale.value !== 'en') {
  i18n.global.locale.value = 'en'
}

useHead({
  meta: [
    { name: 'author', content: 'Tomoki Miyauchi' },
    { name: 'copyright', content: '2021 ©Tomoki Miyauchi' },
    { property: 'og:title', content: 'Tomoki Miyauchi' },
    { property: 'og:description', content: "Tomoki Miyauchi's Portfolio" },
    { property: 'og:image', content: 'https://miyauchi.dev/logo.png' },
    { property: 'og:site_name', content: "Tomoki Miyauchi's Portfolio" },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@miyauchi_tomoki' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        jsonld({
          logo: {
            url: DOMAIN,
            logoUrl: urlJoin(DOMAIN, 'logo.png')
          }
        })
      )
    }
  ]
})
</script>
