<template>
  <div class="code-block" :class="[active && 'active']">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  label: string
  active: boolean
}>()
</script>

<style scoped>
.code-block {
  @apply hidden;
}
.code-block.active {
  @apply block;
}
</style>
