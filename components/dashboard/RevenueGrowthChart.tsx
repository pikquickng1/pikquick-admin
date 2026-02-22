"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", bottom: 2.5, middle: 1.5, top: 1.5 },
  { month: "Feb", bottom: 2.5, middle: 1, top: 0 },
  { month: "Mar", bottom: 2.5, middle: 3, top: 3 },
  { month: "Apr", bottom: 2.5, middle: 1, top: 0 },
  { month: "May", bottom: 2.5, middle: 1, top: 0 },
  { month: "Jun", bottom: 2.5, middle: 1, top: 0 },
];

// Custom shape for middle bar that conditionally applies radius
const MiddleBar = (props: any) => {
  const { fill, x, y, width, height, index } = props;

  if (!data[index]) return null;

  const hasTopSegment = data[index].top > 0;

  if (hasTopSegment) {
    // No radius if there's a top segment
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  } else {
    // Rounded top if this is the last segment
    const radius = 10;
    return (
      <path
        d={`
          M ${x},${y + height}
          L ${x},${y + radius}
          Q ${x},${y} ${x + radius},${y}
          L ${x + width - radius},${y}
          Q ${x + width},${y} ${x + width},${y + radius}
          L ${x + width},${y + height}
          Z
        `}
        fill={fill}
      />
    );
  }
};

export function RevenueGrowthChart() {
  return (
    <div className="bg-white rounded-l p-6 border border-neutral-200">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Revenue Growth Curve (Monthly)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid
            stroke="#F0F2F5"
            strokeWidth={1}
            vertical={false}
            horizontal={true}
          />
          <CartesianGrid
            stroke="#F0F2F5"
            strokeWidth={1}
            strokeDasharray="3 3"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: '#F0F2F5', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#6e7681', fontSize: 13 }}
          />
          <YAxis
            axisLine={{ stroke: '#F0F2F5', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#6e7681', fontSize: 13 }}
            domain={[0, 15]}
            ticks={[0, 5, 10, 15]}
            tickFormatter={(value) => `${value}M`}
          />

          {/* Bottom segment - lightest blue (0-2.5M) */}
          <Bar
            dataKey="bottom"
            stackId="a"
            fill="#B8D4F7"
            barSize={30}
          />

          {/* Middle segment - medium blue (2.5M-5.5M) */}
          <Bar
            dataKey="middle"
            stackId="a"
            fill="#7BA8ED"
            shape={MiddleBar}
            barSize={30}
          />

          {/* Top segment - darker blue (above 5.5M) */}
          <Bar
            dataKey="top"
            stackId="a"
            fill="#5B8FE8"
            radius={[10, 10, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
