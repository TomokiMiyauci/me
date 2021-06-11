<template>
  <a class="md:text-4xl" :href="localePath('/')">
    <span class="hidden md:inline">
      miyauci.me
    </span>
    <img
      loading="lazy"
      class="w-12 h-12 p-1 rounded-md bg-gradient-51 md:hidden"
      src="/icon.png"
    />
  </a>
</template>
<script setup lang="ts">
import { usePath } from '../_utils/path'

const { localePath } = usePath()
</script>
