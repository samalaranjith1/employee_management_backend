"use client";

import { IconTrendingUp } from "@tabler/icons-react";
import React from "react";
import { Card, ButtonGroup, Button, ToggleButton, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  Legend,
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
        {/* <div
          className="mb-3 p-3"
          style={{ backgroundColor: "rgb(243,246,255)" }}
        >
          <Row className="align-items-center">
            <Col xs="auto">
              <div
                style={{
                  background: "linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)",
                  borderRadius: "12px",
                  padding: "8px",
                  display: "inline-block",
                }}
              >
                <IconTrendingUp stroke={2} color="#fff" size={24} />
              </div>
            </Col>

            <Col className="flex-grow-1">
              <h5 className="fw-bold mb-0">Purchase Trend Analysis</h5>
              <small className="text-muted">
                Purchase amounts and average pricing trends over time
              </small>
            </Col>

            <Col xs="auto">
              <ButtonGroup
                className="rounded-pill"
                style={{
                  backgroundColor: "#eee",
                  padding: '4px',
                  borderRadius: '10px'
                }}
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
        </div> */}

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
                  // value="Purchase Amount"
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
                  // value="Average Price"
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
              <Legend
                verticalAlign="bottom"
                height={8}
                iconType="line"
                align="center"
              />
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
