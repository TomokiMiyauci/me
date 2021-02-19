<template>
  <div class="pb-84 pt-8 sm:pt-16">
    <div class="mb-5 mx-auto" style="max-width: 65ch">
      <h1 class="text-2xl mb-4">Blog</h1>

      <router-link
        v-for="{ path, meta } in posts"
        :key="path"
        class="rounded-md overflow-hidden shadow hover:shadow-lg hover:bg-gray-50 transition duration-200 flex mb-4"
        :to="path"
      >
        <img
          class="w-14 h-14 rounded-md sm:w-32 sm:h-32"
          :src="meta.frontmatter.thumbnail"
        />

        <div class="sm:py-2 pl-4 flex flex-col justify-between">
          <h2
            class="hover:text-green-500 transition duration-200 text-xl sm:text-2xl"
          >
            {{ meta.frontmatter.title }}
          </h2>

          <div class="time opacity-50 no-underline text-sm -mt-1">
            <span class="mr-4 no-underline"
              >{{ formatDate(meta.frontmatter.updatedAt).toLocaleDateString() }}
            </span>
            {{ meta.frontmatter.readingTime.text }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

import { isStartWithSlashJaSlash } from '@/functions/utils'
const { locale } = useI18n()
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

const content = locale.value === 'ja' ? jaPath : enPath
useHead({
  meta: [
    { name: 'description', content: "Tomoki Miyauchi's Blog" },
    { property: 'og:title', content: 'Tomoki Miyauchi' },
    { property: 'og:description', content: "Tomoki Miyauchi's Blog" },
    { property: 'og:image', content: 'https://miyauchi.dev/logo.png' },
    { property: 'og:site_name', content: 'TM Blog' }
  ],
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
