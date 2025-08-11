"use client";

import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import {
  FaBolt,
  FaChartLine,
  FaExclamationTriangle,
  FaExpand,
  FaTimesCircle,
} from "react-icons/fa";

const RevenueContribution = () => {
  // Inline styling object
  const styles = {
    container: {
      background: "#fff",
      borderRadius: "12px",
      padding: "1rem",
    },
    topCards: {
      display: "flex",
      overflowX: "auto",
      gap: "1rem",
      paddingBottom: "1rem",
      scrollSnapType: "x mandatory",
    },
    topCard: {
      flex: "0 0 30vw", // default desktop width
      borderRadius: "12px",
      padding: "1rem",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    icon: {
      fontSize: "1.5rem",
    },
    value: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    title: {
      fontWeight: "600",
    },
    desc: {
      fontSize: "0.9rem",
    },
    tableContainer: {
      maxHeight: "60vh",
      overflowY: "auto",
    },
    // The sticky styling is now applied via a CSS class to ensure it works reliably.
    // The previous inline style `tableHead` is no longer used for the `<thead>`.
    tag: {
      padding: "0.25rem 0.6rem",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  };

  // Top cards data
  const topCards = [
    {
      title: "Top Performers",
      value: 22,
      description: "Products driving 60%+ revenue",
      icon: <FaChartLine />,
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      title: "Review Needed",
      value: 90,
      description: "Products contributing 20-50%",
      icon: <FaExclamationTriangle />,
      bg: "#fffbeb",
      color: "#d97706",
    },
    {
      title: "Removal Candidates",
      value: 248,
      description: "Products contributing <20%",
      icon: <FaTimesCircle />,
      bg: "#fef2f2",
      color: "#dc2626",
    },
  ];

  // Table rows data
  const tableData = [
    {
      bucket: "90% Of Sale",
      products: 1,
      sales: "₹64,426",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "80% Of Sale",
      products: 4,
      sales: "₹57,672",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "70% Of Sale",
      products: 7,
      sales: "₹69,755",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "60% Of Sale",
      products: 10,
      sales: "₹69,897",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "50% Of Sale",
      products: 13,
      sales: "₹66,972",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "40% Of Sale",
      products: 17,
      sales: "₹68,010",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "30% Of Sale",
      products: 24,
      sales: "₹65,876",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "20% Of Sale",
      products: 36,
      sales: "₹67,357",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "10% Of Sale",
      products: 62,
      sales: "₹66,499",
      totalSales: "₹663,371",
      tag: "Consider Removal",
      tagColor: "#fee2e2",
      tagText: "#dc2626",
    },
    {
      bucket: "Below 10% of Sale",
      products: 186,
      sales: "₹66,907",
      totalSales: "₹663,371",
      tag: "Consider Removal",
      tagColor: "#fee2e2",
      tagText: "#dc2626",
    },
  ];

  return (
    <Card style={styles.container} className="m-2">
      <Row className="p-3 align-items-center">
        <Col xs="auto" className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column">
            <div style={{ color: "rgb(255,80,22)" }}>
              Revenue Contribution from Products
            </div>
            <div>Revenue Contribution from Products description</div>
          </div>
        </Col>

        <Col xs="auto" className="ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row>
      {/* Top Cards */}

      <div style={styles.topCards} className="top-cards-container">
        {topCards.map((card, idx) => (
          <div
            key={idx}
            className="top-card"
            style={{
              ...styles.topCard,
              background: card.bg,
              color: card.color,
            }}
          >
            <div style={styles.icon}>{card.icon}</div>
            <div style={styles.value}>{card.value}</div>
            <div style={styles.title}>{card.title}</div>
            <div style={styles.desc}>{card.description}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <Table hover>
          <thead className="table-header-sticky">
            <tr>
              <th>Bucket</th>
              <th>Products</th>
              <th>Sales</th>
              <th>Total Sales</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.bucket}</td>
                <td>{row.products}</td>
                <td>{row.sales}</td>
                <td>{row.totalSales}</td>
                <td>
                  <span
                    style={{
                      ...styles.tag,
                      background: row.tagColor,
                      color: row.tagText,
                    }}
                  >
                    {row.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* CSS for mobile swipe + width override, and the sticky header fix */}
      <style>
        {`
          .top-cards-container {
            -webkit-overflow-scrolling: touch;
          }
          .top-card {
            flex: 0 0 30vw;
          }
          @media (max-width: 768px) {
            .top-card {
              flex: 0 0 90vw !important;
            }
          }

          /* New CSS for the sticky header */
          .table-header-sticky {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 10;
            box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
          }
          
          /* Ensures the header cells within the sticky header are styled correctly */
          .table-header-sticky th {
            font-weight: 600;
          }
        `}
      </style>
    </Card>
  );
};

export default RevenueContribution;
