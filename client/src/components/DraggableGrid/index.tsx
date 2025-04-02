import { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from './SortableItem'
import Item from './Item'

type DraggableGridProps<T> = {
  cols?: number
  data: T[]
  getId: (item: T) => string
  renderItem: (item: T) => React.ReactNode
  onDragEnd?: (item: T, oldIndex: number, newIndex: number) => void
}

const DraggableGrid = <T,>({
  cols = 2,
  data,
  getId,
  renderItem,
  onDragEnd,
}: DraggableGridProps<T>) => {
  const [items, setItems] = useState(data)
  const [activeId, setActiveId] = useState<string | null>(null)
  // const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    })
  )

  useEffect(() => {
    setItems(data)
  }, [data])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over || active.id === over.id) {
        setActiveId(null)
        return
      }
      setItems((items) => {
        const oldIndex = items.findIndex((item) => getId(item) === active.id)
        const newIndex = items.findIndex((item) => getId(item) === over?.id)

        onDragEnd?.(items[oldIndex], oldIndex, newIndex)
        return arrayMove(items, oldIndex, newIndex)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getId]
  )

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  // useEffect(() => {
  //   console.log(items)
  // }, [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items.map(getId)} strategy={rectSortingStrategy}>
        <div
          // className="grid gap-3 max-w-xl mx-auto my-3"
          className="grid gap-3 mx-auto my-3"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {items.map((item) => (
            <SortableItem key={getId(item)} id={getId(item)}>
              {renderItem(item)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: '0 0' }}>
        {activeId ? (
          <Item id={activeId} isDragging>
            {renderItem(items.find((item) => getId(item) === activeId)!)}
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DraggableGrid
