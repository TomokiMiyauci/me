<template>
  <div class="px-4 pb-84 pt-8 sm:pt-16">
    <div class="prose mb-5 mx-auto">
      <router-link v-if="!isWhitelist" to="/ja/posts">←記事一覧</router-link>
      <h1
        class="xl:text-10xl mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 leading-none dark:text-white text-gray-800"
      >
        {{ title }}
      </h1>

      <p v-if="!isWhitelist">
        <span class="mr-4"> {{ date.toLocaleDateString() }}</span
        >{{ readingTime.text }}
      </p>
    </div>
    <img :src="cover" />
  </div>

  <slot />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
const { meta, path } = useRoute()
const ignorePath = ['/', '/blog', '/ja', '/ja/posts']
defineProps<{ frontmatter: unknown }>()

const { title, cover, readingTime, updatedAt } = meta.frontmatter
const date = new Date(Date.parse(updatedAt))
const isWhitelist = computed(() => ignorePath.includes(path))
</script>
