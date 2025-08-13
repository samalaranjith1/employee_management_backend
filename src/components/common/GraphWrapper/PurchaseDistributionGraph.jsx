"use client";

import React from "react";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PurchaseDistributionGraph({ pieData, styles }) {
  return (
    <>
      <div className="fw-semibold mb-2">Purchase Distribution</div>
      <Card className="p-3">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart className="pie-chart-no-outline">
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} units`, name]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.pieLegend}>
          {pieData.map((item, idx) => (
            <div style={styles.legendItem} key={idx}>
              <div
                style={{
                  ...styles.legendDot,
                  backgroundColor: item.color,
                }}
              ></div>
              {item.name}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
