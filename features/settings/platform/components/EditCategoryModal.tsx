"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskCategory } from "../types/platform-settings.types";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string }) => void;
  category: TaskCategory | null;
}

export function EditCategoryModal({ isOpen, onClose, onSave, category }: EditCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
    onClose();
  };

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Edit Category
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Update task category details
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
            <Label htmlFor="categoryName" className="text-sm font-medium text-text-primary mb-2 block">
              Category Name
            </Label>
            <Input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="categoryDescription" className="text-sm font-medium text-text-primary mb-2 block">
              Description
            </Label>
            <textarea
              id="categoryDescription"
              placeholder="Brief description of this category"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
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
