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

type DraggableGridProps = {
  cols?: number
  children: React.ReactNode
}
const DraggableGrid = ({ cols = 2, children }: DraggableGridProps) => {
  const [items, setItems] = useState(
    Array.from({ length: 8 }, (_, i) => (i + 1).toString())
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over!.id as string)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }, [])
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
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          // className="grid gap-3 max-w-xl mx-auto my-3"
          className="grid gap-3 mx-auto my-3"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {items.map((id) => (
            <SortableItem key={id} id={id}>
              <p>Hello {id}</p>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: '0 0' }}>
        {activeId ? (
          <Item id={activeId} isDragging>
            <p>{activeId}</p>
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DraggableGrid
