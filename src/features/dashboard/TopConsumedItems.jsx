"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUtensils, FaExpand, FaSortUp, FaSortDown } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function TopConsumedItems() {
  // Raw data
  const data = [
    {
      name: "Basmati Rice",
      category: "Grains",
      value: 45000,
      percent: 18.5,
      color: "#E74C3C",
      change: "up",
    },
    {
      name: "Chicken Breast",
      category: "Protein",
      value: 38000,
      percent: 15.6,
      color: "#2980B9",
      change: "up",
    },
    {
      name: "Paneer",
      category: "Dairy",
      value: 32000,
      percent: 13.2,
      color: "#27AE60",
      change: "up",
    },
    {
      name: "Onions",
      category: "Vegetables",
      value: 28000,
      percent: 11.5,
      color: "#F39C12",
      change: "up",
    },
    {
      name: "Tomatoes",
      category: "Vegetables",
      value: 25000,
      percent: 10.3,
      color: "#8E44AD",
      change: "up",
    },
    {
      name: "Wheat Flour",
      category: "Grains",
      value: 22000,
      percent: 9.1,
      color: "#D35400",
      change: "up",
    },
    {
      name: "Green Chilies",
      category: "Spices",
      value: 18000,
      percent: 7.4,
      color: "#16A085",
      change: "down",
    },
    {
      name: "Garam Masala",
      category: "Spices",
      value: 15000,
      percent: 6.2,
      color: "#2C3E50",
      change: "down",
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      className="p-3"
      style={{
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <div
            style={{
              backgroundColor: "#FFECE7",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaUtensils color="#FF5016" />
          </div>
        </Col>
        <Col>
          <h6 className="mb-0" style={{ color: "#FF5016", fontWeight: 600 }}>
            Top Consumed Items
          </h6>
        </Col>
        <Col xs="auto">
          <FaExpand color="#A0AEC0" />
        </Col>
      </Row>

      {/* Body */}
      <Row>
        {/* Left: Donut Chart */}
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                isAnimationActive={true}
                label={({ name, percent }) => `${percent.toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Tooltip on hover */}
              <Tooltip
                formatter={(value, name, props) => [
                  `₹${value.toLocaleString()}`,
                  props.payload.name,
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  padding: "6px 10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Col>

        {/* Right: Legend + Values */}
        <Col md={7} style={{ maxHeight: 250, overflowY: "auto" }}>
          {data.map((item, idx) => (
            <Row
              key={idx}
              className="align-items-center mb-2"
              style={{ fontSize: "14px" }}
            >
              {/* Color Dot */}
              <Col xs="auto">
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                />
              </Col>
              {/* Name + Category */}
              <Col>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  {item.category}
                </div>
              </Col>
              {/* Value + Percent */}
              <Col xs="auto" className="text-end">
                <div style={{ fontWeight: 500 }}>
                  ₹{item.value.toLocaleString()}
                  {item.change === "up" && (
                    <FaSortUp
                      size={12}
                      style={{ marginLeft: 4, color: "#2ecc71" }}
                    />
                  )}
                  {item.change === "down" && (
                    <FaSortDown
                      size={12}
                      style={{ marginLeft: 4, color: "#e74c3c" }}
                    />
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  {item.percent}%
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

      {/* Footer */}
      <Row className="mt-3">
        <Col>
          <strong>Total Consumption:</strong>
        </Col>
        <Col xs="auto" style={{ fontWeight: 600, color: "#FF5016" }}>
          ₹{total.toLocaleString()}
        </Col>
      </Row>
    </Card>
  );
}
