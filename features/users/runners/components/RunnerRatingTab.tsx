"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
    id: string;
    reviewerName: string;
    date: string;
    rating: number;
    comment: string;
}

export function RunnerRatingTab() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 13;
    const itemsPerPage = 8;
    const totalItems = 100;

    // Mock reviews data
    const reviews: Review[] = [
        {
            id: "1",
            reviewerName: "Chioma O.",
            date: "2025-10-28",
            rating: 5,
            comment: "Excellent service, highly recommended.",
        },
        {
            id: "2",
            reviewerName: "Chioma O.",
            date: "2025-10-28",
            rating: 5,
            comment: "Excellent service, highly recommended.",
        },
        {
            id: "3",
            reviewerName: "Chioma O.",
            date: "2025-10-28",
            rating: 5,
            comment: "Excellent service, highly recommended.",
        },
        {
            id: "4",
            reviewerName: "Chioma O.",
            date: "2025-10-28",
            rating: 5,
            comment: "Excellent service, highly recommended.",
        },
        {
            id: "5",
            reviewerName: "Chioma O.",
            date: "2025-10-28",
            rating: 5,
            comment: "Excellent service, highly recommended.",
        },
    ];

    const averageRating = 4.8;
    const totalReviews = 4;
    const completedTasks = 138;

    const columns = [
        {
            key: "reviewer",
            header: "",
            render: (review: Review) => (
                <div className="flex items-start gap-4 py-2">
                    <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary-500 text-white">
                            <User className="w-6 h-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <p className="text-sm font-medium text-text-primary">{review.reviewerName}</p>
                                <p className="text-xs text-text-secondary">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary">{review.comment}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Ratings & Reviews</h2>

                {/* Rating Summary */}
                <div className="bg-orange-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                            <span className="text-4xl font-bold text-text-primary">{averageRating}</span>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-text-primary mb-1">
                                {totalReviews} Total Reviews
                            </p>
                            <p className="text-sm text-text-secondary">{completedTasks} completed tasks</p>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <h3 className="text-lg font-semibold text-text-primary mb-4">Feedback</h3>

                <DataTable
                    columns={columns}
                    data={reviews}
                    keyExtractor={(review) => review.id}
                    emptyMessage="No reviews found"
                />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showingFrom={(currentPage - 1) * itemsPerPage + 1}
                showingTo={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
            />
        </div>
    );
}
