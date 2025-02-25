"use client"

import { useState } from 'react'
import { Monitor, Smartphone, Undo, Redo } from 'lucide-react'
import { useEmailEditor } from '@/context/EmailEditorContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPalette } from './campaigns/rich_text/component-palette'
import { EmailEditor } from './campaigns/email-editor'
import { LoadingProgress } from './campaigns/rich_text/loading-progress'
import { SettingsPanel } from './campaigns/rich_text/settings-panel'
import { PreviewModal } from './campaigns/rich_text/preview-modal'
import { toast } from "sonner"
export function EmailEditorLayout() {
  const [isLoading, setIsLoading] = useState(false)
  const [deviceView, setDeviceView] = useState('desktop')
  const [showPreview, setShowPreview] = useState(false)
  
  const {
    state,
    dispatch,
    saveTemplate,
    sendTestEmail,
    canUndo,
    canRedo
  } = useEmailEditor()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await saveTemplate()
      toast({
        title: 'Success',
        description: 'Email template saved successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save template',
        variant: 'destructive'
      })
    }
    setIsLoading(false)
  }

  const handleSendTest = async () => {
    setIsLoading(true)
    try {
      const success = await sendTestEmail()
      if (success) {
        toast({
          title: 'Success',
          description: 'Test email sent successfully'
        })
      } else {
        throw new Error('Failed to send test email')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'UNDO' })}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'REDO' })}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Last saved: {new Date(state.metadata.lastSaved).toLocaleTimeString()}
            </span>
            <Button variant="outline" onClick={handleSendTest}>
              Send Test
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">From:</span>
            <Input
              value={state.metadata.from}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_METADATA',
                  payload: { from: e.target.value }
                })
              }
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">To:</span>
            <Input
              value={state.metadata.to}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_METADATA',
                  payload: { to: e.target.value }
                })
              }
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Subject:</span>
            <Input
              value={state.metadata.subject}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_METADATA',
                  payload: { subject: e.target.value }
                })
              }
              placeholder="Null"
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={deviceView === 'desktop' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          Preview
        </Button>
      </div>

      <div className="grid grid-cols-[240px_1fr_240px] gap-6">
        <ComponentPalette />
        <div className="relative min-h-[600px] rounded-lg border bg-white">
          {isLoading ? (
            <LoadingProgress progress={40} />
          ) : (
            <EmailEditor deviceView={deviceView} />
          )}
        </div>
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="row">Row</TabsTrigger>
            <TabsTrigger value="setting">Setting</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>

      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        content={state.content}
        deviceView={deviceView}
      />
    </div>
  )
}



