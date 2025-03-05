import classNames from 'classnames'

type ShimmerProps = {
  className?: string
}
const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={classNames(
        'overflow-hidden relative bg-gray-200 rounded-xl w-full',
        className
      )}
    >
      <div className="h-full animate-shimmer"></div>
    </div>
  )
}

export default Shimmer
