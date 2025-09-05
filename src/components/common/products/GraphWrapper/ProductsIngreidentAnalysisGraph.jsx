"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#82ca9d",
  "#ffc658",
  "#8884d8",
  "#a4de6c",
];

export default function ProductsIngreidentAnalysisGraph({
  chartData,
  totalCost,
}) {
  // Custom legend renderer (first 5 items, horizontal)
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "8px",
        }}
      >
        {payload.slice(0, 5).map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                marginRight: 6,
              }}
            ></span>
            {entry.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h6 className="fw-semibold">Total Cost Distribution</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
      <div className="fw-bold mt-2">Total Cost: ₹{totalCost.toFixed(2)}</div>
    </div>
  );
}
