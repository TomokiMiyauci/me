<template>
  <div
    class="bg-gradient-to-b dark:via-teal-700 via-teal-300 from-white dark:from-gray-800 dark:to-gray-800 to-white px-4 pb-84 pt-8 sm:pt-16"
  >
    <div class="prose mb-5 mx-auto px-4">
      <h1
        class="xl:text-10xl text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 leading-none dark:text-white text-gray-800"
      >
        {{ title }}
      </h1>

      <p>
        <span> {{ date.toLocaleString() }},</span>{{ readingTime.text }}
      </p>
    </div>
    <img :src="cover" />
  </div>

  <slot />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

const { meta } = useRoute()
defineProps<{ frontmatter: unknown }>()

const { title, cover, readingTime, updatedAt } = meta.frontmatter
const date = new Date(Date.parse(updatedAt))
</script>
