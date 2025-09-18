"use client";

import React from "react";
import { Card, ButtonGroup, Button, ToggleButton } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function ItemsPurchaseTrendAnalysisGraph({
  chartData,
  filter,
  setFilter,
}) {
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  return (
    <Card className="shadow-sm border-0 mb-4 rounded-4">
      <Card.Body>
        <div
          className="d-flex justify-content-between align-items-center mb-3 p-3"
          style={{
            backgroundColor: "rgb(243,246,255)",
          }}
        >
          <div>
            <h5 className="fw-bold mb-0">Purchase Trend Analysis</h5>
            <small className="text-muted">
              Purchase amounts and average pricing trends over time
            </small>
          </div>
          <ButtonGroup
            className="rounded-pill"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(" ", "");
              const selected = filter === value;
              return (
                <ToggleButton
                  key={label}
                  id={`dept-graph-${label}`}
                  type="radio"
                  variant="none"
                  checked={selected}
                  value={value}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill"
                  style={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    backgroundColor: selected ? "#FF6600" : "transparent",
                    color: selected ? "white" : "#888",
                    border: "none",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
          {/* <ButtonGroup>
            <Button
              className={`tab-btn ${filter === "daily" ? "active" : ""}`}
              onClick={() => setFilter("daily")}
            >
              Daily
            </Button>
            <Button
              className={`tab-btn ${filter === "sameday" ? "active" : ""}`}
              onClick={() => setFilter("sameday")}
            >
              Same Days
            </Button>
            <Button
              className={`tab-btn ${filter === "weekly" ? "active" : ""}`}
              onClick={() => setFilter("weekly")}
            >
              Weekly
            </Button>
            <Button
              className={`tab-btn ${filter === "monthly" ? "active" : ""}`}
              onClick={() => setFilter("monthly")}
            >
              Monthly
            </Button>
          </ButtonGroup> */}
        </div>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#3b82f6"
                tickFormatter={(v) => `₹${v}`}
              >
                <Label
                  value="Purchase Amount"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fill: "#3b82f6",
                    fontSize: 12,
                  }}
                />
              </YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#8b5cf6"
                tickFormatter={(v) => `₹${v}`}
              >
                <Label
                  value="Average Price"
                  angle={90}
                  position="insideRight"
                  style={{
                    textAnchor: "middle",
                    fill: "#8b5cf6",
                    fontSize: 12,
                  }}
                />
              </YAxis>
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="purchaseAmount"
                stroke="#3b82f6"
                name="Purchase Amount"
                strokeWidth={2}
                dot={{ r: 5, fill: "#3b82f6" }}
                label={{
                  position: "top",
                  fill: "#3b82f6",
                  fontSize: 12,
                }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgPrice"
                stroke="#8b5cf6"
                name="Average Price"
                strokeWidth={2}
                dot={{ r: 5, fill: "#8b5cf6" }}
                label={{
                  position: "top",
                  fill: "#8b5cf6",
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
