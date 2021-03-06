<template>
  <header class="dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-1">
    <div
      class="container h-full sm:px-6 mx-auto flex justify-between items-center"
    >
      <router-link class="text-2xl sm:text-4xl" :to="localePath('/')">
        <h1>miyauci.me</h1>
      </router-link>

      <span class="space-x-4 flex items-center">
        <router-link
          :to="localePath('/posts')"
          class="text-xl sm:text-2xl capitalize"
          >{{ t('blog') }}</router-link
        >

        <span class="group relative uppercase"
          >{{ currentRoute.path.startsWith('/ja') ? 'ja' : 'en' }}
          <span
            class="opacity-0 shadow bg-white mx-auto rounded p-2 right-0 block invisible delay-200 group-hover:visible group-hover:opacity-100 absolute transition duration-200"
          >
            <ol>
              <li>
                <router-link :to="localePathEn(currentRoute.path)"
                  >EN</router-link
                >
              </li>
              <li>
                <router-link :to="localePathJa(currentRoute.path)"
                  >JA</router-link
                >
              </li>
            </ol>
          </span>
        </span>

        <button
          class="outline-none focus:outline-none rounded p-1 transition duration-200 focus:ring-2"
          title="Toggle Color Scheme"
          @click="toggleDark"
        >
          <ri-moon-line v-show="isDark" />
          <ri-sun-line v-show="!isDark" />
        </button>

        <a
          :href="'/feed.xml'"
          target="_blank"
          title="RSS"
          class="hidden md:block hover:text-orange-400 transition-colors duration-200"
        >
          <la-rss-square class="w-6 h-6" />
        </a>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import routes from 'pages-generated'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { isDark } from '@/composites'
import { resolve } from '@/functions/resolver'
import i18n from '@/plugins/i18n'
const toggleDark = () => {
  isDark.value = !isDark.value
}
import { useHead } from '@vueuse/head'

const { locale, availableLocales, t } = useI18n()
const localePath = (path: string) => {
  return resolve({ path, routes }, locale.value as 'ja' | 'en')
}

const localePathJa = (path: string) => resolve({ path, routes }, 'ja')
const localePathEn = (path: string) => resolve({ path, routes }, 'en')

const { replace, currentRoute, getRoutes } = useRouter()
watch(locale, (now) => {
  i18n.global.locale.value = now
  const path = resolve(
    {
      path: currentRoute.value.path,
      routes: getRoutes()
    },
    now as any
  )
  replace(path)
})

useHead({
  htmlAttrs: [{ lang: locale }]
})
</script>

<i18n lang="yml">
en:
  blog: Blog
ja:
  blog: ブログ
</i18n>
