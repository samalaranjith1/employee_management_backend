"use client";

import React from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { FaTruck, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";

const SupplierManagement = () => {
  const styles = {
    container: {
      padding: "1rem",
      backgroundColor: "#f8fafc",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "600",
      fontSize: "1.25rem",
      color: "#1e40af",
    },
    subText: {
      fontSize: "0.9rem",
      color: "#64748b",
    },
    sectionCard: {
      borderRadius: "12px",
      border: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "1rem",
    },
    iconCircle: {
      backgroundColor: "#e0f2fe",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#1d4ed8",
    },
    purchaseCard: {
      backgroundColor: "#f1f5f9",
      borderRadius: "12px",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    amount: {
      fontSize: "1.8rem",
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
  };

  const pieData = [
    { name: "Dairy Fresh Supply", value: 45, color: "#8b5cf6" },
    { name: "Fresh Vegetables Co.", value: 85, color: "#3b82f6" },
    { name: "Meat Masters", value: 35, color: "#14b8a6" },
    { name: "Rice & Grains Hub", value: 20, color: "#22c55e" },
  ];

  const supplierData = [
    {
      supplier: "Fresh Vegetables Co.",
      category: "Vegetables",
      location: "Mumbai",
      purchase: "₹85,000",
      items: 125,
    },
    {
      supplier: "Spice World Ltd.",
      category: "Spices",
      location: "Delhi",
      purchase: "₹65,000",
      items: 45,
    },
    {
      supplier: "Dairy Fresh Supply",
      category: "Dairy",
      location: "Pune",
      purchase: "₹45,000",
      items: 85,
    },
    {
      supplier: "Meat Masters",
      category: "Meat",
      location: "Bangalore",
      purchase: "₹35,000",
      items: 35,
    },
    {
      supplier: "Rice & Grains Hub",
      category: "Grains",
      location: "Chennai",
      purchase: "₹20,000",
      items: 55,
    },
  ];

  return (
    <Card style={styles.container} className="m-2">
      {/* Page Header */}
      <div>
        <div style={styles.header}>
          <FaTruck size={20} />
          Supplier Management
        </div>
        <div style={styles.subText}>
          Track purchases, payments, and supplier relationships
        </div>
      </div>

      {/* Section */}
      <Card style={styles.sectionCard}>
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div style={styles.iconCircle}>
              <FaCalendarAlt />
            </div>
            <div className="ms-2 fw-semibold">Purchase from Suppliers</div>
          </div>

          {/* Purchase Card */}
          <div style={styles.purchaseCard} className="mb-4">
            <div>
              <div style={{ fontSize: "0.9rem", color: "#334155" }}>
                Total Purchase
              </div>
              <div style={styles.amount}>₹250,000</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                from 5 suppliers
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#3b82f6",
                borderRadius: "50%",
                padding: "0.75rem",
                color: "#fff",
              }}
            >
              <FaShoppingCart size={20} />
            </div>
          </div>

          {/* Chart + Table */}
          <Row>
            <Col md={6}>
              <div className="fw-semibold mb-2">Purchase Distribution</div>
              {/* Added a class to the wrapper div for CSS targeting */}
              <Card className="p-3">
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={200}>
                    {/* Added class to PieChart component to target its SVG elements */}
                    <PieChart className="pie-chart-no-outline">
                      <Pie
                        data={pieData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={true}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} units`, name]}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "none", // Explicitly removed the border
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={styles.pieLegend}>
                  {pieData.map((item, idx) => (
                    <div style={styles.legendItem} key={idx}>
                      <div
                        style={{
                          ...styles.legendDot,
                          backgroundColor: item.color,
                        }}
                      ></div>
                      {item.name}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <div className="fw-semibold mb-2">Supplier Details</div>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Purchase</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierData.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="fw-semibold">{row.supplier}</div>
                        <div className="d-flex gap-1">
                          <Badge bg="light" text="dark">
                            {row.category}
                          </Badge>
                          <span
                            style={{ color: "#64748b", fontSize: "0.85rem" }}
                          >
                            {row.location}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: "#16a34a", fontWeight: "600" }}>
                        {row.purchase}
                      </td>
                      <td>{row.items}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default SupplierManagement;
