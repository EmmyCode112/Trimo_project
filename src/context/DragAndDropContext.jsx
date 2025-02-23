"use client"

import { createContext, useContext, useState } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

const DragAndDropContext = createContext()

export function DragAndDropProvider({ children }) {
  const [activeId, setActiveId] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    setDraggedItem(event.active.data.current)
  }

  const handleDragEnd = (event) => {
    setActiveId(null)
    setDraggedItem(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setDraggedItem(null)
  }

  const value = {
    activeId,
    draggedItem
  }

  return (
    <DragAndDropContext.Provider value={value}>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {children}
        <DragOverlay>
          {activeId ? <div className="dragging-overlay">{/* Render overlay content */}</div> : null}
        </DragOverlay>
      </DndContext>
    </DragAndDropContext.Provider>
  )
}

export function useDragAndDrop() {
  const context = useContext(DragAndDropContext)
  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }
  return context
}