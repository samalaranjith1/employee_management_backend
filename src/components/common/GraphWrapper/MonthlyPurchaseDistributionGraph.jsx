"use client";

import React from "react";
import { Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";

export default function MonthlyPurchaseDistributionGraph({ data, styles }) {
  return (
    <div>
      <div className="fw-semibold mb-2">Monthly Purchase Distribution</div>
      <Card className="p-3">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.pie}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              activeShape={(props) => <Sector {...props} stroke="none" />}
            >
              {data.pie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={styles.pieLegend}>
          {data.pie.map((item, idx) => (
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
    </div>
  );
}
