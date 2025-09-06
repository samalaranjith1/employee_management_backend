"use client";

import React from "react";
import { Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function ItemsMenuItemConsumptionAnalysisGraph({ chartData }) {
  const COLORS = [
    "#4e79a7",
    "#59a14f",
    "#f28e2c",
    "#e15759",
    "#76b7b2",
    "#edc949",
  ];

  return (
    <Col
      md={5}
      className="d-flex flex-column"
      style={{
        maxHeight: "65vh",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <h6 className="fw-bold text-center mb-3">Consumption Distribution</h6>

      {/* Chart Section */}
      <div
        style={{
          flexShrink: 0,
          height: 250,
          marginBottom: "1rem",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
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
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          maxHeight: "200px", // 👈 Fixed height for labels
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        {chartData.map((d, i) => (
          <div key={i} className="d-flex justify-content-between small mb-2">
            <span>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS[i % COLORS.length],
                  marginRight: 6,
                }}
              />
              {d.name}
            </span>
            <span>{d.value} gm</span>
          </div>
        ))}
      </div>
    </Col>
  );
}
