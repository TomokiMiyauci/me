import { FC } from 'react'
import IconWithLoading from './IconWithLoading'
import CountUp from 'react-countup'
const CommentCounter: FC<{ value: number; loading: boolean }> = ({
  value,
  loading
}) => {
  return (
    <IconWithLoading
      className="text-xl underline md:no-underline hover:underline"
      loading={loading}
      style={{ textDecorationColor: 'var(--accent-color)' }}
    >
      <CountUp end={value} />
    </IconWithLoading>
  )
}

export default CommentCounter
