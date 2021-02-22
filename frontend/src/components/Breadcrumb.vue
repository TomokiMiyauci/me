<template>
  <ul>
    <li
      v-for="({ to, text, home }, index) in breadcumb"
      :key="to"
      class="inline"
    >
      <router-link
        class="hover:text-green-400 transition duration-200"
        :to="to"
        active-class="hover:text-white"
      >
        <mdi-home v-if="home" />
        {{ text }}
      </router-link>
      <mdi-chevron-right v-if="breadcumb.length - 1 !== index" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  breadcumb: {
    icon?: string
    text?: string
    home?: boolean
    to: string
  }[]
}>()
</script>
