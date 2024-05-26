import classNames from 'classnames'
import PropTypes from 'prop-types'

type FormInputWrapperProps = {
  title?: string
  children: React.ReactNode
  error?: string
  className?: string
}

const FormInputWrapper = ({
  title,
  children,
  error,
  className,
}: FormInputWrapperProps) => {
  return (
    <div className={classNames('mt-3', className)}>
      <p className="text-sm font-medium text-gray-750 mb-2">{title}</p>
      {children}
      <p className="my-2 text-13 text-red">{error}</p>
    </div>
  )
}

FormInputWrapper.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default FormInputWrapper
