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
import routes from 'pages-generated'
import urlJoin from 'url-join'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

import ArticleHeadline from '@/components/ArticleHeadline.vue'
import type { Locale } from '@/constants'
import { DOMAIN } from '@/constants'
import { resolve } from '@/functions/resolver'
import { isStartWithSlashJaSlash } from '@/functions/utils'
import { jsonld } from '@/packages/jsonld'

const { locale, t } = useI18n()
const { path } = useRoute()
const { getRoutes } = useRouter()
const formatDate = (val: string): Date => new Date(Date.parse(val))
const domain = import.meta.env.PROD ? DOMAIN : 'http://localhost:3000'

const lang = isStartWithSlashJaSlash(path) ? 'ja' : 'en'
const prefix = lang === 'ja' ? '/ja/posts/' : '/posts/'
const filterPosts = ({ meta, path }: RouteRecordNormalized) =>
  path.startsWith(prefix) && meta.frontmatter
const posts = computed(() => getRoutes().filter(filterPosts))
const root = resolve({ path: '/', routes }, locale.value as Locale)
const rootURL = urlJoin(domain, root)
const blog = resolve({ path: '/posts', routes }, locale.value as Locale)
const blogURL = urlJoin(domain, blog)

const richResult = jsonld({
  breadcrumb: [
    {
      name: t('home'),
      url: rootURL
    },
    {
      name: t('blog'),
      url: blogURL
    }
  ]
})

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
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(richResult)
    }
  ]
})
</script>

<i18n lang="yml">
en:
  home: Home
  blog: Blog
  description: Tomoki Miyauchi's technical blog. Mainly aim to disseminate technical and useful information such as information on the latest technology related to the Web and introduction of what was created as a project. I will send live information with a lot of actual code.

ja:
  home: ホーム
  blog: ブログ
  description: Tomoki Miyauchiの技術ブログです。主にWebに関する最新技術の情報や、プロジェクトとして作ったものの紹介など、技術的で役立つ情報の発信を目指します。実際のコードを多めに、生きた情報の発信をします。
</i18n>
