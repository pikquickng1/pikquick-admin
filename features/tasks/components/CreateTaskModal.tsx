"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { taskCategoriesService, usersService } from "@/lib/services";
import type { TaskCategory, AdminUser } from "@/lib/types";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTaskModal({ isOpen, onClose, onSuccess }: CreateTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [requesters, setRequesters] = useState<AdminUser[]>([]);
  const [formData, setFormData] = useState({
    task_type: "",
    category_id: "",
    description: "",
    budget: "",
    client_id: "",
    pickup_address: "",
    pickup_city: "",
    pickup_state: "",
    dropoff_address: "",
    dropoff_city: "",
    dropoff_state: "",
    special_instructions: "",
    payment_method: "card" as "card" | "wallet",
    bidding_end_time: "",
  });

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      const [catsData, usersData] = await Promise.all([
        taskCategoriesService.list(),
        usersService.list({ role: "client" as any, limit: 100 }),
      ]);
      setCategories(catsData as unknown as TaskCategory[]);
      if (usersData && 'data' in usersData) {
        setRequesters((usersData as { data: AdminUser[] }).data);
      } else {
        setRequesters(usersData as unknown as AdminUser[]);
      }
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const biddingEnd = new Date();
      biddingEnd.setHours(biddingEnd.getHours() + 24);
      
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget),
          pickup_address: {
            address: formData.pickup_address,
            city: formData.pickup_city,
            state: formData.pickup_state,
          },
          dropoff_address: {
            address: formData.dropoff_address,
            city: formData.dropoff_city,
            state: formData.dropoff_state,
          },
          bidding_end_time: formData.bidding_end_time || biddingEnd.toISOString(),
        }),
      });
      
      onSuccess();
      onClose();
      setFormData({
        task_type: "",
        category_id: "",
        description: "",
        budget: "",
        client_id: "",
        pickup_address: "",
        pickup_city: "",
        pickup_state: "",
        dropoff_address: "",
        dropoff_city: "",
        dropoff_state: "",
        special_instructions: "",
        payment_method: "card",
        bidding_end_time: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Create New Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task_type">Task Type</Label>
              <Input
                id="task_type"
                value={formData.task_type}
                onChange={(e) => setFormData({ ...formData, task_type: e.target.value })}
                placeholder="e.g., delivery, errand"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="category_id">Category</Label>
              <select
                id="category_id"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 rounded mt-2"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 mt-2 border border-neutral-200 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget (₦)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="5000"
                min="500"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="client_id">Requester</Label>
              <select
                id="client_id"
                value={formData.client_id}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 rounded mt-2"
                required
              >
                <option value="">Select requester</option>
                {requesters.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Pickup Address</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Input
                placeholder="Address"
                value={formData.pickup_address}
                onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
                required
              />
              <Input
                placeholder="City"
                value={formData.pickup_city}
                onChange={(e) => setFormData({ ...formData, pickup_city: e.target.value })}
                required
              />
              <Input
                placeholder="State"
                value={formData.pickup_state}
                onChange={(e) => setFormData({ ...formData, pickup_state: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Dropoff Address</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Input
                placeholder="Address"
                value={formData.dropoff_address}
                onChange={(e) => setFormData({ ...formData, dropoff_address: e.target.value })}
                required
              />
              <Input
                placeholder="City"
                value={formData.dropoff_city}
                onChange={(e) => setFormData({ ...formData, dropoff_city: e.target.value })}
                required
              />
              <Input
                placeholder="State"
                value={formData.dropoff_state}
                onChange={(e) => setFormData({ ...formData, dropoff_state: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payment_method">Payment Method</Label>
            <select
              id="payment_method"
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as "card" | "wallet" })}
              className="w-full px-3 py-2 border border-neutral-200 rounded mt-2"
            >
              <option value="card">Card</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          <div>
            <Label htmlFor="special_instructions">Special Instructions</Label>
            <textarea
              id="special_instructions"
              value={formData.special_instructions}
              onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
              rows={2}
              className="w-full  px-3 py-2 border border-neutral-200 rounded mt-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 text-white">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}