import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import typescriptIcon from '@iconify-icons/logos/typescript-icon'
import yarn from '@iconify-icons/logos/yarn'
import preact from '@iconify-icons/logos/preact'
import vue3 from '@iconify-icons/logos/vue'
import tailwindcssIcon from '@iconify-icons/logos/tailwindcss-icon'
import vitejs from '@iconify-icons/logos/vitejs'
import jest from '@iconify-icons/logos/jest'
import tagOutline from '@iconify-icons/mdi/tag-outline'
import packageVariantClosed from '@iconify-icons/mdi/package-variant-closed'
import seedOutline from '@iconify-icons/mdi/seed-outline'
import { pipe } from 'fonction'

import { lowerCase } from 'fonction'

const tagIcon = (tag: string) => {
  switch (tag) {
    case 'typescript': {
      return typescriptIcon
    }
    case 'yarn': {
      return yarn
    }

    case 'preact': {
      return preact
    }

    case 'tailwindcss': {
      return tailwindcssIcon
    }

    case 'vite': {
      return vitejs
    }

    case 'jest': {
      return jest
    }

    case 'package': {
      return packageVariantClosed
    }

    case 'tutorial': {
      return seedOutline
    }

    case 'vue3': {
      return vue3
    }

    default:
      return tagOutline
  }
}

const getIcon = pipe(lowerCase, tagIcon)

const Tag: FC<{ tag: string }> = ({ tag }) => {
  const icon = getIcon(tag)

  return (
    <span className="rounded-full pr-2 p-1 inline-flex transition duration-300 items-center dark:bg-blue-gray-800 dark:group-hover:bg-blue-gray-700 border dark:border-blue-gray-700 bg-gray-100  space-x-2">
      <Icon className="w-7 h-7 text-accent rounded-full" icon={icon} />

      <span className="lowercase dark:text-gray-200">{tag}</span>
    </span>
  )
}

export default Tag
