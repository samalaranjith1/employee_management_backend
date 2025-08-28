"use client";

import React, { useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import MonthlyPurchaseDistributionGraph from "../dashboard/GraphWrapper/MonthlyPurchaseDistributionGraph";
import TopSellersTable from "../Tables/MonthlyPurchaseDistributionGraph";

export default function SupplierDuesThisMonth() {
  const styles = {
    container: {
      padding: "1rem",
      backgroundColor: "#f8fafc",
    },
    sectionCard: {
      borderRadius: "12px",
      border: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      marginBottom: "1rem",
      padding: "1rem",
    },
    purchaseCard: {
      backgroundColor: "#f1f5f9",
      borderRadius: "12px",
      padding: "1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
    },
    amount: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1e3a8a",
    },
    pieLegend: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      marginTop: "0.5rem",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.85rem",
    },
    legendDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 2,
    },
  };

  const monthData = {
    August: {
      total: 820000,
      suppliers: 8,
      pie: [
        { name: "Dairy Fresh Supply", value: 125000, color: "#8b5cf6" },
        { name: "Fresh Vegetables Co.", value: 185000, color: "#3b82f6" },
        { name: "Meat Masters", value: 95000, color: "#14b8a6" },
        { name: "Oil & Condiments", value: 75000, color: "#f59e0b" },
        { name: "Rice & Grains Hub", value: 85000, color: "#22c55e" },
        { name: "Spice World Ltd.", value: 145000, color: "#ef4444" },
      ],
      suppliersList: [
        {
          supplier: "Fresh Vegetables Co.",
          category: "Vegetables",
          location: "Mumbai",
          purchase: 185000,
          items: 325,
        },
        {
          supplier: "Spice World Ltd.",
          category: "Spices",
          location: "Delhi",
          purchase: 145000,
          items: 125,
        },
        {
          supplier: "Dairy Fresh Supply",
          category: "Dairy",
          location: "Pune",
          purchase: 125000,
          items: 245,
        },
        {
          supplier: "Meat Masters",
          category: "Meat",
          location: "Bangalore",
          purchase: 95000,
          items: 155,
        },
        {
          supplier: "Rice & Grains Hub",
          category: "Grains",
          location: "Chennai",
          purchase: 85000,
          items: 185,
        },
        {
          supplier: "Oil & Condiments",
          category: "Oils",
          location: "Hyderabad",
          purchase: 75000,
          items: 95,
        },
      ],
    },
    July: {
      total: 720000,
      suppliers: 6,
      pie: [
        { name: "Dairy Fresh Supply", value: 95000, color: "#8b5cf6" },
        { name: "Fresh Vegetables Co.", value: 175000, color: "#3b82f6" },
        { name: "Meat Masters", value: 85000, color: "#14b8a6" },
        { name: "Oil & Condiments", value: 65000, color: "#f59e0b" },
        { name: "Rice & Grains Hub", value: 80000, color: "#22c55e" },
        { name: "Spice World Ltd.", value: 120000, color: "#ef4444" },
      ],
      suppliersList: [
        {
          supplier: "Fresh Vegetables Co.",
          category: "Vegetables",
          location: "Mumbai",
          purchase: 175000,
          items: 300,
        },
        {
          supplier: "Spice World Ltd.",
          category: "Spices",
          location: "Delhi",
          purchase: 120000,
          items: 110,
        },
        {
          supplier: "Dairy Fresh Supply",
          category: "Dairy",
          location: "Pune",
          purchase: 95000,
          items: 200,
        },
        {
          supplier: "Meat Masters",
          category: "Meat",
          location: "Bangalore",
          purchase: 85000,
          items: 140,
        },
        {
          supplier: "Rice & Grains Hub",
          category: "Grains",
          location: "Chennai",
          purchase: 80000,
          items: 160,
        },
        {
          supplier: "Oil & Condiments",
          category: "Oils",
          location: "Hyderabad",
          purchase: 65000,
          items: 90,
        },
      ],
    },
  };

  const [selectedMonth, setSelectedMonth] = useState("August");
  const data = monthData[selectedMonth];

  return (
    <Card style={styles.container} className="m-2">
      <Card style={styles.sectionCard}>
        {/* Month Selector */}
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center gap-2"
              >
                <FaCalendarAlt color="#7c3aed" />
                {selectedMonth}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(monthData).map((month) => (
                  <Dropdown.Item
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Total Purchase Card */}
        <div style={styles.purchaseCard} className="mb-4">
          <div>
            <div style={{ fontSize: "0.9rem", color: "#334155" }}>
              Total Purchase MTD
            </div>
            <div style={styles.amount}>₹{data.total.toLocaleString()}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              from {data.suppliers} suppliers
            </div>
          </div>
          <div
            style={{
              backgroundColor: "linear-gradient(90deg,#7c3aed,#6366f1)",
              borderRadius: "50%",
              padding: "0.75rem",
              color: "#fff",
            }}
          >
            <FaShoppingCart size={20} />
          </div>
        </div>

        {/* Graph & Table */}
        <Row>
          <Col md={6}>
            <MonthlyPurchaseDistributionGraph data={data} styles={styles} />
          </Col>
          <Col md={6}>
            <TopSellersTable data={data} styles={styles} />
          </Col>
        </Row>
      </Card>
    </Card>
  );
}
