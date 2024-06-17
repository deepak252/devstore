import classNames from 'classnames'
import ModalWrapper from './ModalWrapper'

type SpinnerProps = {
  className?: string
  center?: boolean
}
const Spinner = ({ className, center }: SpinnerProps) => {
  function SpinAnimation() {
    return (
      <div
        className={classNames(
          'size-12 border-[6px] inline-block animate-spin rounded-full border-solid border-current border-e-primary align-[-0.125em] text-primary-200 motion-reduce:animate-[spin_1.5s_linear_infinite]',
          className
        )}
        role="status"
      ></div>
    )
  }
  return center ? (
    <div className="absolute-center">
      <SpinAnimation />
    </div>
  ) : (
    <SpinAnimation />
  )
}

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <ModalWrapper isOpen={isLoading} className="z-[1000]">
        <Spinner center />
      </ModalWrapper>
    )
  )
}

export { Spinner }
export default Loader
