"use client";

import { X, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryDetail {
  name: string;
  color: string;
  taskCount: number;
  percentage: number;
  avgTime: number;
  successRate: number;
}

interface TaskCategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryDetail[];
}

export function TaskCategoryDetailsModal({
  isOpen,
  onClose,
  categories,
}: TaskCategoryDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Detailed Analytics - Tasks by Category
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                In-depth breakdown of task categories and performance metrics
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

        <div className="space-y-6 mt-6">
          {categories.map((category, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-text-primary">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {category.taskCount.toLocaleString()} tasks
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-neutral-50 rounded-lg p-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Percentage</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {category.percentage}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Avg Time</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {category.avgTime} mins
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Success Rate</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {category.successRate}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            Close
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded">
            <Download className="w-4 h-4" />
            Export Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
