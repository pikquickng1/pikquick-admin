"use client";

import { X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { fullName: string; email: string; phoneNumber: string }) => void;
  currentData: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

export function EditProfileModal({ isOpen, onClose, onSave, currentData }: EditProfileModalProps) {
  const [fullName, setFullName] = useState(currentData.fullName);
  const [email, setEmail] = useState(currentData.email);
  const [phoneNumber, setPhoneNumber] = useState(currentData.phoneNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ fullName, email, phoneNumber });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Edit Profile
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Update your personal information
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-text-primary mb-2 block">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-neutral-50"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-text-primary mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jane.doe@pikquick.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-50"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-text-primary mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+234 803 456 7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full bg-neutral-50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
