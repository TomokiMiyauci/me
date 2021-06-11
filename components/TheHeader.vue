<template>
  <header
    class="
      nav-bar
      fixed
      md:sticky
      md:top-0
      md:bottom-auto
      md:drop-shadow
      md:mx-auto
      md:border-none
      w-full
      z-50
      bottom-0
      bg-gray-100
      border-t
    "
  >
    <div
      class="container max-w-8xl p-3 md:py-6 mx-auto items-center
    justify-between flex"
    >
      <span class="md:flex md:space-x-10">
        <Logo />
        <a
          :href="localePath('/posts')"
          class="link-btn absolute md:(static transform-none) transform -translate-x-1/2 left-1/2 p-4 md:p-2 md:px-3 -top-9 space-x-2 border"
        >
          <grommet-icons-article class="w-10 h-10 md:w-6 md:h-6" />
          <span class="hidden md:inline">blog</span>
        </a>
      </span>

      <div class="flex space-x-4">
        <div class="relative link-btn">
          <button @click="toggleMenu">
            <mdi-translate />
          </button>

          <ul
            v-if="isShowMenu"
            ref="button"
            class="
          absolute
          rounded-md
          bg-white
          mt-2
          right-0
          bottom-10
          shadow
          text-lg
          md:(bottom-auto)
          hover:shadow-md
          p-3
        "
          >
            <li>
              <a :href="langPath('ja')"> 日本語 </a>
            </li>

            <li>
              <a :href="langPath('en')"> English </a>
            </li>
          </ul>
        </div>

        <button
          title="Color mode"
          class="
        hover:(bg-gray-200
        dark:bg-gray-700)
        transition-colors
        duration-300
        rounded-lg
        p-2.5
        text-xs
        leading-none
        bg-gray-100
        dark:bg-gray-800
      "
          @click="toggleDark"
        >
          <carbon-moon v-if="isDark" />
          <jam-sun-f v-else />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import { usePath } from '../_utils/path'
import Logo from './Logo.vue'

import { ref } from 'vue'
const isDark = useDark()
const isShowMenu = ref<boolean>(false)
const toggleDark = useToggle(isDark)
const toggleMenu = useToggle(isShowMenu)

const button = ref<HTMLButtonElement>()

const { localePath, langPath } = usePath()

onClickOutside(button, () => {
  isShowMenu.value = false
})
</script>

<style>
.link-btn {
  @apply rounded-full bg-gray-100 p-3 md:(py-2 px-3);
}
</style>
