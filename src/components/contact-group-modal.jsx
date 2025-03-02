"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactGroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [contacts, setContacts] = useState("");

  const handleSave = () => {
    // Here you would typically save the contact group
    console.log("Saving contact group:", { groupName, contacts: contacts.split("\n") });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Contact Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-name" className="text-right">
              Group Name
            </Label>
            <Input
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contacts" className="text-right">
              Contacts
            </Label>
            <textarea
              id="contacts"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              className="col-span-3 h-[200px] resize-none border rounded-md p-2"
              placeholder="Enter email addresses, one per line"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}