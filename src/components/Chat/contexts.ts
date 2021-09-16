import { createContext } from 'react'
import type { Step } from '@/components/Chat/hooks'
import type { Dispatch, SetStateAction } from 'react'
const StepContext = createContext<[Step, Dispatch<SetStateAction<Step>>]>([
  'INIT',
  () => {}
])

export default StepContext
