"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatNgn } from "@/lib/utils/money";
import { analyticsService } from "@/lib/services/analytics.service";
import { queryKeys } from "@/lib/query/keys";

interface CityData {
  name: string;
  tasks: number;
  revenue: number;
  rating: number;
}

interface CompareCitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: string[];
}

export function CompareCitiesModal({
  isOpen,
  onClose,
  cities,
}: CompareCitiesModalProps) {
  const [city1, setCity1] = useState(cities[0] || "");
  const [city2, setCity2] = useState(cities[1] || "");

  const { data: cityMetrics } = useQuery({
    queryKey: queryKeys.analytics.cityMetrics(),
    queryFn: () => analyticsService.getCityMetrics(),
    enabled: isOpen,
  });

  const metricsByCity = new Map(
    (cityMetrics ?? []).map((m) => [
      m.city,
      { name: m.city, tasks: m.tasks, revenue: m.revenue, rating: m.rating },
    ]),
  );

  const city1Data = metricsByCity.get(city1);
  const city2Data = metricsByCity.get(city2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Compare Cities
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Select two cities to compare their performance metrics
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                City 1
              </label>
              <Select
                value={city1}
                options={cities.map((c) => ({ value: c, label: c }))}
                onChange={(e) => setCity1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                City 2
              </label>
              <Select
                value={city2}
                options={cities.map((c) => ({ value: c, label: c }))}
                onChange={(e) => setCity2(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CityColumn data={city1Data} tone="blue" />
            <CityColumn data={city2Data} tone="green" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CityColumn({ data, tone }: { data: CityData | undefined; tone: "blue" | "green" }) {
  const bgClass = tone === "blue" ? "bg-blue-50" : "bg-green-50";
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-text-primary">{data?.name ?? "—"}</h3>
      <div className={`${bgClass} rounded-lg p-4`}>
        <p className="text-xs text-text-secondary mb-1">Tasks</p>
        <p className="text-2xl font-bold text-text-primary">{data?.tasks ?? 0}</p>
      </div>
      <div className={`${bgClass} rounded-lg p-4`}>
        <p className="text-xs text-text-secondary mb-1">Revenue</p>
        <p className="text-2xl font-bold text-text-primary">
          {data ? formatNgn(data.revenue) : "—"}
        </p>
      </div>
      <div className={`${bgClass} rounded-lg p-4`}>
        <p className="text-xs text-text-secondary mb-1">Rating</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-text-primary">{data?.rating ?? "—"}</p>
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    </div>
  );
}
