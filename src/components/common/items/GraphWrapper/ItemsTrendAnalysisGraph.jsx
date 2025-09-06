"use client";

import React from "react";
import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ItemsTrendAnalysisGraph({
  chartData,
  filter,
  setFilter,
}) {
  return (
    <Card
      style={{
        borderRadius: "16px",
        padding: "20px",
        background: "#fff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
      }}
      className="mb-4"
    >
      <Row className="align-items-center mb-3">
        <Col>
          <h5 style={{ fontWeight: "600", color: "#1E1E1E", margin: 0 }}>
            Trend Analysis
          </h5>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>
            Sales, consumption, and inventory trends over time
          </p>
        </Col>
        <Col xs="auto">
          <ButtonGroup>
            {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
              <ToggleButton
                key={label}
                id={`filter-${label}`}
                type="radio"
                variant="light"
                value={label.toLowerCase().replace(" ", "")}
                checked={filter === label.toLowerCase().replace(" ", "")}
                onChange={(e) => setFilter(e.currentTarget.value)}
                className="rounded-pill px-3"
                style={{
                  fontSize: "13px",
                  backgroundColor:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#fff"
                      : "transparent",
                  color:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#FF5B22"
                      : "#6C757D",
                  border:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "1px solid #FF5B22"
                      : "1px solid #dee2e6",
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="opening"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Opening"
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#F97316"
            strokeWidth={2}
            dot={false}
            name="Consumption"
          />
          <Line
            type="monotone"
            dataKey="closing"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="Closing"
          />
          <Line
            type="monotone"
            dataKey="consumptionValue"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={false}
            name="Consumption Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
