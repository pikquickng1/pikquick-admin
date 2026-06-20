"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { TaskCategory } from "../types/platform-settings.types";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string }) => void;
  category: TaskCategory | null;
}

export function EditCategoryModal({ isOpen, onClose, onSave, category }: EditCategoryModalProps) {
  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Edit Category
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Update task category details
          </p>
        </DialogHeader>

        <EditCategoryForm
          key={category.id}
          category={category}
          onSubmit={(data) => {
            onSave(data);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

interface EditCategoryFormProps {
  category: TaskCategory;
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

function EditCategoryForm({ category, onSubmit, onCancel }: EditCategoryFormProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
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
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
