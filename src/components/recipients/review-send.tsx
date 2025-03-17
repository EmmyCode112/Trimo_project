"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, AlertCircle, Calendar, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export default function ReviewSend({
  recipients,
  template,
  emailInfo,
  onSendNow,
  onSchedule,
  onSaveDraft,
  onPrevious,
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduleType, setScheduleType] = useState("once")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [recurringDay, setRecurringDay] = useState("friday")
  const { toast } = useToast()

  const handleSendNow = () => {
    setShowConfirmDialog(true)
  }

  const confirmSend = () => {
    onSendNow()
    setShowConfirmDialog(false)
    toast({
      title: "SMS Campaign Sent Successfully!",
      description: "All messages have been dispatched—watch your impact grow!",
      className: "bg-[#ECFDF3] text-[#027A48] border-0",
    })
  }

  const handleSchedule = () => {
    const scheduleData = {
      type: scheduleType,
      startDate,
      startTime,
      endDate: scheduleType === "recurring" ? endDate : startDate,
      endTime: scheduleType === "recurring" ? endTime : startTime,
      recurringDay: scheduleType === "recurring" ? recurringDay : null,
    }

    onSchedule(scheduleData)
    setShowScheduleDialog(false)
    toast({
      title: "Campaign Scheduled Successfully!",
      description: "Your campaign has been scheduled and will be sent at the specified time.",
      className: "bg-[#ECFDF3] text-[#027A48] border-0",
    })
  }

  const handleSaveDraft = () => {
    onSaveDraft()
    toast({
      title: "Campaign Saved to Drafts",
      description:
        "Your campaign has been saved as a draft. Feel free to come back and make any changes before sending it live.",
      className: "bg-[#ECFDF3] text-[#027A48] border-0",
    })
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#383268] flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-[#383268]"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#383268] flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-[#383268]"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#383268] flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-[#383268]"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#383268] flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-[#383268]"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">5</div>
        </div>
        <div className="text-sm text-gray-500 flex items-center space-x-4">
          <span>Select Message Type</span>
          <span>Upload Recipients</span>
          <span>Message Creation</span>
          <span>Scheduling</span>
          <span className="font-medium text-[#383268]">Review & Send</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Review All Details</h1>
          <p className="text-gray-500">Decide when to send your message</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">{recipients.length} Recipients Selected</h3>
                <ScrollArea className="h-[200px]">
                  <div className="grid grid-cols-3 gap-4">
                    {recipients.map((recipient, index) => (
                      <div key={index} className="text-sm text-gray-600 truncate">
                        {recipient.email}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {emailInfo.subject ? null : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your email is missing a subject line. This may affect deliverability.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Preview Panel</h3>
                <div
                  className="border rounded-md overflow-hidden"
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: template.settings.backgroundColor,
                    fontFamily: template.settings.fontType,
                  }}
                >
                  <div className="p-4">
                    {template.elements.map((element, index) => (
                      <div key={index} style={element.styles}>
                        {element.content}
                      </div>
                    ))}
                    {template.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="my-4">
                        <div
                          className="grid gap-4"
                          style={{
                            gridTemplateColumns: `repeat(${row.columns}, 1fr)`,
                          }}
                        >
                          {Array.from({ length: row.columns }).map((_, colIndex) => (
                            <div key={`${rowIndex}-col-${colIndex}`} className="p-2">
                              {row.elements[colIndex]?.map((element, elemIndex) => (
                                <div key={elemIndex} style={element.styles}>
                                  {element.content}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="w-[120px] h-[44px] rounded-[8px] border border-[#C1BFD0] text-[#383268] text-[16px] font-medium"
          >
            Save to Draft
          </Button>
          <div className="space-x-3">
            <Button
              variant="outline"
              onClick={onPrevious}
              className="w-[120px] h-[44px] rounded-[8px] border border-[#C1BFD0] text-[#383268] text-[16px] font-medium"
            >
              Previous
            </Button>
            <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[120px] h-[44px] rounded-[8px] border border-[#C1BFD0] text-[#383268] text-[16px] font-medium"
                >
                  Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule Your Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <RadioGroup value={scheduleType} onValueChange={setScheduleType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="once" id="once" />
                      <Label htmlFor="once">Send Once</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recurring" id="recurring" />
                      <Label htmlFor="recurring">Recurring Campaign</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div>
                      <Label>Start/End Date</Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div className="space-y-1">
                          <Label className="text-xs">Start</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        {scheduleType === "recurring" && (
                          <div className="space-y-1">
                            <Label className="text-xs">End</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Start/End Time</Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div className="space-y-1">
                          <Label className="text-xs">Start</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              type="time"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        {scheduleType === "recurring" && (
                          <div className="space-y-1">
                            <Label className="text-xs">End</Label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {scheduleType === "recurring" && (
                      <div className="space-y-2">
                        <Label>Recurring Day</Label>
                        <select
                          value={recurringDay}
                          onChange={(e) => setRecurringDay(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                          <option value="saturday">Saturday</option>
                          <option value="sunday">Sunday</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSchedule} className="bg-[#383268] hover:bg-[#2a2550]">
                      Confirm & Schedule
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#383268] w-[120px] h-[44px] rounded-[8px] text-white font-medium text-[16px] hover:bg-[#2a2550]">
                  Send Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Send Email</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Are you sure you want to send this mail now?</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={confirmSend} className="bg-[#383268] hover:bg-[#2a2550]">
                    Yes, Send
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

