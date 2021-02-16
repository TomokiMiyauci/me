<template>
  <div
    class="px-2 py-4 pt-8 dark:shadow-2xl bg-gradient-to-b dark:via-green-400 via-gray-300 from-white dark:from-gray-700 dark:to-green-400 to-white"
  >
    <div class="container mx-auto dark:text-gray-100 text-gray-800">
      <!-- <router-link to="/ja/posts">
        <button
          class="shadow flex items-center rounded-full p-2 focus:ring-2 hover:bg-gray-50 transition duration-200 focus:outline-none"
        >
          <mdi-chevron-left class="w-7 h-7" />
        </button>
      </router-link> -->
      <h1
        class="xl:text-10xl xl:px-24 text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 leading-none dark:text-gray-200 text-gray-800"
      >
        {{ title }}
      </h1>

      <p class="xl:mt-16 xl:px-32 xl:text-3xl">
        {{ description }}
      </p>

      <p
        class="flex mx-auto justify-center gap-4 dark:text-gray-100 text-gray-800 mt-4 prose"
      >
        <span class="inline-flex gap-2 items-center"
          ><mdi-cached /> {{ date.toLocaleDateString() }}</span
        >
        <span class="inline-flex gap-2 items-center">
          <mdi-timer-sand /><span>{{ readingTime.minutes }}{{ t('min') }}</span>
        </span>
      </p>
      <img
        class="rounded mx-auto mt-6 shadow hover:shadow-md transition-shadow duration-200"
        alt="icatch"
        :src="icatch"
      />
    </div>
  </div>

  <div
    class="px-2 xl:flex xl:gap-16 2xl:gap-48 flex-row mx-auto mt-10"
    style="max-width: 65ch"
  >
    <slot />
    <div class="hidden xl:block">
      <toc class="sticky top-10 w-60" :url="url" :toc="toc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import Toc from '@/components/Toc.vue'
const { t } = useI18n()
const { meta, path } = useRoute()
console.log(useRoute().path)
import { useHead } from '@vueuse/head'
const domain = 'https://miyauchi.dev'
const url = `${domain}${path}`

const {
  title,
  description,
  icatch,
  readingTime,
  toc,
  updatedAt
} = meta.frontmatter
useHead({
  meta: [
    { property: 'og:image', content: icatch },
    {
      property: 'og:type',
      content: 'article'
    },
    { name: 'og:url', content: url },
    { name: 'og:site_name', content: "Tomoki Miyauchi's Blog" },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
const date = new Date(Date.parse(updatedAt))
</script>

<i18n lang="yml">
en:
  min: min
ja:
  min: 分
</i18n>
