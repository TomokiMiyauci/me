import { props } from 'fonction'
import typescript from '@iconify-icons/logos/typescript-icon'
import yarn from '@iconify-icons/logos/yarn'
import preact from '@iconify-icons/logos/preact'
import react from '@iconify-icons/logos/react'
import vue3 from '@iconify-icons/logos/vue'
import tailwindcss from '@iconify-icons/logos/tailwindcss-icon'
import vitejs from '@iconify-icons/logos/vitejs'
import jest from '@iconify-icons/logos/jest'
import storybook from '@iconify-icons/logos/storybook-icon'
import tagOutline from '@iconify-icons/mdi/tag-outline'
import packageVariantClosed from '@iconify-icons/mdi/package-variant-closed'
import seedOutline from '@iconify-icons/mdi/seed-outline'
import accessPoint from '@iconify-icons/mdi/access-point'
import { isUndefined } from '@miyauci/is-valid'

const iconMeta = (tag: string) => {
  const icon = props(tag, ICON_MAP) as object | undefined
  const wellKnown = !isUndefined(icon)

  return {
    tagIcon: icon ?? tagOutline,
    wellKnown
  }
}

const ICON_MAP = {
  typescript,
  yarn,
  react,
  preact,
  fetch: accessPoint,
  storybook,
  vite: vitejs,
  jest,
  package: packageVariantClosed,
  tutorial: seedOutline,
  vue3,
  tailwindcss
}

export { iconMeta }
