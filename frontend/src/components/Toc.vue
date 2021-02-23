<template>
  <div
    class="shadow hover:shadow-md hover:bg-gray-50 transition duration-200 text-gray-700 rounded px-6 py-4"
  >
    <h3 class="uppercase">{{ t('title') }}</h3>
    <ul>
      <li
        v-for="{ title, hash, depth } in toc"
        :key="title"
        class="hover:translate-x-2 delay-100 transform transition duration-200"
        :class="{ 'ml-4': depth === 3, 'ml-8': depth === 4 }"
      >
        <a :href="`${url}${hash}`">{{ title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import type { Toc } from '@/functions/markdown/toc'

defineProps<{
  toc: Toc[]
  url: string
}>()
</script>

<i18n lang="yml">
en:
  title: table of contents
ja:
  title: 目次
</i18n>
