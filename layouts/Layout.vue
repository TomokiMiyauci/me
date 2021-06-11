<template>
  <TheHeader />

  <Article v-if="isPost" />
  <Content v-else />

  <TheFooter class="mb-19 md:mb-0" />
</template>

<script setup lang="ts">
import { useIsPath } from '../_utils/path'
import Article from '../components/Article.vue'

const { isPost } = useIsPath()

import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>
