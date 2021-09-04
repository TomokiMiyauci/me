import Intersection from '@/components/Intersection'
import { useMemo } from 'react'
import { useDarkMode } from '@/hooks/dark_mode'
import loadable from '@loadable/component'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import delay from 'p-min-delay'

import type { FC, ReactNode } from 'react'
import type { UtterancesProps, Theme } from 'utterances-react-component'

const Utterances = loadable<UtterancesProps<ReactNode>>(
  () =>
    delay(
      import('utterances-react-component').then(({ Utterances }) => Utterances),
      1000
    ),
  {
    fallback: (
      <div className="min-h-[269px] flex justify-center items-center">
        <ProgressCircle />
      </div>
    )
  }
)

const Index: FC<{ className?: string }> = ({ className }) => {
  const { value } = useDarkMode()
  const theme = useMemo<Theme>(
    () => (value ? 'icy-dark' : 'github-light') as Theme,
    [value]
  )

  return (
    <>
      <h3 id="comment" className={`p-4 text-3xl ${className}`}>
        Comments
      </h3>
      <div className="min-h-[269px]">
        <Intersection keepRender>
          <Utterances
            repo="TomokiMiyauci/me"
            issueTerm="pathname"
            label="comment"
            theme={theme}
          />
        </Intersection>
      </div>
    </>
  )
}

export default Index
