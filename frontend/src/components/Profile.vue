<template>
  <h1 class="prose mx-auto mt-10">{{ meta.frontmatter.title }}</h1>
  <slot />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()

const jaPath = 'https://miyauchi.dev/ja'
const enPath = 'https://miyauchi.dev'

const content = locale.value === 'ja' ? jaPath : enPath

const { meta } = useRoute()
useHead({
  link: [
    {
      ref: 'canonical',
      content
    },
    {
      ref: 'alternate',
      hreflang: 'en',
      href: enPath
    },
    {
      ref: 'alternate',
      hreflang: 'ja',
      href: jaPath
    },
    {
      ref: 'alternate',
      hreflang: 'x-default',
      href: enPath
    }
  ]
})
</script>
