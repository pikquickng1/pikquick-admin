"use client";

import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";
import { ALL_FILTER, DocumentVerificationStatus } from "@/lib/types/enums";
import { RUNNER_VERIFICATION_OPTIONS } from "@/lib/constants/filters";
import type { RunnerDocumentFilters as Filters } from "../types/runner-document.types";

interface RunnerDocumentFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const VERIFICATION_OPTIONS = [
  ...RUNNER_VERIFICATION_OPTIONS,
] as ReadonlyArray<{ value: DocumentVerificationStatus | typeof ALL_FILTER; label: string }>;

export function RunnerDocumentFilters({ filters, onFiltersChange }: RunnerDocumentFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="relative md:col-span-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by runner name or document..."
          value={filters.search ?? ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 py-4 text-text-primary bg-white border border-neutral-200 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-4">
        <Select
          options={VERIFICATION_OPTIONS as ReadonlyArray<{ value: string; label: string }>}
          value={filters.status}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status:
                e.target.value === ALL_FILTER
                  ? ALL_FILTER
                  : (e.target.value as DocumentVerificationStatus),
            })
          }
        />
      </div>
    </div>
  );
}
