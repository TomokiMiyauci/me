<template>
  <ul>
    <li class="inline">
      <a
        :href="localePath('/posts')"
        class="align-middle hover:text-green-400 transition duration-200"
      >
        Blog
      </a>
    </li>
    <li v-if="to" class="inline dark:text-gray-100">
      <mdi-chevron-right />

      <a :href="to" class="align-middle ">
        {{ title }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { usePath } from '../_utils/path'

const { localePath } = usePath()
defineProps<{
  title?: string
  to?: string
}>()
</script>
