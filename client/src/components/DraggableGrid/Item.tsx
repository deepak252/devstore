import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  children: React.ReactNode
  withOpacity?: boolean
  isDragging?: boolean
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, withOpacity, isDragging, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        // className={classNames(
        //   'bg-white flex-center w-full h-24 rounded-xl cursor-grab shadow-lg',
        //   {
        //     'cursor-grabbing shadow-xl scale-105': isDragging,
        //     'opacity-50': withOpacity,
        //   }
        // )}
        className={classNames('w-full h-24 cursor-grab', {
          'cursor-grabbing shadow-xl scale-105': isDragging,
          'opacity-50': withOpacity,
        })}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default Item

// import { forwardRef, HTMLAttributes, CSSProperties } from 'react'

// export type ItemProps = HTMLAttributes<HTMLDivElement> & {
//   id: string
//   withOpacity?: boolean
//   isDragging?: boolean
// }

// const Item = forwardRef<HTMLDivElement, ItemProps>(
//   ({ id, withOpacity, isDragging, style, ...props }, ref) => {
//     const inlineStyles: CSSProperties = {
//       opacity: withOpacity ? '0.5' : '1',
//       transformOrigin: '50% 50%',
//       height: '140px',
//       width: '140px',
//       borderRadius: '10px',
//       cursor: isDragging ? 'grabbing' : 'grab',
//       backgroundColor: '#ffffff',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       boxShadow: isDragging
//         ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
//         : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
//       transform: isDragging ? 'scale(1.05)' : 'scale(1)',
//       ...style,
//     }

//     return (
//       <div ref={ref} style={inlineStyles} {...props}>
//         {id}
//       </div>
//     )
//   }
// )

// export default Item
