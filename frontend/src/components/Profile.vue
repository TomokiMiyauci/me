<template>
  <h1
    class="text-2xl md:text-5xl from-gray-700 text-gray-50 via-gray-800 to-purple-800 bg-gradient-to-b shadow-xl text-center py-10 md:p-32"
  >
    Hello. I am {{ meta.frontmatter.title }}.
  </h1>
  <div class="container px-2 mx-auto mt-10 space-y-10">
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
      <div
        class="shadow hover:shadow-xl transition duration-200 mx-auto max-w-2xl rounded-md"
      >
        <div class="flex border-b gap-6 p-6 items-center">
          <vite class="w-1/2 h-full" />
          <fa-solid-blog class="w-1/2 h-full text-purple-500" />
        </div>

        <div class="p-4">
          <h2 class="text-3xl flex justify-between">
            <router-link
              :to="localePath('/posts', locale)"
              class="hover:text-teal-500 transition duration-200"
              >Tech Blog</router-link
            >
            <router-link
              class="shadow bg-teal-400 text-gray-700 inline-block space-x-1 px-1 rounded-md w-10 h-10 overflow-hidden hover:w-28 transition-all whitespace-pre duration-300"
              :to="localePath('/posts', locale)"
            >
              <mdi-open-in-new class="w-8 h-8" /><span>View</span>
            </router-link>
          </h2>

          <p>My new tech blog build with Vite SSG.</p>
          <a
            class="text-xl text-teal-400"
            href="https://intellisense.dev"
            target="_blank"
            >Previous blog is here.</a
          >
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import Vite from '@/assets/svgs/vite.svg'
import { useLocalePath } from '@/composites'
const { localePath } = useLocalePath()
const { locale, t } = useI18n()

const jaPath = 'https://miyauchi.dev/ja'
const enPath = 'https://miyauchi.dev'

const content = locale.value === 'ja' ? jaPath : enPath

const { meta } = useRoute()
useHead({
  title: `${t('home')} | Tomoki Miyauchi`,
  meta: [{ name: 'description', content: t('description') }],
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

<i18n lang="yml">
en:
  home: Home
  description: This is Tomoki Miyauchi's personal site. You can check the activity record of Tomoki Miyauchi such as technical blog and list of projects. The site is made up of Vite and SSG and is focused on internationalization.
ja:
  home: ホーム
  description: Tomoki Miyauchiの個人サイトです。技術ブログや、プロジェクトの一覧などTomoki Miyauchiが行った活動記録を確認できます。サイトはViteとSSGで作られており、国際化に力を入れています。
</i18n>
