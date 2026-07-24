"use client";

import { Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNgn } from "@/lib/utils/money";
import { usePlatformSettings } from "../hooks/usePlatformSettings";
import { AddCategoryModal } from "./AddCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";
import type { PlatformSettingsData, TaskCategory } from "../types/platform-settings.types";

export function PlatformSettings() {
  const {
    settings,
    categories,
    loading,
    updateSettings,
    isUpdating,
    addCategory,
    updateCategory,
    deleteCategory,
  } = usePlatformSettings();
  const [draft, setDraft] = useState<PlatformSettingsData>(settings);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  const handleUpdateChanges = () => {
    updateSettings(draft);
  };

  const handleAddCategory = async (data: { name: string; description: string }) => {
    await addCategory(data);
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (category: TaskCategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleSaveCategory = async (data: { name: string; description: string }) => {
    if (!selectedCategory) return;
    await updateCategory(selectedCategory.id, data);
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
  };

  if (loading) return <LoadingState label="Loading platform settings..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        actions={
          <Button onClick={handleUpdateChanges} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Changes"}
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Daily Runner Access Fee
          </h2>
          <div>
            <Label className="text-sm font-medium text-text-primary mb-2 block">
              Access Fee (₦)
            </Label>
            <Input
              type="number"
              value={draft.accessFee}
              onChange={(e) =>
                setDraft({ ...draft, accessFee: Number(e.target.value) })
              }
            />
            <p className="text-xs text-text-secondary mt-2">
              Current: {formatNgn(settings.accessFee)}. Daily fee charged to runners for platform access.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Commission Settings
          </h2>
          <div>
            <Label className="text-sm font-medium text-text-primary mb-2 block">
              Platform Commission (%)
            </Label>
            <Input
              type="number"
              value={draft.platformCommission}
              onChange={(e) =>
                setDraft({ ...draft, platformCommission: Number(e.target.value) })
              }
            />
            <p className="text-xs text-text-secondary mt-2">
              Current: {settings.platformCommission}%. Percentage taken from each completed task.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Task Categories</h2>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.length === 0 ? (
            <p className="col-span-2 text-sm text-text-secondary text-center py-8">
              No task categories yet.
            </p>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-text-primary mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1.5 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded"
                      aria-label="Edit category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded"
                      aria-label="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCategory}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory}
      />
    </div>
  );
}
