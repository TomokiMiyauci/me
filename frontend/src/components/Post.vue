<template>
  <div class="pb-84 pt-4 sm:pt-16">
    <div class="mb-5 mx-auto" style="max-width: 65ch">
      <router-link to="/ja/posts">
        <button
          class="shadow flex items-center rounded-full p-2 focus:ring-2 hover:bg-gray-50 transition duration-200 focus:outline-none"
        >
          <mdi-chevron-left class="w-7 h-7" />
        </button>
      </router-link>
      <h1
        class="xl:text-10xl mt-4 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-4xl mb-0 leading-none dark:text-gray-800 text-gray-800"
      >
        {{ title }}
      </h1>

      <p class="mt-2 flex gap-4 text-gray-500 prose">
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

  <slot />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const { t } = useI18n()
const { meta, fullPath } = useRoute()

import { useHead } from '@vueuse/head'
const domain = 'https://miyauchi.dev'
const url = `${domain}${fullPath}`

const { title, icatch, readingTime, updatedAt } = meta.frontmatter
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
