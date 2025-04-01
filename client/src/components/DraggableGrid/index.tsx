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
}

const DraggableGrid = <T,>({
  cols = 2,
  data,
  getId,
  renderItem,
}: DraggableGridProps<T>) => {
  const [items, setItems] = useState(data)
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  useEffect(() => {
    setItems(data)
  }, [data])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (active.id !== over?.id) {
        setItems((items) => {
          // const oldIndex = items.indexOf(active.id as string)
          // const newIndex = items.indexOf(over!.id as string)
          const oldIndex = items.findIndex((item) => getId(item) === active.id)
          const newIndex = items.findIndex((item) => getId(item) === over!.id)

          return arrayMove(items, oldIndex, newIndex)
        })
      }

      setActiveId(null)
    },
    [getId]
  )
  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  useEffect(() => {
    console.log(items)
  }, [items])

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
