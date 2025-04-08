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
      {heading && <h4 className="my-4 text-neutral-900">{heading}</h4>}
      <div
        className={classNames('grid ', itemsClass, {
          'grid-flow-col gap-2 justify-start p-2 overflow-x-auto scrollbar-thin':
            horizontalScroll,
          'gap-4 max-sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 ':
            !horizontalScroll,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default GridView
