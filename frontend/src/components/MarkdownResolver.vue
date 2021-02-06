<template>
  <post v-if="isPost">
    <slot />
  </post>

  <posts v-else-if="isPosts" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'

import Post from '@/components/Post.vue'
const { path } = useRoute()
const postsPath = ['/posts', '/ja/posts']
const postPath = postsPath.map((path) => `${path}/`)
const isPosts = computed(() => postsPath.includes(path))
const isPost = computed(() => postPath.some((_path) => path.startsWith(_path)))

defineProps<{ frontmatter: unknown }>()
</script>
