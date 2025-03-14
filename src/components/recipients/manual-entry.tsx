"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Save, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ManualEntry({ onSave, onBack, initialRecipients = [] }) {
  const [recipients, setRecipients] = useState(initialRecipients.length > 0 ? initialRecipients : [{ email: "" }])
  const [error, setError] = useState("")

  const addRecipient = () => {
    setRecipients([...recipients, { email: "" }])
  }

  const removeRecipient = (index) => {
    const newRecipients = [...recipients]
    newRecipients.splice(index, 1)
    setRecipients(newRecipients.length > 0 ? newRecipients : [{ email: "" }])
  }

  const updateRecipient = (index, email) => {
    const newRecipients = [...recipients]
    newRecipients[index].email = email
    setRecipients(newRecipients)
  }

  const handleSave = () => {
    // Validate emails
    const validRecipients = recipients.filter((r) => r.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email))

    if (validRecipients.length === 0) {
      setError("Please enter at least one valid email address")
      return
    }

    onSave(validRecipients)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack} className="h-9 w-9">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Enter Recipients</h2>
          <p className="text-muted-foreground">Add email addresses for your campaign</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="email"
                      value={recipient.email}
                      onChange={(e) => updateRecipient(index, e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeRecipient(index)} className="h-9 w-9">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-between">
              <Button variant="outline" onClick={addRecipient} className="gap-1">
                <Plus className="h-4 w-4" />
                Add Recipient
              </Button>
              <Button onClick={handleSave} className="bg-[#383268] hover:bg-[#2a2550]">
                <Save className="h-4 w-4 mr-2" />
                Save Recipients
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

