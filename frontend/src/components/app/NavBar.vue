<template>
  <header class="dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-1">
    <div
      class="container h-full sm:px-6 mx-auto flex justify-between items-center"
    >
      <router-link class="text-2xl sm:text-4xl" :to="localePath('/')" tag="h1">
        miyauci.me
      </router-link>

      <span class="space-x-4 flex items-center">
        <router-link
          :to="localePath('/posts')"
          class="text-xl sm:text-2xl capitalize"
          >{{ t('blog') }}</router-link
        >
        <select
          v-model="locale"
          class="mr-3 dark:text-gray-700 p-2 rounded uppercase cursor-pointer focus:outline-none focus:ring-2"
        >
          <option
            v-for="locale in availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>

        <button
          class="outline-none focus:outline-none rounded p-1 transition duration-200 focus:ring-2"
          title="Toggle Color Scheme"
          @click="toggleDark"
        >
          <ri-moon-line v-show="isDark" />
          <ri-sun-line v-show="!isDark" />
        </button>
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
