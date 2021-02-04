<template>
  <header class="bg-gray-800 px-4 py-1">
    <div
      class="container h-full px-6 mx-auto flex justify-between items-center"
    >
      <router-link class="text-4xl text-white" :to="'/'" tag="h1">
        miyauci.me
      </router-link>

      <!-- <select v-model="locale">
          <option
            v-for="locale in availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select> -->
      <router-link to="/ja/posts" class="text-2xl capitalize text-white"
        >blog</router-link
      >
    </div>
  </header>
</template>

<script setup lang="ts">
// import { watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useRouter } from 'vue-router'

// import { isStartWithSlash, startWith } from '@/functions/utils'
// const { locale, availableLocales, t } = useI18n()
// const { replace, currentRoute } = useRouter()

// watch(locale, (now, prev) => {
//   console.log(now, prev, currentRoute.value.path)

//   if (!isStartWithSlash(currentRoute.value.path)) return
//   const prefix = `/${prev}`
//   const isStart = startWith(prefix, currentRoute.value.path)

//   const path = isStart
//     ? currentRoute.value.path.replace(prefix, '')
//     : `${prefix}${currentRoute.value.path}`

//   replace(path)
// })
// const localePath = (path: string): string =>
//   locale.value === 'en' ? path : `/${locale.value}${path}`
</script>
