<template>
  <div class="pb-84 pt-8 sm:pt-16">
    <div class="mb-5 mx-auto" style="max-width: 65ch">
      <router-link to="/ja/posts">←記事一覧</router-link>
      <h1
        class="xl:text-10xl mt-4 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-4xl mb-0 leading-none dark:text-gray-800 text-gray-800"
      >
        {{ title }}
      </h1>

      <p class="mt-2 prose">
        <span class="mr-4"> {{ date.toLocaleDateString() }}</span
        >{{ readingTime.text }}
      </p>
      <img
        class="rounded mx-auto mt-6 shadow hover:shadow-md transition-shadow duration-200"
        alt="icatch"
        :src="icatch"
      />
    </div>
  </div>

  <slot />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const { meta } = useRoute()

const { title, icatch, readingTime, updatedAt } = meta.frontmatter
const date = new Date(Date.parse(updatedAt))
</script>
