"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatNgn } from "@/lib/utils/money";

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

/**
 * TODO: Compare-cities metrics are hardcoded (Lagos/Abuja/etc. with mock
 * task counts and revenue) because the backend does not yet expose a
 * per-city breakdown endpoint. Replace once `/admin/analytics/cities` is
 * available.
 */
const CITY_METRICS: Record<string, CityData> = {
  Lagos: { name: "Lagos", tasks: 1240, revenue: 2_500_000, rating: 4.6 },
  Abuja: { name: "Abuja", tasks: 920, revenue: 1_800_000, rating: 4.5 },
  Ibadan: { name: "Ibadan", tasks: 650, revenue: 1_300_000, rating: 4.4 },
  "Port Harcourt": { name: "Port Harcourt", tasks: 550, revenue: 1_100_000, rating: 4.3 },
  Kano: { name: "Kano", tasks: 450, revenue: 900_000, rating: 4.2 },
};

export function CompareCitiesModal({
  isOpen,
  onClose,
  cities,
}: CompareCitiesModalProps) {
  const [city1, setCity1] = useState(cities[0] || "Lagos");
  const [city2, setCity2] = useState(cities[1] || "Abuja");

  const city1Data = CITY_METRICS[city1];
  const city2Data = CITY_METRICS[city2];

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
