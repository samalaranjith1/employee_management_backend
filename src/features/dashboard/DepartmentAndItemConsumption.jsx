"use client";
import ComponentHeader from "@/components/common/ComponentHeader";
import React, { useRef } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Mock Data
const purchaseData = [
  {
    name: "Kitchen Essentials",
    value: 125000,
    percent: 18.3,
    color: "#f87171",
  },
  { name: "Beverages", value: 98000, percent: 14.3, color: "#2dd4bf" },
  { name: "Spices & Sauces", value: 85000, percent: 12.4, color: "#60a5fa" },
  { name: "Dairy Products", value: 75000, percent: 11.0, color: "#a3e635" },
  { name: "Vegetables", value: 68000, percent: 10.0, color: "#facc15" },
  { name: "Other", value: 232000, percent: 34.0, color: "#a78bfa" },
];

const consumptionData = [
  { name: "Basmati Rice", value: 45000, percent: 16.7, color: "#f87171" },
  { name: "Chicken", value: 38000, percent: 14.1, color: "#2dd4bf" },
  { name: "Onions", value: 32000, percent: 11.9, color: "#60a5fa" },
  { name: "Tomatoes", value: 28000, percent: 10.4, color: "#a3e635" },
  { name: "Milk", value: 25000, percent: 9.3, color: "#facc15" },
  { name: "Other", value: 102000, percent: 37.6, color: "#a78bfa" },
];

// Custom Label Renderer
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18; // place label outside
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#555"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

export default function DepartmentItemConsumption() {
  const totalPurchases = purchaseData.reduce((sum, d) => sum + d.value, 0);
  const totalConsumption = consumptionData.reduce((sum, d) => sum + d.value, 0);

  const formatCurrency = (num) => `₹${num.toLocaleString("en-IN")}`;
const myScrollRef = useRef(null);

  return (
    <div className="p-2" style={{ backgroundColor: "#f8fafc" }}>
      <ComponentHeader
        title={"Department and Item Consumption"}
        description={
          "Comprehensive breakdown of purchases and consumption patterns"
        }
        titleColor={"text-primary fs-4"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaShoppingCart color="rgb(13,110,253)" size={24} />}
        text={""}
      />

      <Row>
        {/* Purchase Distribution */}
        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaShoppingCart className="text-primary fs-4 me-2" />
                <div>
                  <h6 className="fw-bold text-primary mb-0">
                    Purchase Distribution
                  </h6>
                  <small className="text-muted">
                    Department-wise purchase breakdown
                  </small>
                </div>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={purchaseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomLabel}
                    >
                      {purchaseData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => formatCurrency(val)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3">
                <h6 className="fw-bold mb-2">
                  <FaShoppingCart className="me-1" /> Top Purchasing Departments
                </h6>
                {purchaseData.slice(0, 5).map((d, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center mb-1 small"
                  >
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          backgroundColor: d.color,
                          borderRadius: "50%",
                          marginRight: 6,
                        }}
                      ></span>
                      {d.name}
                    </div>
                    <div>
                      {formatCurrency(d.value)} ({d.percent}%)
                    </div>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="fw-bold mt-2" style={{fontSize: '24px'}}>
                  Total Consumption {formatCurrency(totalPurchases)}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Item Consumption */}
        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaUtensils className="text-danger fs-4 me-2" />
                <div>
                  <h6 className="fw-bold text-danger mb-0">Item Consumption</h6>
                  <small className="text-muted">
                    Top consumed items by volume
                  </small>
                </div>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={consumptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomLabel}
                    >
                      {consumptionData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => formatCurrency(val)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3">
                <h6 className="fw-bold mb-2">
                  <FaUtensils className="me-1" /> Top Consumed Items
                </h6>
                {consumptionData.slice(0, 5).map((d, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center mb-1 small"
                  >
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          backgroundColor: d.color,
                          borderRadius: "50%",
                          marginRight: 6,
                        }}
                      ></span>
                      {d.name}
                    </div>
                    <div>
                      {formatCurrency(d.value)} ({d.percent}%)
                    </div>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="fw-bold mt-2">
                  Total Consumption: {formatCurrency(totalConsumption)}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
