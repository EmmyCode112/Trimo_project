"use client"

import { EmailEditorProvider } from "@/context/EmailEditorContext"
import { DragAndDropProvider } from "@/context/DragAndDropContext"
import { EmailEditorLayout } from "@/components/email-editor-layout"

export default function EmailEditorPage() {
  return (
    <>
      <EmailEditorProvider>
        <DragAndDropProvider>
          <EmailEditorLayout />
        </DragAndDropProvider>
      </EmailEditorProvider>
    </>
  )
}

