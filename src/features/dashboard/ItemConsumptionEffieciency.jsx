"use client";

import React from "react";
import { Table, Row, Col, Card, Badge } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaBoxOpen,
  FaRupeeSign,
  FaPercent,
  FaBolt,
  FaExpand,
} from "react-icons/fa";

const ItemConsumptionEfficiency = () => {
  const summaryCards = [
    {
      icon: <FaExclamationTriangle size={24} color="#ff4d4f" />,
      label: "Critical Items",
      value: 9,
      bg: "#ffe6e6",
    },
    {
      icon: <FaBoxOpen size={24} color="#ff9800" />,
      label: "Total Items",
      value: 15,
      bg: "#fff3e0",
    },
    {
      icon: <FaRupeeSign size={24} color="#f44336" />,
      label: "Total Waste",
      value: "₹3,681.4",
      bg: "#fff0f0",
    },
    {
      icon: <FaPercent size={24} color="#ff9800" />,
      label: "Avg Waste",
      value: "28.3%",
      bg: "#fff8e1",
    },
  ];

  const tableData = [
    {
      item: "Whole Chicken Bird (800 Grm)",
      dept: "Poultry & Meat",
      region: "SOUTH INDIAN",
      consumed: "25.5 kg",
      sales: "20 kg",
      diff: "+5.5",
      waste: "27.5%",
      cost: "₹245.50",
      status: "Monitor",
      wasteType: "Medium",
    },
    {
      item: "Ghee",
      dept: "Dairy & Oils",
      region: "NORTH INDIAN",
      consumed: "8.2 kg",
      sales: "7.5 kg",
      diff: "+0.7",
      waste: "8.3%",
      cost: "₹289.60",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Green Cardamom",
      dept: "Spices & Herbs",
      region: "BIHARI",
      consumed: "0.8 kg",
      sales: "0.6 kg",
      diff: "+0.2",
      waste: "33.3%",
      cost: "₹156.00",
      status: "Critical",
      wasteType: "Critical",
    },
    {
      item: "Milk",
      dept: "Beverages",
      region: "BEVERAGES",
      consumed: "45 ltr",
      sales: "38.5 ltr",
      diff: "+6.5",
      waste: "16.9%",
      cost: "₹178.50",
      status: "Monitor",
      wasteType: "Low",
    },
  ];

  const wasteBadge = (wasteType) => {
    switch (wasteType) {
      case "Critical":
        return <Badge bg="danger">Critical</Badge>;
      case "Medium":
        return (
          <Badge bg="warning" text="dark">
            Medium
          </Badge>
        );
      case "Low":
        return <Badge bg="success">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-3" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header Row */}
      <Row className="p-3 align-items-center">
        <Col xs="auto" className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column">
            <div style={{ color: "rgb(255,80,22)" }}>
              Item Consumption Efficiency
            </div>
            <div>
              Monitor wastage patterns and consumption inefficiencies across
              menu items
            </div>
          </div>
        </Col>

        <Col xs="auto" className="ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row>

      {/* Summary Cards - scrollable on mobile */}
      <div
        className="d-flex d-md-none flex-row"
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          gap: "1rem",
          paddingBottom: "0.5rem",
        }}
      >
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="flex-shrink-0"
            style={{ minWidth: "200px" }}
          >
            <Card
              style={{
                backgroundColor: card.bg,
                borderRadius: "12px",
                padding: "10px",
              }}
              className="shadow-sm"
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    marginRight: "10px",
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "#555" }}>
                    {card.label}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Summary Cards - grid on desktop */}
      <Row className="mb-3 d-none d-md-flex">
        {summaryCards.map((card, idx) => (
          <Col key={idx} md={3}>
            <Card
              style={{
                backgroundColor: card.bg,
                borderRadius: "12px",
                padding: "10px",
              }}
              className="shadow-sm"
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    marginRight: "10px",
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "#555" }}>
                    {card.label}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table */}
      <Card className="shadow-sm">
        <Card.Header>
          <strong>Detailed Item Consumption Analysis</strong>
          <div style={{ fontSize: "12px", color: "#777" }}>
            Comprehensive consumption vs sales comparison with efficiency
            metrics
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Item Details</th>
                <th>Department</th>
                <th>Consumed</th>
                <th>Sales Qty</th>
                <th>Difference</th>
                <th>Waste %</th>
                <th>Cost Impact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.item}</td>
                  <td>
                    <Badge bg="light" text="dark">
                      {row.region}
                    </Badge>
                  </td>
                  <td>{row.consumed}</td>
                  <td>{row.sales}</td>
                  <td
                    style={{
                      color: row.diff.startsWith("+") ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {row.diff}
                  </td>
                  <td>
                    <Badge
                      bg={
                        row.wasteType === "Critical"
                          ? "danger"
                          : row.wasteType === "Medium"
                          ? "warning"
                          : "success"
                      }
                      text={row.wasteType === "Medium" ? "dark" : "light"}
                    >
                      {row.waste}
                    </Badge>
                  </td>
                  <td>{row.cost}</td>
                  <td>{wasteBadge(row.wasteType)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemConsumptionEfficiency;
