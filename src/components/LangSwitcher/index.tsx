import { FC, useState, useRef } from 'react'
import translateIcon from '@iconify-icons/mdi/translate'
import { Icon } from '@iconify/react/dist/offline'
import { LocalizedLink } from 'gatsby-theme-i18n'
import { useClickOutside } from '@miyauci/react-click-outside'
import { Transition } from '@headlessui/react'

const LangSwitcher: FC<{ originalPath: string }> = ({ originalPath }) => {
  const [isShow, changeShow] = useState(false)
  const ref = useRef<HTMLUListElement>(null)
  const hide = () => changeShow(false)

  const toggleShow = isShow ? hide : () => changeShow(true)
  useClickOutside(ref, hide, 'mousedown' as any)

  return (
    <div className="relative flex items-center">
      <button
        aria-label="Show language list"
        className="flex text-accent"
        onClick={toggleShow}
      >
        <Icon className="w-8 h-8" icon={translateIcon} />
      </button>

      <Transition
        show={isShow}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          ref={ref}
          className="
  absolute
  rounded-md
  bg-white
  dark:bg-blue-gray-800
  mt-2
  right-0
  top-8

  shadow
  text-lg
  md:bottom-auto
  md:top-8
  hover:shadow-md
  p-3
"
        >
          <li>
            <LocalizedLink onClick={hide} to={originalPath} language="en">
              English
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink onClick={hide} to={originalPath} language="ja">
              日本語
            </LocalizedLink>
          </li>
        </ul>
      </Transition>
    </div>
  )
}

export default LangSwitcher
