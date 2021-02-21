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

  <div class="mx-auto mt-10" style="max-width: 65ch">
    <h3 class="text-2xl px-2 mb-4 sm:mb-8 font-bold capitalize">
      {{ t('title') }}
    </h3>
    <article-headline
      v-if="prev"
      :title="prev.title"
      :description="prev.description"
      :img="prev.thumbnail"
      alt="next article thumbnail"
      :to="prev.path"
    />

    <article-headline
      v-if="next"
      :title="next.title"
      :description="next.description"
      :img="next.thumbnail"
      alt="next article thumbnail"
      :to="next.path"
    />
  </div>
</template>

<script setup lang="ts">
import routes from 'pages-generated'
import urlJoin from 'url-join'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import ArticleHeadline from '@/components/ArticleHeadline.vue'
import Toc from '@/components/Toc.vue'
import type { Locale } from '@/constants'
import { DOMAIN } from '@/constants'
import { resolve } from '@/functions/resolver'
const { t, locale } = useI18n()
const { meta, path, fullPath } = useRoute()

import { useHead } from '@vueuse/head'
const url = urlJoin(DOMAIN, path)
const en = resolve({ path, routes }, 'en')
const ja = resolve({ path, routes }, 'ja')

const root = urlJoin(
  DOMAIN,
  resolve({ path: '/', routes }, locale.value as Locale)
)
const blog = urlJoin(
  DOMAIN,
  resolve({ path: '/posts', routes }, locale.value as Locale)
)
console.log(root, blog)
const {
  title,
  description,
  icatch,
  readingTime,
  toc,
  updatedAt,
  next,
  prev
} = meta.frontmatter

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('home'),
      item: root
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: t('blog'),
      item: blog
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: title,
      item: urlJoin(DOMAIN, fullPath)
    }
  ]
}
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
  ],
  link: [
    {
      rel: 'canonical',
      href: url
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${DOMAIN}${en}`
    },
    {
      rel: 'alternate',
      hreflang: 'ja',
      href: `${DOMAIN}${ja}`
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${DOMAIN}${en}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumb)
    }
  ]
})
const date = new Date(Date.parse(updatedAt))
</script>

<i18n lang="yml">
en:
  min: min
  title: other articles
  home: Home
  blog: Blog
ja:
  min: 分
  title: 他の記事
  home: ホーム
  blog: ブログ
</i18n>

<style>
@media (min-width: 1024px) {
  .min {
    min-width: 65ch;
  }
}
</style>
