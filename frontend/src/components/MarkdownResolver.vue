<template>
  <post v-if="isPost">
    <slot />
  </post>

  <posts v-else-if="isPosts" />

  <template v-else-if="isProfile">
    <h1 class="prose mx-auto mt-10">{{ frontmatter.title }}</h1>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'

import Post from '@/components/Post.vue'
const { path } = useRoute()
const rootPath = ['/', '/ja/']
const postsPath = rootPath.map((path) => `${path}posts`)
const postPath = postsPath.map((path) => `${path}/`)
const isProfile = computed(() => rootPath.includes(path))
const isPosts = computed(() => postsPath.includes(path))
const isPost = computed(() => postPath.some((_path) => path.startsWith(_path)))

const { frontmatter } = defineProps<{ frontmatter: { title: string } }>()
</script>
