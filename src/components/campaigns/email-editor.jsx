"use client"

import { useState } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tools = [
  { id: "title", label: "Title", icon: "T" },
  { id: "paragraph", label: "Paragraph", icon: "¶" },
  { id: "list", label: "List", icon: "≡" },
  { id: "image", label: "Image", icon: "🖼" },
  { id: "button", label: "Button", icon: "⬚" },
  { id: "divider", label: "Divider", icon: "—" },
  { id: "html", label: "HTML", icon: "</>" },
  { id: "social", label: "Social", icon: "+" },
  { id: "icon", label: "Icon", icon: "★" },
]

export function EmailEditor() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last saved 4 minutes ago
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Send Test</Button>
            <Button>Save</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-[1fr,300px] gap-6">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">From:</label>
                  <Input defaultValue="test@triimoapp.com" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">To:</label>
                  <Input defaultValue="[subscribers]" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Subject:</label>
                <Input placeholder="Enter email subject..." />
              </div>
            </div>
            <Separator />
            <div className="min-h-[500px] border rounded-lg">{/* Email content editor area */}</div>
          </div>

          <div className="border rounded-lg p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="row">Row</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <div className="grid grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-xl">{tool.icon}</span>
                      <span className="text-xs">{tool.label}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

