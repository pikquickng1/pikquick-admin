"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: ReadonlyArray<SelectOption> | SelectOption[];
  placeholder?: string;
}

/**
 * Shared `<select>` wrapper that:
 * - Centralizes the dropdown-arrow SVG (was inlined in 10+ files).
 * - Applies a consistent Tailwind style.
 * - Accepts a typed `options` array.
 */
export function Select({
  options,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={cn(
          "w-full appearance-none bg-white border border-neutral-200 rounded text-sm text-gray-900 px-4 py-4 pr-10 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer",
          className,
        )}
      >
        {placeholder !== undefined && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
        viewBox="0 0 12 12"
        aria-hidden
      >
        <path fill="currentColor" d="M6 9L1 4h10z" />
      </svg>
    </div>
  );
}
