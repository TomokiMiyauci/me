<template>
  <div class="container mx-auto">
    <h1 class="text-center text-4xl my-4 md:my-10">Blog</h1>
    <div
      class="
      p-4
      mx-auto
      md:(grid
      grid-cols-2
      gap-14)
      max-w-5xl
    "
    >
      <ArticleHeadline
        v-for="{
          title,
          description,
          thumbnail,
          relativePath,
          readingTime,
          lastUpdated
        } in posts"
        :title="title"
        :description="description"
        :to="localePath(relativePath)"
        :img="thumbnail"
        :reading-time="readingTime"
        :last-updated="lastUpdated"
        alt="icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteData } from 'vitepress'
import type { Ref } from 'vue'
import { usePath } from '../_utils/path'
import { useLang } from '../_utils/language'
import type { Post } from '../_types/article'
import ArticleHeadline from './ArticleHeadline.vue'

const { localePath } = usePath()
const { lang } = useLang()

const siteData = useSiteData() as Ref<{ customData: { en: Post[], ja: Post[] } }>
const posts = siteData.value.customData[lang.value]
</script>
