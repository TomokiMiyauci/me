import { defineComponent } from '@/utils/component'
import { Icon } from '@iconify/react/dist/offline'
import gatsby from '@iconify-icons/logos/gatsby'
import storybookIcon from '@iconify-icons/logos/storybook-icon'
import firebaseIcon from '@iconify-icons/logos/firebase'
import { classNames } from '@/utils/class_name'

const By = defineComponent(({ className }) => {
  return (
    <span
      className={classNames(
        'flex flex-col sm:flex-row sm:space-x-6 items-start font-bold text-xl',
        className
      )}
    >
      <a
        href="https://miyauchi-storybook.web.app/"
        rel="noopener"
        target="_blank"
        className="space-x-2 underline py-1 md:p-0 md:no-underline md:hover:underline flex"
      >
        <span className="align-middle">DESIGNED BY</span>
        <Icon icon={storybookIcon} className="w-7 h-7" />
      </a>

      <span className="space-x-2 flex self-end sm:self-auto flex-row-reverse sm:flex-row items-center">
        <span className="align-middle ml-2 md:ml-0">BUILD BY</span>
        <Icon icon={gatsby} className="w-7 h-7" />
      </span>
      <span className="space-x-2 flex items-center">
        <span className="align-middle py-1 md:p-0">DEPLOYS BY</span>
        <Icon icon={firebaseIcon} className="w-7 h-7" />
      </span>
    </span>
  )
})

export default By
