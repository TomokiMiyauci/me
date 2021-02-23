<template>
  <router-link
    class="rounded-md overflow-hidden shadow hover:shadow-lg hover:bg-gray-50 transition duration-200 flex mb-4"
    :to="to"
  >
    <img
      class="w-16 h-16 m-2 sm:m-3 rounded sm:w-32 sm:h-32"
      :alt="alt"
      :src="img"
    />

    <div class="p-1 sm:p-2 flex gap-2 flex-col justify-between">
      <div class="sm:space-y-1">
        <h2
          class="hover:text-green-500 text-gray-700 line-clamp-2 transition duration-200 text-xl sm:text-2xl"
        >
          {{ title }}
        </h2>

        <p class="text-gray-500 line-clamp-2">
          {{ description }}
        </p>
        <!-- <router-link class="hidden sm:inline" :to="path"
              >もっと読む</router-link
            > -->
      </div>

      <div class="time opacity-50 no-underline text-sm -mt-1">
        <span class="mr-4 no-underline">{{ updatedAt }} </span>
        {{ readingTime }}
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string
  description: string
  img: string
  to: string
  alt: string
  updatedAt?: string
  readingTime?: string
}>()
</script>
