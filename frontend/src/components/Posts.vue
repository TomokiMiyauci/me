<template>
  <div class="pb-84 pt-8 sm:pt-16">
    <div class="prose mb-5 mx-auto">
      <ul>
        <router-link
          v-for="{ path, meta } in posts"
          :key="path"
          class="item block font-normal mb-6 mt-2 no-underline"
          :to="path"
        >
          <li class="no-underline">
            <div class="title text-lg">
              {{ meta.frontmatter.title }}
            </div>
            <div class="time opacity-50 no-underline text-sm -mt-1">
              <span class="mr-4 no-underline"
                >{{
                  formatDate(meta.frontmatter.updatedAt).toLocaleDateString()
                }}
              </span>
              {{ meta.frontmatter.readingTime.text }}
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

import { isStartWithSlashJaSlash } from '@/functions/utils'
const { path } = useRoute()
const { getRoutes } = useRouter()
const formatDate = (val: string): Date => new Date(Date.parse(val))

const lang = isStartWithSlashJaSlash(path) ? 'ja' : 'en'
const prefix = lang === 'ja' ? '/ja/posts/' : '/posts'
const filterPosts = ({ meta, path }: RouteRecordNormalized) =>
  path.startsWith(prefix) && meta.frontmatter
const posts = computed(() => getRoutes().filter(filterPosts))
</script>
