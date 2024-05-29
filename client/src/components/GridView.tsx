import classNames from 'classnames'

type FormInputWrapperProps = {
  heading?: string
  children: React.ReactNode
  horizontalScroll?: boolean
  wrapperClass?: string
  itemsClass?: string
}

const GridView = ({
  heading,
  children,
  horizontalScroll,
  wrapperClass,
  itemsClass,
}: FormInputWrapperProps) => {
  return (
    <div className={wrapperClass}>
      {heading && (
        <h3 className="text-xl font-semibold mx-2 my-3 text-gray-900">
          {heading}
        </h3>
      )}
      <div
        className={classNames('grid ', itemsClass, {
          'grid-flow-col gap-2 justify-start p-2 overflow-x-auto':
            horizontalScroll,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default GridView
