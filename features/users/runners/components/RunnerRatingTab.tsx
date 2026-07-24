"use client";

import { Star, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MAX_RATING } from "@/lib/config/feature-flags";
import { reviewsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { formatDate } from "@/lib/utils/date";

interface Review {
  id: string;
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
}

interface RunnerRatingTabProps {
  runnerId: string;
  completedTasks?: number;
}

export function RunnerRatingTab({
  runnerId,
  completedTasks = 0,
}: RunnerRatingTabProps) {
  const { data: summary } = useQuery({
    queryKey: queryKeys.runners.ratingSummary(runnerId),
    queryFn: () => reviewsService.getRunnerRatingSummary(runnerId),
    enabled: Boolean(runnerId),
  });

  const { data: reviewRows } = useQuery({
    queryKey: queryKeys.runners.reviews(runnerId),
    queryFn: () => reviewsService.getRunnerReviews(runnerId),
    enabled: Boolean(runnerId),
  });

  const reviews: Review[] = (reviewRows ?? []).map((r) => ({
    id: r.id,
    reviewerName: r.client_name ?? "Anonymous",
    date: formatDate(r.created_at),
    rating: r.rating,
    comment: r.review ?? "",
  }));
  const averageRating = summary?.average_rating ?? 0;
  const totalReviews = summary?.total_reviews ?? reviews.length;

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
                {Array.from({ length: MAX_RATING }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
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
    <div className="bg-white rounded border border-neutral-200 p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Ratings & Reviews</h2>

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

      <h3 className="text-lg font-semibold text-text-primary mb-4">Feedback</h3>

      <DataTable
        columns={columns}
        data={reviews}
        keyExtractor={(review) => review.id}
        emptyMessage="No reviews found"
      />
    </div>
  );
}
