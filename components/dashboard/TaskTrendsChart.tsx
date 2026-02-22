"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", tasks: 135 },
  { day: "Tue", tasks: 60 },
  { day: "Wed", tasks: 105 },
  { day: "Thu", tasks: 75 },
  { day: "Fri", tasks: 175 },
  { day: "Sat", tasks: 170 },
  { day: "Sun", tasks: 115 },
];

export function TaskTrendsChart() {
  return (
    <div className="bg-white rounded-l p-6 border border-neutral-200">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Task Trends (Weekly)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          {/* Horizontal solid lines */}
          <CartesianGrid
            stroke="#F0F2F5"
            strokeWidth={1}
            vertical={false}
            horizontal={true}
          />
          {/* Vertical dotted lines */}
          <CartesianGrid
            stroke="#F0F2F5"
            strokeWidth={1}
            strokeDasharray="3 3"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            dataKey="day"
            axisLine={{ stroke: '#F0F2F5', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#6e7681', fontSize: 13 }}
          />
          <YAxis
            axisLine={{ stroke: '#F0F2F5', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#6e7681', fontSize: 13 }}
            domain={[0, 240]}
            ticks={[0, 60, 120, 180, 240]}
          />
          <Line
            type="linear"
            dataKey="tasks"
            stroke="#4A85E4"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
