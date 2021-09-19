import type { FC } from 'react'

const Timestamp: FC<{ date: Date }> = ({ date }) => {
  return (
    <>
      {date.toLocaleTimeString('ja', {
        timeStyle: 'short'
      })}
    </>
  )
}

export default Timestamp
