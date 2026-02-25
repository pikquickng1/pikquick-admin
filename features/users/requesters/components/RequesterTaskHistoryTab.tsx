'use client'

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RequesterTaskHistory } from "../types/requester.types";
import { RequesterTaskHistoryTable } from "./RequesterTaskHistoryTable";

interface RequesterTaskHistoryTabProps {
  tasks: RequesterTaskHistory[];
}

export function RequesterTaskHistoryTab({ tasks = [] }: RequesterTaskHistoryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-light overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Task History</h2>

        {/* Search and Filter Box - No bottom border */}
        <div className="bg-white border border-neutral-200 border-b-0 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-sm relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 py-7 border-neutral-200 rounded text-text-primary bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="h-14 px-4 border border-neutral-200 rounded text-sm text-text-primary bg-white flex items-center gap-2 hover:bg-neutral-50">
              <span>Filter</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="px-6 pb-6">
        <RequesterTaskHistoryTable tasks={filteredTasks} />
      </div>
    </div>
  );
}
