import classNames from 'classnames'

type ShimmerProps = {
  className?: string
}
const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={classNames(
        'overflow-hidden relative bg-gray-200 rounded-full h-16 w-16',
        className
      )}
    >
      <div className="size-full bg-gradient-to-r from-transparent to-gray-300 animate-shimmer"></div>
    </div>
  )
}

export default Shimmer
