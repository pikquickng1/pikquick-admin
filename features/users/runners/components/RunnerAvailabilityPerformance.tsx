import { Runner } from "../types/runner.types";

interface RunnerAvailabilityPerformanceProps {
  runner: Runner;
}

export function RunnerAvailabilityPerformance({ runner }: RunnerAvailabilityPerformanceProps) {
  const completionRate = runner.tasksCompleted > 0 
    ? Math.round((runner.tasksCompleted / (runner.tasksCompleted + 10)) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Availability</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-text-primary">
            {runner.status === "Available" ? "Available" : "Unavailable"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={runner.status === "Available"}
              readOnly
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      {/* Performance */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Performance</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Completion Rate</span>
              <span className="text-sm font-medium text-text-primary">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Total Tasks</span>
              <span className="text-sm font-medium text-text-primary">{runner.tasksCompleted + 7}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Completed</span>
              <span className="text-sm font-medium text-green-600">{runner.tasksCompleted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
