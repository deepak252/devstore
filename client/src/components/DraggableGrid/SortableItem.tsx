import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Item, { ItemProps } from './Item'
import DragIcon from '@/assets/icons/drag.svg?react'

const SortableItem = (props: ItemProps) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    // <Item
    //   ref={setNodeRef}
    //   style={style}
    //   withOpacity={isDragging}
    //   {...props}
    //   {...attributes}
    //   {...listeners}
    // />

    <Item ref={setNodeRef} style={style} {...props} withOpacity={isDragging}>
      {props.children}
      <button
        {...attributes}
        {...listeners}
        className="absolute z-20 top-2 left-2 py-2 px-1 bg-white hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
      >
        <DragIcon className="fill-neutral-700 size-4" />
      </button>
    </Item>
  )
}

export default SortableItem
