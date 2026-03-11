"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useActivityLog } from "../hooks/useActivityLog";
import { ActivityLogTable } from "./ActivityLogTable";

export function ActivityLogList() {
  const { logs, loading, page, setPage, totalPages, total, limit } = useActivityLog();

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(page - 1, page, page + 1, page + 2, page + 3);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-text-primary">Activity Log</h1>

      {/* Table */}
      <ActivityLogTable logs={logs} loading={loading} />

      {/* Pagination */}
      {!loading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {startIndex}-{endIndex} from {total}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {renderPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => setPage(pageNum)}
                className={`w-8 h-8 rounded text-sm ${
                  page === pageNum
                    ? "bg-blue-600 text-white"
                    : "text-text-secondary hover:bg-neutral-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > 5 && page < totalPages - 2 && (
              <span className="text-text-secondary">...</span>
            )}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
