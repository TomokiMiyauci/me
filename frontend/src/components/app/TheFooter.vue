<template>
  <footer
    class="px-2 py-12 bg-gradient-to-b from-white via-gray-200 to-gray-400"
  >
    <div
      class="m-auto container sm:px-6 flex-col-reverse items-center md:flex-row flex md:justify-between"
    >
      <span class="text-sm text-gray-600">
        {{ new Date().getFullYear() }} ©Tomoki Miyauchi</span
      >

      <div
        class="flex flex-col text-gray-600 md:flex-row items-center md:space-x-7"
      >
        <router-link :to="localePath(currentRoute.path, switchedLocale)">
          <emojione-flag-for-united-kingdom
            v-if="switchedLocale === 'en'"
            class="w-8 h-8"
          />
          <emojione-flag-for-japan v-else class="w-8 h-8" />
        </router-link>
        <div class="my-4 space-x-4">
          <a
            href="https://www.npmjs.com/~miyauci"
            target="_brank"
            class="transition duration-200 hover:text-red-500"
          >
            <mdi-npm-variant class="w-8 h-8" />
          </a>

          <a
            href="https://twitter.com/miyauchi_tomoki"
            target="_brank"
            class="transition duration-200 hover:text-blue-400"
          >
            <mdi-twitter class="w-8 h-8" />
          </a>

          <a
            href="https://github.com/TomokiMiyauci"
            target="_brank"
            class="transition duration-200 hover:text-purple-600"
          >
            <mdi-github class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useLocalePath } from '@/composites'
const { currentRoute } = useRouter()
const { localePath, switchedLocale } = useLocalePath()
</script>
