"use client";

const areas = [
  { name: "Lekki, Lagos", tasks: 342 },
  { name: "Victoria Island, Lagos", tasks: 289 },
  { name: "Ikeja, Lagos", tasks: 245 },
  { name: "Surulere, Lagos", tasks: 156 },
  { name: "Yaba, Lagos", tasks: 113 },
];

const maxTasks = 700;

export function TopActiveAreas() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Top Active Areas</h3>
      <div className="space-y-4">
        {areas.map((area) => (
          <div key={area.name} className="flex items-center gap-4">
            <div className="w-40 text-sm text-text-primary text-right">
              {area.name}
            </div>
            <div className="flex-1 relative">
              <div className="h-6 bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-r-full transition-all"
                  style={{ width: `${(area.tasks / maxTasks) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-20 text-sm text-text-secondary text-right">
              {area.tasks} tasks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
