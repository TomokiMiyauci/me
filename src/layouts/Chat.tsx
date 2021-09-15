import { navigate } from 'gatsby'
import { Icon } from '@iconify/react/dist/offline'
import chevronLeft from '@iconify/icons-akar-icons/chevron-left'
import { StepContext } from '@/contexts/step'
import { useState, useLayoutEffect } from 'react'
import { useAuth } from '@/hooks/auth'

import type { FC, ReactNode } from 'react'

const Chat: FC<{ children: ReactNode }> = ({ children }) => {
  const [step, changeStep] = useState(0)
  const [{ isAnonymous }] = useAuth()

  useLayoutEffect(() => {
    if (isAnonymous) {
      navigate('/login/?redirect=/chat/')
    }
  }, [isAnonymous])

  return (
    <StepContext.Provider value={[step, changeStep]}>
      <header className="fixed inset-x-0 border-b h-[56px] p-2 backdrop-blur border-gray-500 top-0 flex items-center">
        <button
          className="btn-circle p-1 md:p-2"
          onClick={() => {
            if (step === 0) {
              navigate('/')
            } else {
              changeStep(step - 1)
            }
          }}
        >
          <Icon icon={chevronLeft} className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </header>
      <main className="main container mx-auto overflow-x-hidden overflow-y-scroll w-screen">
        {children}
      </main>
    </StepContext.Provider>
  )
}

export default Chat
