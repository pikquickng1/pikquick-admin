"use client";

import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePlatformSettings } from "../hooks/usePlatformSettings";
import { AddCategoryModal } from "./AddCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";
import { TaskCategory } from "../types/platform-settings.types";

export function PlatformSettings() {
  const router = useRouter();
  const { settings, categories, loading, updateSettings, setSettings } = usePlatformSettings();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  const handleUpdateChanges = () => {
    updateSettings(settings);
    console.log("Updating platform settings:", settings);
  };

  const handleAddCategory = (data: { name: string; description: string }) => {
    console.log("Adding category:", data);
    // TODO: Implement API call to add category
  };

  const handleEditCategory = (category: TaskCategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleSaveCategory = (data: { name: string; description: string }) => {
    console.log("Updating category:", selectedCategory?.id, data);
    // TODO: Implement API call to update category
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log("Deleting category:", categoryId);
    // TODO: Implement API call to delete category
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-semibold text-text-primary">Platform Settings</h1>
        </div>
        <button
          onClick={handleUpdateChanges}
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          Update Changes
        </button>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-2 gap-6">
        {/* Daily Runner Access Fee */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Daily Runner Access Fee
          </h2>
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Access Fee (₦)
            </label>
            <input
              type="number"
              value={settings.accessFee}
              onChange={(e) =>
                setSettings({ ...settings, accessFee: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-text-secondary mt-2">
              Daily fee charged to runners for platform access
            </p>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Commission Settings
          </h2>
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Platform Commission (%)
            </label>
            <input
              type="number"
              value={settings.platformCommission}
              onChange={(e) =>
                setSettings({ ...settings, platformCommission: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-text-secondary mt-2">
              Percentage taken from each completed task
            </p>
          </div>
        </div>
      </div>

      {/* Task Categories */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Task Categories</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
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
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
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
