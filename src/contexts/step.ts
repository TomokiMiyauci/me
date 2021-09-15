import { useContext, createContext } from 'react'

const StepContext = createContext<[number, (step: number) => void]>([
  0,
  () => {}
])

const useStep = () => useContext(StepContext)

export { StepContext, useStep }
