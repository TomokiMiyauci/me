<template>
  <div class="code-group">
    <div
      class="rounded-t-md border-b-2 px-2 bg-gray-800 text-sm text-white relative"
    >
      <button
        v-for="({ label }, index) in tabs"
        :key="label"
        class="px-4 py-3 text-gray-400 font-bold font-mono hover:bg-green-800 transition border-transparent duration-300 border-b-2 focus:border-green-600 focus:bg-gray-700"
        :class="[{ 'bg-gray-700': activeTab === index }]"
        @click="switchTab(index)"
        @keypress="switchTab(index)"
      >
        {{ label }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useContext } from 'vue'
const { slots } = useContext()
const tabs = ref<{ label: string; elm: HTMLElement | null }[]>([])
const activeTab = ref(0)

const switchTab = (index: number): void => {
  activeTab.value = index
  tabs.value.forEach(({ elm }) => {
    elm?.classList.remove('active')
  })
  tabs.value[index].elm?.classList.add('active')
}

onMounted(() => {
  type Slots = typeof slots
  tabs.value =
    slots.default?.().map(({ props, children }) => {
      return {
        label: props?.label,
        elm: ((children as Slots)?.default?.()[0]?.el as HTMLElement)
          .parentElement
      }
    }) || []
})
</script>

<style scoped lang="scss">
button {
  @apply outline-none;
}

/* stylelint-disable selector-pseudo-element-no-unknown */
.code-group ::v-deep {
  & pre[class*='language-'] {
    @apply rounded-t-none mt-0;
  }
}
/* stylelint-enable selector-pseudo-element-no-unknown */
</style>
