import { onBeforeUnmount, onMounted, ref } from 'vue'

const options = {
  threshold: 1
}
const callback = (anchors: HTMLAnchorElement[]) => (
  entry: IntersectionObserverEntry[]
): void => {
  if (entry.length !== 1) return
  const { target, isIntersecting } = entry[0]
  const anchor = target as HTMLAnchorElement
  if (isIntersecting) {
    const index = anchors.findIndex((a) => a === anchor)
    const target = anchors[index - 1]

    if (window.scrollY > anchor.offsetTop - 200) {
      if (target) {
        history.replaceState({}, '', target.hash)
      } else {
        history.replaceState({}, '', ' ')
      }
    }
  } else {
    if (window.scrollY > anchor.offsetTop) {
      const hash = anchor.hash
      history.replaceState(null, '', hash)
    }
  }
}

const useFragmentObserver = (selectors: string): void => {
  const anchors = ref<HTMLAnchorElement[]>([])
  const observer = ref<IntersectionObserver>()
  onMounted(() => {
    anchors.value = Array.from(
      document.querySelectorAll(selectors)
    ) as HTMLAnchorElement[]

    observer.value = new IntersectionObserver(callback(anchors.value), options)

    anchors.value.forEach((anchor) => {
      observer.value?.observe(anchor)
    })
  })

  onBeforeUnmount(() => {
    anchors.value.forEach((anchor) => {
      observer.value?.unobserve(anchor)
    })
  })
}

export { useFragmentObserver }
