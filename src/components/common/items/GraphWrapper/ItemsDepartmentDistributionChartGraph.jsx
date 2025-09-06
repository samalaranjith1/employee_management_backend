"use client";

import React from "react";
import { Col } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function ItemsDepartmentDistributionChartGraph({ formatted }) {
  return (
    <Col md={6} className="d-flex justify-content-center">
      <div style={{ width: "260px", height: "260px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formatted}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {formatted?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              contentStyle={{ borderRadius: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Col>
  );
}
