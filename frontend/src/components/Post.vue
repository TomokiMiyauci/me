<template>
  <div
    class="px-2 pt-2 pb-4 xl:pb-12 dark:shadow-2xl bg-gradient-to-b via-gray-300 from-white dark:from-gray-700 dark:to-gray-700 dark:via-teal-700 to-white"
  >
    <div class="container xl:px-24 mx-auto text-gray-800">
      <breadcrumb class="mb-4" :breadcumb="breadcrumbList" />

      <h1
        class="xl:text-10xl text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 leading-none dark:text-gray-200 text-gray-800"
      >
        {{ title }}
      </h1>

      <p
        class="xl:mt-10 text-gray-600 dark:text-gray-100 sm:text-xl md:text-2xl xl:text-3xl"
      >
        {{ description }}
      </p>

      <p
        class="flex mx-auto justify-center space-x-4 dark:text-gray-100 text-gray-800 my-3 sm:mt-4 prose"
      >
        <span><mdi-cached class="mr-2" /> {{ date.toLocaleDateString() }}</span>
        <span>
          <mdi-timer-sand class="mr-2" /><span
            >{{ readingTime.minutes }}{{ t('min') }}</span
          >
        </span>
      </p>
      <img
        class="rounded mx-auto shadow hover:shadow-xl transition-shadow duration-200"
        alt="icatch"
        :src="icatch"
      />
    </div>
  </div>
  <div
    class="px-2 dark:text-white xl:flex xl:space-x-14 2xl:space-x-48 flex-row mx-auto mt-10"
    style="max-width: 65ch"
  >
    <slot />
    <div class="hidden xl:block">
      <toc class="sticky top-10 w-60" :url="url" :toc="toc" />
    </div>
  </div>

  <div style="max-width: 65ch" class="px-2 mx-auto">
    <h3
      class="text-2xl dark:text-gray-700 mt-10 mb-4 sm:mb-8 font-bold capitalize"
    >
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
import Breadcrumb from '@/components/Breadcrumb.vue'
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

const root = resolve({ path: '/', routes }, locale.value as Locale)
const rootURL = urlJoin(DOMAIN, root)
const blog = resolve({ path: '/posts', routes }, locale.value as Locale)
const blogURL = urlJoin(DOMAIN, blog)

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
const breadcrumbList = [
  { to: root, home: true },
  { to: blog, text: t('blog') },
  { to: fullPath, text: title }
]
const richText = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('home'),
      item: rootURL
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: t('blog'),
      item: blogURL
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
      children: JSON.stringify(richText)
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
