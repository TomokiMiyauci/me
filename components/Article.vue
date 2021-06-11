<template>
  <article class="p-4 mx-auto">
    <div class="container xl:px-24 mx-auto mb-10 text-gray-800">
      <Breadcrumb
        class="mb-5"
        :to="localePath(normalizedPath)"
        :title="pageData.title"
      />
      <h1
        class="
          xl:text-9xl
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-8xl
          mb-4
          leading-none
          dark:text-gray-200
          text-gray-800
        "
      >
        {{ pageData.title }}
      </h1>

      <p
        class="
          xl:mt-10
          text-gray-500
          dark:text-gray-100
          sm:text-xl
          md:text-2xl
          xl:text-3xl
        "
      >
        {{ pageData.description }}
      </p>

      <div class="flex justify-center space-x-6 my-6">
        <span class="space-x-2">
          <mdi-cached />
          {{ new Date(pageData.lastUpdated).toLocaleDateString() }}</span
        >
        <span v-if="readingTime" class="space-x-2">
          <mdi-timer-sand /><span>{{ readingTime }} min</span>
        </span>
      </div>

      <img
        :width="1280"
        :height="670"
        loading="lazy"
        class="
          rounded
          mx-auto
          w-full
          shadow
          hover:shadow-xl
          transition-shadow
          duration-200
        "
        alt="icatch"
        :src="pageData.frontmatter.icatch"
      />
    </div>

    <Content class="prose mx-auto" />

    <hr class="prose mx-auto mt-4" />

    <div class=" max-w-prose mx-auto my-10">
      <h3 class="text-3xl mb-6">Other Article</h3>

      <ArticleHeadline
        v-if="prev"
        :title="prev.title"
        :description="prev.description"
        :img="prev.thumbnail"
        :to="localePath(prev.relativePath)"
        :reading-time="prev.readingTime"
        :last-updated="prev.lastUpdated"
        alt="hoge"
      />

      <ArticleHeadline
        v-if="next"
        :title="next.title"
        :description="next.description"
        :img="next.thumbnail"
        :reading-time="next.readingTime"
        :to="localePath(next.relativePath)"
        :last-updated="next.lastUpdated"
        alt="hoge"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { usePageData, useSiteData } from 'vitepress'
import { computed } from 'vue'
import type { Ref } from 'vue'
import ArticleHeadline from './ArticleHeadline.vue'
import type { SiteData } from '../_types/article'
import { useLang } from '../_utils/language'
import { usePath } from '../_utils/path'
import Breadcrumb from './Breadcrumb.vue'
import { first } from 'fonction'

const pageData = usePageData()
const siteData = useSiteData() as Ref<SiteData>
const {  localePath, normalizedPath } = usePath()
const { lang } = useLang()

const link = computed(() => siteData.value.customData.link[lang.value])
const next = computed(() => link.value[normalizedPath.value]['next'])
const prev = computed(() => link.value[normalizedPath.value]['prev'])
const readingTime = computed(() => first(siteData.value.customData[lang.value].filter(({relativePath})=> relativePath === normalizedPath.value))?.readingTime )
</script>
