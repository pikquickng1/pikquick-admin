"use client";

import { X, Star } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CityData {
  name: string;
  tasks: number;
  revenue: string;
  rating: number;
}

interface CompareCitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: string[];
}

const cityMetrics: Record<string, CityData> = {
  Lagos: { name: "Lagos", tasks: 1240, revenue: "₦2.5M", rating: 4.6 },
  Abuja: { name: "Abuja", tasks: 920, revenue: "₦1.8M", rating: 4.5 },
  Ibadan: { name: "Ibadan", tasks: 650, revenue: "₦1.3M", rating: 4.4 },
  "Port Harcourt": { name: "Port Harcourt", tasks: 550, revenue: "₦1.1M", rating: 4.3 },
  Kano: { name: "Kano", tasks: 450, revenue: "₦900K", rating: 4.2 },
};

export function CompareCitiesModal({
  isOpen,
  onClose,
  cities,
}: CompareCitiesModalProps) {
  const [city1, setCity1] = useState(cities[0] || "Lagos");
  const [city2, setCity2] = useState(cities[1] || "Abuja");

  const city1Data = cityMetrics[city1];
  const city2Data = cityMetrics[city2];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Compare Cities
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Select two cities to compare their performance metrics
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* City Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                City 1
              </label>
              <select
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                City 2
              </label>
              <select
                value={city2}
                onChange={(e) => setCity2(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* City 1 Column */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-text-primary">
                {city1Data.name}
              </h3>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Tasks</p>
                <p className="text-2xl font-bold text-text-primary">
                  {city1Data.tasks}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Revenue</p>
                <p className="text-2xl font-bold text-text-primary">
                  {city1Data.revenue}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-text-primary">
                    {city1Data.rating}
                  </p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* City 2 Column */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-text-primary">
                {city2Data.name}
              </h3>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Tasks</p>
                <p className="text-2xl font-bold text-text-primary">
                  {city2Data.tasks}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Revenue</p>
                <p className="text-2xl font-bold text-text-primary">
                  {city2Data.revenue}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-text-primary">
                    {city2Data.rating}
                  </p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
