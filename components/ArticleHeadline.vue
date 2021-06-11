<template>
  <a
    class="
      rounded-md
      overflow-hidden
      shadow
      hover:shadow-lg
      hover:bg-gray-50
      transition
      duration-200
      flex
      mb-4
    "
    :href="to"
  >
    <img
      :width="500"
      :height="500"
      loading="lazy"
      class="w-16 h-16 m-2 sm:m-3 rounded sm:w-32 sm:h-32"
      :alt="alt"
      :src="img"
    />

    <div class="p-1 sm:p-2 flex space-y-2 flex-col justify-between">
      <div class="sm:space-y-1">
        <h2
          class="
            hover:text-green-500
            text-gray-700
            line-clamp-2
            transition
            duration-200
            text-xl
            sm:text-2xl
          "
        >
          {{ title }}
        </h2>

        <p class="text-gray-500 line-clamp-2 md:line-clamp-3">
          {{ description }}
        </p>
      </div>

      <div
        v-if="or(lastUpdated, readingTime)"
        class="time opacity-50 no-underline text-sm -mt-1"
      >
        <span v-if="lastUpdated" class="mr-4 no-underline"
          >{{ new Date(lastUpdated).toLocaleDateString(lang) }}
        </span>
        <span v-if="readingTime">{{ readingTime }} min read</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { or } from 'fonction'
import { useLang } from '../_utils/language'

const { lang } = useLang()
defineProps<{
  title: string
  description: string
  img: string
  to: string
  alt: string
  lastUpdated?: number
  readingTime?: number
}>()
</script>
