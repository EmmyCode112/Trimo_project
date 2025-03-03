"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit } from "iconsax-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Profile, SmsEdit, Sms } from "iconsax-react"

export default function EmailInfo({ emailInfo, setEmailInfo }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    from: emailInfo.from,
    to: emailInfo.to,
    subject: emailInfo.subject,
    headerType: "none", // none, bcc, or replyTo
    bcc: "",
    replyTo: "",
  })

  const modalRef = useRef(null)
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false
  const dragRef = useRef(null)

  useEffect(() => {
    setFormData({
      from: emailInfo.from,
      to: emailInfo.to,
      subject: emailInfo.subject,
      headerType: emailInfo.headerType || "none",
      bcc: emailInfo.bcc || "",
      replyTo: emailInfo.replyTo || "",
    })
  }, [emailInfo])

  const handleSave = () => {
    const updatedEmailInfo = {
      ...emailInfo,
      from: formData.from,
      to: formData.to,
      subject: formData.subject,
      headerType: formData.headerType,
    }

    if (formData.headerType === "bcc") {
      updatedEmailInfo.bcc = formData.bcc
    } else if (formData.headerType === "replyTo") {
      updatedEmailInfo.replyTo = formData.replyTo
    }

    setEmailInfo(updatedEmailInfo)
    setOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleHeaderTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      headerType: value,
    }))
  }

  // Handle dragging for mobile
  const handleDragStart = (e) => {
    if (!isMobile) return
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragRef.current = { startY: clientY }
  }

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const delta = clientY - dragRef.current.startY

    if (delta > 100) {
      setOpen(false)
      dragRef.current = null
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`
      modalRef.current.style.transition = "none"
    }
  }

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return
    modalRef.current.style.transform = ""
    modalRef.current.style.transition = "transform 0.3s ease-out"
    dragRef.current = null
  }

  // Determine subject color based on content
  const getSubjectStyle = () => {
    if (!formData.subject) {
      return "bg-[#FAE9EB] text-[#CB1E33]"
    }
    return "bg-[#EBE9FA] text-[#383268]"
  }

  return (
    <div className="border-b w-full border-[#F1F1F1] py-4 px-12">
      <div className="flex max-w-[877px] gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[18px] text-[#484848] font-medium">From:</span>
          <span className="text-sm text-[#484848] font-medium">{emailInfo.from}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[18px] text-[#484848] font-medium">To:</span>
          <span className="text-sm text-[#484848] font-medium">{emailInfo.to}</span>
          {emailInfo.headerType === "bcc" && emailInfo.bcc && (
            <div className="bg-[#FBF1E6] flex items-center gap-1 w-auto h-[28px] rounded-[6px] py-[4px] px-[8px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#9B5300]" />
              <span className="text-sm text-[#DB7500] font-medium">Email send to {emailInfo.bcc}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[18px] font-medium text-[#484848]">Subject:</span>
          <span className={`text-sm ${getSubjectStyle()} h-[28px] rounded-[6px] flex items-center justify-center px-2`}>
            {emailInfo.subject || "No Subject"}
          </span>

          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOpen(true)}>
            <Edit variant="Linear" className="text-[#A3A3A3] w-[28px] h-[28px]" size={28} />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[605px] p-0 rounded-[40px] bg-white border-[#D5D5D5]"
          ref={modalRef}
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
          onTouchMove={handleDragMove}
          onMouseMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseUp={handleDragEnd}
        >
          <div className="p-6">
            {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mb-6" />}

            <DialogHeader className="mb-4 pt-12">
              <DialogTitle className="text-[20px] text-[#1A1A1A] font-medium">Select a Contact Group</DialogTitle>
              <p className="text-[#767676] text-sm my-1">Send messages to your regular contacts in a single click.</p>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from" className="text-[#1A1A1A] font-medium text-sm">From</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Profile size={20} color="#A3A3A3" />
                  </div>
                  <Input
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="pl-10 w-[561px] h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to" className="text-[#1A1A1A] font-medium text-sm">To</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Profile size={20} color="#A3A3A3" />
                  </div>
                  <Input
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="pl-10 w-[561px] h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                    placeholder="{{customer.email}}"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[#1A1A1A] font-medium text-sm">Subject</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SmsEdit size={20} color="#A3A3A3" />
                  </div>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="pl-10 w-[561px] h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                    placeholder="Enter subject heading"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#1A1A1A] font-medium text-sm">Headers</Label>
                <RadioGroup value={formData.headerType} onValueChange={handleHeaderTypeChange} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bcc" id="bcc" />
                    <Label htmlFor="bcc" className="text-[#484848] font-medium text-sm">BCC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="replyTo" id="replyTo" />
                    <Label htmlFor="replyTo" className="text-[#484848] font-medium text-sm">Reply To</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.headerType === "bcc" && (
                <div className="space-y-2">
                  <Label htmlFor="bcc">BCC</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Sms size={20} color="#A3A3A3" />
                    </div>
                    <Input
                      id="bcc"
                      name="bcc"
                      value={formData.bcc}
                      onChange={handleChange}
                       className="pl-10 w-[561px] h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                      placeholder="Enter BCC email"
                    />
                  </div>
                </div>
              )}

              {formData.headerType === "replyTo" && (
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply To</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Sms size={20} color="#A3A3A3" />
                    </div>
                    <Input
                      id="replyTo"
                      name="replyTo"
                      value={formData.replyTo}
                      onChange={handleChange}
                       className="pl-10 w-[561px] h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                      placeholder="Enter Reply-To email"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setOpen(false)} className="w-[89px] h-[44px] rounded-[8px] border border-[#C1BFD0] text-[#383268] text-[16px] font-medium px-6">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#383268] text-white text-[16px] font-medium w-[72px] h-[44px] rounded-[8px] hover:bg-[#2a2550] px-6">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

