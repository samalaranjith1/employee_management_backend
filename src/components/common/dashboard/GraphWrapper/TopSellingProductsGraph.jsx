import React from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
function TopSellingProductsGraph({ chartData }) {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f8" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Legend />
          <Tooltip />
          <Bar
            yAxisId="left"
            dataKey="sales"
            barSize={36}
            fill="#5d9d4a"
            radius={[6, 6, 0, 0]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="margin"
            stroke="#f3a92d"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#fff",
              stroke: "#f3a92d",
              strokeWidth: 2,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
  );
}

export default TopSellingProductsGraph