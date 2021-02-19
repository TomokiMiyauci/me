<template>
  <post v-if="isPost">
    <slot />
  </post>

  <posts v-else-if="isPosts" />

  <profile v-else-if="isProfile">
    <slot />
  </profile>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'

import Post from '@/components/Post.vue'
import Profile from '@/components/Profile.vue'
import { isEndsWithSlash } from '@/functions/utils'
const { path } = useRoute()
const rootPath = ['/', '/ja']
const postsPath = rootPath.map((path) => {
  const _path = isEndsWithSlash(path) ? path : `${path}/`
  return `${_path}posts`
})
const postPath = postsPath.map((path) => `${path}/`)
const isProfile = computed(() => rootPath.includes(path))
const isPosts = computed(() => postsPath.includes(path))
const isPost = computed(() => postPath.some((_path) => path.startsWith(_path)))

defineProps<{ frontmatter: { title: string } }>()
</script>
