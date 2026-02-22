"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showingFrom: number;
    showingTo: number;
    totalItems: number;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showingFrom,
    showingTo,
    totalItems,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= maxVisible; i++) {
                    pages.push(i);
                }
                pages.push("...");
            } else if (currentPage >= totalPages - 2) {
                pages.push("...");
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
                Showing {showingFrom}-{showingTo} from {totalItems}
            </p>
            <div className="flex items-center gap-2">
                <button
                    className={cn(
                        "w-8 h-8 rounded-md border border-neutral-200 text-text-primary transition-colors",
                        currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-neutral-50"
                    )}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="text-text-secondary">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={cn(
                                "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                                currentPage === page
                                    ? "bg-primary-500 text-white hover:bg-primary-600"
                                    : "border border-neutral-200 text-text-primary hover:bg-neutral-50"
                            )}
                            onClick={() => onPageChange(page as number)}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className={cn(
                        "w-8 h-8 rounded-md border border-neutral-200 text-text-primary transition-colors",
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-neutral-50"
                    )}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
