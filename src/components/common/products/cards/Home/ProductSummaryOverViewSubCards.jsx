"use client";

import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#82ca9d",
  "#ffc658",
  "#8884d8",
  "#a4de6c",
];

export default function ProductSummaryOverViewSubCards({
  tableData = [],
  chartData = [],
  totalCost,
}) {
  return (
    <Card
      className="p-3 shadow-sm"
      style={{ borderRadius: "12px", background: "#fff" }}
    >
      <h5 className="fw-bold mb-3">Product Ingredient Analysis</h5>
      <p className="text-muted">
        Raw material breakdown showing recipe quantities and total cost
        distribution
      </p>

      <Row>
        {/* Table Section */}
        <Col md={7}>
          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Item (Raw Material)</th>
                <th>Recipe (Price, Qty)</th>
                <th>Total Cost (Price, Qty)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.key}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      {row.icon}
                      <div>
                        <div className="fw-semibold">{row.name}</div>
                        <small className="text-muted">{row.storeItem}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-primary fw-semibold">{row.recipe}</td>
                  <td className="text-success fw-semibold">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {/* Chart Section */}
        <Col md={5} className="d-flex flex-column align-items-center">
          <h6 className="fw-semibold">Total Cost Distribution</h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
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
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
          <div className="fw-bold mt-2">
            Total Cost: ₹{totalCost.toFixed(2)}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
