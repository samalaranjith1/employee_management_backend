"use client";

import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaExclamationCircle,
} from "react-icons/fa";

export default function PriceChanges() {
  const recentChanges = [
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Premium Coffee",
      category: "Beverages • 25 kg/month",
      oldPrice: 850,
      newPrice: 950,
      date: "2025-01-10",
      change: 2500,
      percent: 11.8,
      up: true,
    },
    {
      name: "Fresh Milk",
      category: "Dairy • 300 liters/month",
      oldPrice: 52,
      newPrice: 48,
      date: "2025-01-07",
      change: -1200,
      percent: -7.7,
      up: false,
    },
    {
      name: "Tomatoes",
      category: "Vegetables • 120 kg/month",
      oldPrice: 35,
      newPrice: 45,
      date: "2025-01-01",
      change: 1200,
      percent: 28.6,
      up: true,
    },
  ];

  const futureHikes = [
    {
      name: "Cooking Oil",
      category: "Oils • 45 liters/month",
      oldPrice: 165,
      newPrice: 185,
      date: "2025-02-01",
      change: 900,
      percent: 12.1,
    },
    {
      name: "Fresh Eggs",
      category: "Dairy • 500 pieces/month",
      oldPrice: 8,
      newPrice: 9,
      date: "2025-01-15",
      change: 500,
      percent: 12.5,
    },
    {
      name: "Onions",
      category: "Vegetables • 90 kg/month",
      oldPrice: 42,
      newPrice: 55,
      date: "2025-01-20",
      change: 1170,
      percent: 31,
    },
  ];

  const styles = {
    headerCard: {
      background: "linear-gradient(90deg, #f0e9ff, #ffffff)",
      borderRadius: "12px",
      padding: "20px",
      border: "none",
      position: "relative",
      overflow: "hidden",
    },
    title: { fontWeight: "bold", fontSize: "1.2rem", color: "#6c2bd9" },
    subtitle: { fontSize: "0.9rem", color: "#6c757d" },
    impactValue: { fontSize: "2rem", fontWeight: "bold", marginTop: "10px" },
    rupeeIconWrapper: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "linear-gradient(135deg, #9333ea, #a855f7)",
      color: "#fff",
      borderRadius: "50%",
      padding: "18px",
      fontSize: "2rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    sectionCard: {
      borderRadius: "12px",
      border: "none",
      overflow: "hidden",
      display: "flex", // Make card a flex container
      flexDirection: "column", // Stack items vertically
      maxHeight: "500px", // Set a max-height for the card to enable internal scrolling
    },
    sectionHeaderRecent: {
      backgroundColor: "#d1fae5",
      fontWeight: "bold",
      flexShrink: 0, // Prevent header from shrinking
    },
    sectionHeaderFuture: {
      backgroundColor: "#fef3c7",
      fontWeight: "bold",
      flexShrink: 0, // Prevent header from shrinking
    },
    tableContainer: {
      // New style for the scrollable table body wrapper
      maxHeight: "calc(500px - 100px)", // Adjust this value based on header/footer height
      overflowY: "auto",
      flexGrow: 1, // Allow table container to grow and take available space
    },
    tableBody: {
      fontSize: "0.9rem",
    },
    priceUp: { color: "#dc2626", fontWeight: "bold" },
    priceDown: { color: "#16a34a", fontWeight: "bold" },
    footer: {
      backgroundColor: "#f0fdfa",
      fontWeight: "bold",
      flexShrink: 0, // Prevent footer from shrinking
    },
  };

  return (
    <Card className="p-3 m-2 shadow-sm">
      {/* Top Header Card */}
      <Card style={styles.headerCard} className="mb-4">
        <Card.Body>
          <div style={styles.title}>
            <FaChartLine className="me-2" /> Price Changes
          </div>
          <div style={styles.subtitle}>
            Monitor ingredient price fluctuations and their cost impact
          </div>
          <div style={styles.impactValue}>
            <FaRupeeSign /> 22,500
          </div>
          <div className="d-flex gap-4 mt-2">
            <span className="text-success">
              <FaArrowUp /> Recent: ₹8,200
            </span>
            <span className="text-danger">
              <FaArrowDown /> Expected: ₹6,280
            </span>
          </div>
          {/* Floating Rupee Icon */}
          <div style={styles.rupeeIconWrapper}>
            <FaRupeeSign />
          </div>
        </Card.Body>
      </Card>

      {/* Bottom Section */}
      <Row>
        {/* Recent Price Changes */}
        <Col md={6} className="mb-4">
          <Card style={styles.sectionCard}>
            <Card.Header style={styles.sectionHeaderRecent}>
              Recent Price Changes
            </Card.Header>
            <div style={styles.tableContainer}>
              {" "}
              {/* Wrapper for scrollable content */}
              <Table hover responsive className="mb-0">
                <tbody style={styles.tableBody}>
                  {recentChanges.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="fw-bold">{item.name}</div>
                        <div className="text-muted">{item.category}</div>
                        <div className="text-primary">
                          Effective: {item.date}
                        </div>
                      </td>
                      <td className="text-end align-middle">
                        <div>
                          ₹{item.oldPrice} → ₹{item.newPrice}
                        </div>
                        <div
                          style={item.up ? styles.priceUp : styles.priceDown}
                        >
                          {item.up ? "+" : ""}₹{item.change}
                        </div>
                        <div
                          style={item.up ? styles.priceUp : styles.priceDown}
                        >
                          {item.percent}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Card.Footer style={styles.footer}>
              Net Recent Impact: <span className="text-danger">₹8,200</span>
            </Card.Footer>
          </Card>
        </Col>

        {/* Future Price Hikes */}
        <Col md={6} className="mb-4">
          <Card style={styles.sectionCard}>
            <Card.Header style={styles.sectionHeaderFuture}>
              <FaExclamationCircle className="me-1" />
              Future Price Hikes
            </Card.Header>
            <div style={styles.tableContainer}>
              {" "}
              {/* Wrapper for scrollable content */}
              <Table hover responsive className="mb-0">
                <tbody style={styles.tableBody}>
                  {futureHikes.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="fw-bold">{item.name}</div>
                        <div className="text-muted">{item.category}</div>
                        <div className="text-warning">
                          Tentative: {item.date}
                        </div>
                      </td>
                      <td className="text-end align-middle">
                        <div>
                          ₹{item.oldPrice} → ₹{item.newPrice}
                        </div>
                        <div style={styles.priceUp}>+₹{item.change}</div>
                        <div style={styles.priceUp}>{item.percent}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Card.Footer
              style={{ backgroundColor: "#fffbeb", fontWeight: "bold" }}
            >
              Expected Future Impact:{" "}
              <span className="text-danger">₹6,280</span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
