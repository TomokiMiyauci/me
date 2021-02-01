<template>
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
        <!-- <div class="time opacity-50 text-sm -mt-1">
          {{ formatDate(route.meta.frontmatter.date) }}
          <span v-if="route.meta.frontmatter.duration"
            >· {{ route.meta.frontmatter.duration }}</span
          >
        </div> -->
      </li>
    </router-link>
  </ul>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
import { useRouter } from 'vue-router'

const filterPosts = ({ meta, path }: RouteRecordNormalized) =>
  path.startsWith('/posts') && meta.frontmatter
const posts = useRouter().getRoutes().filter(filterPosts)
</script>
