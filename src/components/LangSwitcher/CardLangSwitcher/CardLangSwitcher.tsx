import delay from 'p-min-delay'
import loadable from '@loadable/component'
import { memo, useContext } from 'react'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import GlobalDialog from '@/components/Dialog/GlobalDialog'
import Context from '@/components/LangSwitcher/context'

const LangSwitcher = loadable(
  () => delay(import('@/components/LangSwitcher/LangSwitcher'), 1000),
  {
    fallback: (
      <div className="h-full grid place-items-center">
        <ProgressCircle />
      </div>
    )
  }
)

const CardLangSwitcher = () => {
  const [_, { off }] = useContext(Context)
  return (
    <GlobalDialog
      enter="transition duration-500 transform"
      enterFrom="md:opacity-0 translate-y-full md:translate-y-0 md:translate-x-10"
      leave="transition duration-500 transform"
      leaveTo="md:opacity-0 translate-y-full md:translate-y-0 md:translate-x-10"
      onHide={off}
    >
      <LangSwitcher />
    </GlobalDialog>
  )
}

export default memo(CardLangSwitcher)
