"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#4285F4",
  "#34A853",
  "#FBBC05",
  "#EA4335",
  "#9C27B0",
  "#00ACC1",
  "#F4511E",
  "#7CB342",
];

const RawMaterialPurchaseAnalysisGraph = ({ pieData = [] }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h6
        className="fw-semibold mb-3"
        style={{ color: "#1A1A1A", fontSize: "14px" }}
      >
        Purchase Distribution
      </h6>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `₹${val.toLocaleString("en-IN")}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RawMaterialPurchaseAnalysisGraph;
