"use client";
import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { consumptionMenuItemDataAnalyticsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

const MenuItemConsumptionAnalytics = () => {
  const { formatted, totalConsumption } =
    consumptionMenuItemDataAnalyticsDataFormatter();

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#ef4444",
    "#6366f1",
    "#10b981",
    "#eab308",
    "#22c55e",
  ];

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#fff", borderRadius: "12px" }}
    >
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 style={{ fontWeight: "600" }}>Menu Item Consumption Analysis</h5>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Item consumption breakdown by menu items with quantity distribution
          </p>
        </Col>
      </Row>

      <Row>
        {/* Left Table */}
        <Col md={7}>
          <Table borderless responsive>
            <thead>
              <tr>
                <th style={{ fontSize: "14px", color: "#666" }}>Menu Item</th>
                <th style={{ fontSize: "14px", color: "#666" }}>Recipe</th>
                <th style={{ fontSize: "14px", color: "#666" }}>
                  Total Consumption
                </th>
              </tr>
            </thead>
            <tbody>
              {formatted.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {item.icon}
                      <div>
                        <div style={{ fontWeight: "500" }}>{item.name}</div>
                        <small style={{ color: "#888" }}>
                          {item.items} items
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: "#2563eb", fontWeight: "600" }}>
                      {item.recipeQty}
                    </div>
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      ₹{item.recipePrice}
                    </div>
                  </td>
                  <td>
                    <div style={{ color: "#22c55e", fontWeight: "600" }}>
                      {item.totalQty} gm
                    </div>
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      ₹{item.totalPrice}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {/* Right Chart */}
        <Col md={5} >
          <div className="mt-2 text-left">
            <h6 style={{ fontWeight: "600" }}>Consumption Distribution</h6>
            <hr></hr>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={formatted}
                dataKey="chartValue"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
              >
                {formatted.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div style={{ marginTop: "-20px", width: "100%" }}>
            {formatted.map((item, idx) => {
              const percent = (
                (item.totalQty / totalConsumption) *
                100
              ).toFixed(1);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: COLORS[idx],
                        borderRadius: "50%",
                      }}
                    ></span>
                    {item.name}
                  </span>
                  <span style={{ fontSize: "14px", color: "#555" }}>
                    {item.totalQty} gm ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-2 p-2 text-center"
            style={{
              background: "#f8f9fa",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Total Consumption: {totalConsumption} gm
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuItemConsumptionAnalytics;
