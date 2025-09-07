"use client";

import React from "react";
import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp } from "react-icons/fa";

export default function DepartmentTrendAnalysisGraph({
  trendData,
  filter,
  setFilter,
}) {
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  return (
    // <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
    <Card
      className="p-4 shadow-sm"
      style={{
        borderRadius: 16,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header + Filter */}
      <Row className="align-items-center mb-3">
        <Col>
          <h5 className="fw-bold mb-0 d-flex align-items-center">
            <FaArrowUp className="me-2 text-primary" size={20} />
            Trend Analysis
          </h5>
          <small className="text-muted">
            Sales, consumption, and inventory trends over time
          </small>
        </Col>
        <Col xs="auto">
          {/* <ButtonGroup>
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(" ", "");
              return (
                <ToggleButton
                  key={label}
                  id={`dept-graph-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === value}
                  value={value}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3"
                  style={{
                    fontSize: "13px",
                    backgroundColor: filter === value ? "#fff" : "transparent",
                    color: filter === value ? "#FF5B22" : "#6C757D",
                    border:
                      filter === value
                        ? "1px solid #FF5B22"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup> */}
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
        </Col>
      </Row>

      {/* Line Chart */}
      <div style={{ width: "100%", height: 400 }}>
        {/* <ResponsiveContainer>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#FB8C00"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Consumption"
            />
            <Line
              type="monotone"
              dataKey="opening"
              stroke="#42A5F5"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Opening"
            />
            <Line
              type="monotone"
              dataKey="closing"
              stroke="#9C27B0"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Closing"
            />
          </LineChart>
        </ResponsiveContainer> */}
        <ResponsiveContainer>
          <LineChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                const options = { month: "short", day: "numeric" };
                return date.toLocaleDateString("en-US", options); // e.g., Dec 1
              }}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

            {/* Sales */}
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4CAF50"
              strokeWidth={3}
              dot={{ r: 5, fill: "white", stroke: "#4CAF50", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
              name="Sales"
            />
            {/* Consumption */}
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#FB8C00"
              strokeWidth={3}
              dot={{ r: 5, fill: "white", stroke: "#FB8C00", strokeWidth: 2 }}
              name="Consumption"
            />
            {/* Opening */}
            <Line
              type="monotone"
              dataKey="opening"
              stroke="#42A5F5"
              strokeWidth={3}
              dot={{ r: 5, fill: "white", stroke: "#42A5F5", strokeWidth: 2 }}
              name="Opening"
            />
            {/* Closing */}
            <Line
              type="monotone"
              dataKey="closing"
              stroke="#9C27B0"
              strokeWidth={3}
              dot={{ r: 5, fill: "white", stroke: "#9C27B0", strokeWidth: 2 }}
              name="Closing"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* <Row className="mt-3">
        <Col className="d-flex justify-content-center gap-4">
          <span className="fw-semibold" style={{ color: "#4CAF50" }}>
            Sales
          </span>
          <span className="fw-semibold" style={{ color: "#FB8C00" }}>
            Consumption
          </span>
          <span className="fw-semibold" style={{ color: "#42A5F5" }}>
            Opening
          </span>
          <span className="fw-semibold" style={{ color: "#9C27B0" }}>
            Closing
          </span>
        </Col>
      </Row> */}
      <Row className="mt-3">
        <Col className="d-flex justify-content-center gap-3">
          {[
            { label: "Sales", color: "#4CAF50" },
            { label: "Consumption", color: "#FB8C00" },
            { label: "Opening", color: "#42A5F5" },
            { label: "Closing", color: "#9C27B0" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="fw-semibold"
              style={{ color, fontSize: 13 }}
            >
              {label}
            </span>
          ))}
        </Col>
      </Row>
    </Card>
  );
}
