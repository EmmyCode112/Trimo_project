"use client"

import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { Clock } from "iconsax-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Sms, Warning2 } from "iconsax-react"

export default function Header({ lastSaved, onSave, onSendTest, isPreviewMode, togglePreviewMode, emailInfo }) {
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const { toast } = useToast()

  const handleSendTest = () => {
    // Check for errors
    if (!emailInfo.subject) {
      setShowErrorModal(true)
      return
    }

    // If no errors, show test email modal
    setShowTestModal(true)
  }

  const handleSendTestEmail = async () => {
    try {
      await onSendTest(testEmail)
      setShowTestModal(false)
      toast({
        title: "Test Email Sent Successfully!",
        description: "Your test email is on its way. Check your inbox to review the message layout and content.",
        className: "bg-[#ECFDF3] text-[#027A48] border-0",
      })
    } catch (error) {
      toast({
        title: "Error sending test email",
        description: "There was an error sending the test email. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <header className="flex items-center justify-between py-4 px-12 h-[69px] bg-white border-b border-[#F1F1F1]">
        <div className="flex items-center space-x-4">
          <Link to="/" passHref>
            <Button
              variant="outline"
              className="w-[101px] rounded-[8px] h-[44px] text-[#383268] font-medium text-[16px] bg-white border border-[#C1BFD0]"
              size="sm"
            >
              <ArrowLeft className="w-[20px] h-[20px] mr-2 text-[#383268]" />
              Back
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {lastSaved && (
            <span className="flex items-center text-[#767676]">
              <Clock variant="Linear" className="w-4 h-4 mr-2" />
              <span className="text-[14px] font-normal">
                Last saved: {formatDistanceToNow(lastSaved, { addSuffix: true })}
              </span>
            </span>
          )}
          <Button
            variant="outline"
            className="w-[111px] h-[44px] rounded-[8px] border text-[#383268] text-[16px] font-medium border-[#C1BFD0] bg-white"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Exit Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-[111px] h-[44px] rounded-[8px] border text-[#383268] text-[16px] font-medium border-[#C1BFD0] bg-white"
            onClick={handleSendTest}
          >
            Send Test
          </Button>
          <Button
            variant="outline"
            className="bg-[#383268] w-[72px] h-[44px] rounded-[8px] text-white font-medium text-[16px]"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </header>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-[605px] p-0 rounded-[40px]">
          <div className="p-6 mt-12">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[20px] text-[#1A1A1A] font-medium">Review Errors</DialogTitle>
              <p className="text-[#767676] text-sm mt-1 pb-5">This message has errors which may prevent it from sending.</p>
              <p className="text-[#767676] text-sm ">
                You can troubleshoot missing variable errors by previewing your message and checking customer data.
              </p>
            </DialogHeader>

            <div className="bg-[#FAE9EB] w-[561px] h-[76px] border border-[#D54B5C] rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <div className="text-[#D54B5C] mt-1"><Warning2 size={20} color="#D54B5C" /></div>
                <div>
                  <div className="text-[#CB1E33] text-sm font-medium mb-1">Error found in Subject</div>
                  <div className="text-[#B91B2E] font-[300] text-[13px]">subject can't be blank</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setShowErrorModal(false)}
                className="bg-[#383268] text-white w-[89px] h-[44px] rounded-[8px] hover:bg-[#2a2550]"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Email Modal */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent className="sm:max-w-[605px] h-[304px] p-0 rounded-[40px]">
          <div className="p-6">
            <DialogHeader className="mb-4 pt-12">
              <DialogTitle className="text-[20px] text-[#1A1A1A] font-medium pb-5">Test results</DialogTitle>
              <p className="text-[#1A1A1A] font-medium text-sm mt-1">Send a test email to...</p>
            </DialogHeader>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Sms size={20} color="#A3A3A3" />
                </div>
                <Input
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="pl-10 h-[44px] rounded-[8px] text-[#3F3E3E] font-normal text-[16px] placeholder-[#3F3E3E] border border-[#D0D5DD] bg-[#F9FAFB]"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSendTestEmail}
                  className="bg-[#383268] text-white w-[111px] h-[44px] rounded-[8px] hover:bg-[#2a2550]"
                >
                  Send Test
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

