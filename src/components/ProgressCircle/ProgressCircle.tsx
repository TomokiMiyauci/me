import { FC, SVGProps } from 'react'
import { classNames } from '@/utils/class_name'

type CircleProps = {
  className?: string
  circleClass?: string
  circleFrameClass?: string
} & SVGProps<SVGCircleElement>

const Circle: FC<CircleProps> = ({
  className,
  circleClass,
  children,
  ...props
}) => {
  return (
    <svg
      width="1em"
      height="1em"
      className={classNames('transform -rotate-90', className)}
      viewBox="0 0 130 130"
    >
      <circle
        r="57.3"
        cx="65"
        cy="65"
        fill="transparent"
        strokeWidth={props.strokeWidth ?? '1em'}
      ></circle>
      <circle
        r="57.3"
        cx="65"
        cy="65"
        className={classNames('transition-all stroke-current', circleClass)}
        fill="transparent"
        strokeWidth={props.strokeWidth ?? '1em'}
        strokeDasharray="360"
        {...props}
      />
    </svg>
  )
}

const ProgressCircle: FC = () => {
  return (
    <span className="inline-block animate-spin">
      <Circle
        strokeDashoffset={240}
        className="w-20 h-20 animate-pulse"
        circleClass="text-accent"
      />
    </span>
  )
}

export default Circle
export { ProgressCircle }
export type { CircleProps }
