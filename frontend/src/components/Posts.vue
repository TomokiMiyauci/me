<template>
  <div class="pb-84 pt-8 px-2 sm:pt-16">
    <div class="mb-5 mx-auto" style="max-width: 65ch">
      <h1 class="text-2xl mb-4">Blog</h1>

      <article-headline
        v-for="{ path, meta } in posts"
        :key="path"
        :title="meta.frontmatter.title"
        :description="meta.frontmatter.description"
        :img="meta.frontmatter.thumbnail"
        alt="thumbnail"
        :reading-time="meta.frontmatter.readingTime.text"
        :to="path"
        :updated-at="
          formatDate(meta.frontmatter.updatedAt).toLocaleDateString()
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

import ArticleHeadline from '@/components/ArticleHeadline.vue'
import { isStartWithSlashJaSlash } from '@/functions/utils'
const { locale, t } = useI18n()
const { path } = useRoute()
const { getRoutes } = useRouter()
const formatDate = (val: string): Date => new Date(Date.parse(val))

const lang = isStartWithSlashJaSlash(path) ? 'ja' : 'en'
const prefix = lang === 'ja' ? '/ja/posts/' : '/posts/'
const filterPosts = ({ meta, path }: RouteRecordNormalized) =>
  path.startsWith(prefix) && meta.frontmatter
const posts = computed(() => getRoutes().filter(filterPosts))

const jaPath = 'https://miyauchi.dev/ja/posts'
const enPath = 'https://miyauchi.dev/posts'
const title = `${t('blog')} | Tomoki Miyauchi`
const href = locale.value === 'ja' ? jaPath : enPath
useHead({
  title,
  meta: [
    { name: 'description', content: t('description') },
    { property: 'og:title', content: title },
    { property: 'og:description', content: "Tomoki Miyauchi's Blog" },
    { property: 'og:image', content: 'https://miyauchi.dev/logo.png' },
    { property: 'og:site_name', content: 'TM Blog' }
  ],
  link: [
    {
      ref: 'canonical',
      href
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

<i18n lang="yml">
en:
  blog: Blog
  description: Tomoki Miyauchi's technical blog. Mainly aim to disseminate technical and useful information such as information on the latest technology related to the Web and introduction of what was created as a project. I will send live information with a lot of actual code.

ja:
  blog: ブログ
  description: Tomoki Miyauchiの技術ブログです。主にWebに関する最新技術の情報や、プロジェクトとして作ったものの紹介など、技術的で役立つ情報の発信を目指します。実際のコードを多めに、生きた情報の発信をします。
</i18n>
