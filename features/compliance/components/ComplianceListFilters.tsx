"use client";

import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ALL_FILTER } from "@/lib/types/enums";
import { FLAG_STATUS_OPTIONS } from "@/lib/constants/filters";
import { flagStatusLabel } from "@/lib/utils/status";
import type { ComplianceListFilters as Filters } from "../types/compliance.types";

interface ComplianceListFiltersProps {
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
}

export function ComplianceListFilters({ filters, onFiltersChange }: ComplianceListFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Input
        placeholder="Search by user or activity"
        value={filters.search}
        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
      />
      <Input
        type="date"
        value={filters.dateFrom ?? ""}
        onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
      />
      <Input
        type="date"
        value={filters.dateTo ?? ""}
        onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
      />
      <Select
        value={filters.status ?? ALL_FILTER}
        options={FLAG_STATUS_OPTIONS.map((o) => ({
          value: o.value,
          label: o.value === ALL_FILTER ? o.label : flagStatusLabel(o.value),
        }))}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as Filters["status"] })}
      />
      <Button
        variant="outline"
        onClick={() =>
          onFiltersChange({
            search: "",
            dateFrom: undefined,
            dateTo: undefined,
            status: ALL_FILTER,
          })
        }
      >
        Reset
      </Button>
    </div>
  );
}
