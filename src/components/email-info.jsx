"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "iconsax-react";

export default function EmailInfo({ emailInfo, setEmailInfo }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(emailInfo.subject);

  const handleSave = () => {
    setEmailInfo({ ...emailInfo, subject });
    setOpen(false);
  };

  return (
    <div className="border-b w-full  border-[#F1F1F1] py-4 px-12">
      <div className="flex max-w-[877px] gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[18px] text-[#484848] font-medium">From:</span>
          <span className="text-sm text-[#484848] font-medium">{emailInfo.from}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[18px] text-[#484848] font-medium">To:</span>
          <span className="text-sm text-[#484848] font-medium">{emailInfo.to}</span>
          <div className="bg-[#FBF1E6] flex items-center gap-1 w-[281px] h-[28px] rounded-[6px] py-[4px] px-[8px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#9B5300]" />
            <span className="text-sm text-[#DB7500] font-medium">Email send to newslevel30@gmail.com</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[18px] font-medium text-[#484848]">Subject:</span>
          <span className="text-sm bg-[#FAE9EB] w-[42px] h-[28px] rounded-[6px] flex items-center justify-center text-[#CB1E33]">{emailInfo.subject}</span>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit variant="Linear" className="text-[#A3A3A3] w-[28px] h-[28px]" size={28} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Email Subject</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
                <Button onClick={handleSave} className="w-full bg-[#383268] hover:bg-[#2a2550]">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}