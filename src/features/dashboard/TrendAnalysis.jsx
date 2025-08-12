"use client";

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const dailyData = [
  { name: "Dec 1", Sales: 45, Consumption: 29, Opening: 33, Closing: 14 },
  { name: "Dec 2", Sales: 50, Consumption: 31, Opening: 14, Closing: 17 },
  { name: "Dec 3", Sales: 48, Consumption: 30, Opening: 16, Closing: 15 },
  { name: "Dec 4", Sales: 42, Consumption: 28, Opening: 15, Closing: 13 },
  { name: "Dec 5", Sales: 54, Consumption: 32, Opening: 13, Closing: 19 },
  { name: "Dec 6", Sales: 48, Consumption: 30, Opening: 18, Closing: 16 },
  { name: "Dec 7", Sales: 45, Consumption: 28, Opening: 15, Closing: 14 },
];

const weeklyData = [
  { name: "Week 1", Sales: 320, Consumption: 200, Opening: 140, Closing: 110 },
  { name: "Week 2", Sales: 340, Consumption: 210, Opening: 130, Closing: 120 },
  { name: "Week 3", Sales: 300, Consumption: 190, Opening: 150, Closing: 100 },
  { name: "Week 4", Sales: 360, Consumption: 220, Opening: 160, Closing: 115 },
];

const monthlyData = [
  { name: "Jan", Sales: 1200, Consumption: 800, Opening: 500, Closing: 400 },
  { name: "Feb", Sales: 1400, Consumption: 900, Opening: 550, Closing: 420 },
  { name: "Mar", Sales: 1300, Consumption: 850, Opening: 530, Closing: 410 },
];

export default function TrendAnalysis() {
  const [view, setView] = useState("Daily");

  const getData = () => {
    if (view === "Daily") return dailyData;
    if (view === "Weekly") return weeklyData;
    return monthlyData;
  };

  const averages = useMemo(() => {
    const data = getData();
    const keys = ["Sales", "Consumption", "Opening", "Closing"];
    const avg = {};
    keys.forEach((key) => {
      avg[key] = (
        data.reduce((sum, d) => sum + d[key], 0) / data.length
      ).toFixed(0);
    });
    return avg;
  }, [view]);

  return (
    <Container fluid className="m-1">
      <Container fluid className="p-2 bg-white rounded shadow-sm">
        <Row className="mb-3 align-items-center">
          <Col>
            <h4 className="mb-1">📈 Trend Analysis</h4>
            <p className="text-muted mb-0">
              Sales, consumption, and inventory trends over time
            </p>
          </Col>
          <Col xs="auto">
            <ButtonGroup>
              {["Daily", "Weekly", "Monthly"].map((type) => (
                <Button
                  key={type}
                  variant={view === type ? "primary" : "outline-secondary"}
                  onClick={() => setView(type)}
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={getData()}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `₹${value}k`}
              domain={[0, "auto"]}
            />
            <Tooltip formatter={(value) => `₹${value}k`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#22c55e"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Consumption" stroke="#f59e0b" />
            <Line type="monotone" dataKey="Opening" stroke="#3b82f6" />
            <Line type="monotone" dataKey="Closing" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>

        <Row className="mt-3 text-center fw-bold">
          <Col style={{ color: "#22c55e" }}>Avg Sales ₹{averages.Sales}k</Col>
          <Col style={{ color: "#f59e0b" }}>
            Avg Consumption ₹{averages.Consumption}k
          </Col>
          <Col style={{ color: "#3b82f6" }}>
            Avg Opening ₹{averages.Opening}k
          </Col>
          <Col style={{ color: "#8b5cf6" }}>
            Avg Closing ₹{averages.Closing}k
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
