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
    <div className={classNames('form-input-wrapper mt-3', className)}>
      <p className="text-15 font-medium text-gray-750 mb-2">{title}</p>
      {children}
      {error && <p className="form-input-error mt-2">{error}</p>}
    </div>
  )
}

FormInputWrapper.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default FormInputWrapper
