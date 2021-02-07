<template>
  <header class="bg-gray-800 px-4 py-1">
    <div
      class="container h-full px-6 mx-auto flex justify-between items-center"
    >
      <router-link class="text-4xl text-white" :to="'/'" tag="h1">
        miyauci.me
      </router-link>

      <span>
        <select
          v-model="locale"
          class="mr-3 rounded p-2 uppercase cursor-pointer focus:outline-none focus:ring-1"
        >
          <option
            v-for="locale in availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
        <router-link to="/ja/posts" class="text-2xl capitalize text-white">{{
          t('blog')
        }}</router-link>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { resolve } from '@/functions/resolver'
// import { isStartWithSlash, startWith } from '@/functions/utils'
const { locale, availableLocales, t } = useI18n()
const { replace, currentRoute, getRoutes } = useRouter()

watch(locale, (now) => {
  const path = resolve(
    {
      path: currentRoute.value.path,
      routes: getRoutes()
    },
    now as any
  )
  replace(path)
})
</script>

<i18n lang="yml">
en:
  blog: Blog
ja:
  blog: ブログ
</i18n>
