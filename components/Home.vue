<template>
  <main class="nav-bar container max-w-4xl mx-auto p-4 md:p-14">
    <Me />

    <div class="mt-16 md:mt-30 md:grid md:grid-cols-2">
      <a
        :href="localePath('/posts')"
        class="rounded-md overflow-hidden text-gray-700 relative text-2xl block h-60 flex justify-center items-center shadow"
      >
        <grommet-icons-article class="w-full h-full" />
        <span
          class="font-bold border absolute top-0 left-0 p-2 rounded-br-md bg-gray-200"
          >Blog</span
        >
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import Me from './Me.vue'
import { usePath } from '../_utils/path'

const { localePath } = usePath()
</script>
