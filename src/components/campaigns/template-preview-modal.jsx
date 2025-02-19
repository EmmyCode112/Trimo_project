import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function TemplatePreviewModal({ isOpen, onClose, onUse, template }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[605px] h-[619px] rounded-[40px] border border-[#D5D5D5] p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-general-sans text-[20px] leading-[30px] font-medium text-[#1A1A1A]">
                {template.title}
              </DialogTitle>
              <DialogDescription className="font-general-sans text-sm leading-5 text-[#767676]">
                {template.type}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto my-4 hide-scrollbar px-4">{template.content}</div>
        <div className="flex justify-end pt-4 border-t border-[#F1F1F1]">
          <Button onClick={onUse} className="bg-[#383268] hover:bg-[#383268]/90 min-w-[120px]">
            Use Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

