"use client";

import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  FaBolt,
  FaBoxOpen,
  FaExclamationTriangle,
  FaExpand,
  FaLayerGroup,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryDashboard = () => {
  const items = [
    {
      name: "Chicken Breast",
      moq: "50 kg",
      stock: "2 kg",
      status: "Critical",
      category: "Poultry",
      size: "1 KG",
      code: "#1040",
      closing: "2025-01-10",
    },
    {
      name: "Fresh Salmon",
      moq: "25 kg",
      stock: "0 kg",
      status: "Out of Stock",
      category: "Seafood",
      size: "1 KG",
      code: "#2395",
      closing: "2025-01-09",
    },
    {
      name: "Premium Coffee Beans",
      moq: "10 kg",
      stock: "1 kg",
      status: "Critical",
      category: "Beverages",
      size: "1 KG",
      code: "#23750",
      closing: "2025-01-12",
    },
  ];

  const baseItems = [
    {
      name: "Basmati Rice",
      moq: "100 kg",
      stock: "5 kg",
      status: "Critical",
      category: "Grains",
      size: "1 KG",
      code: "#192",
      closing: "2025-01-11",
    },
    {
      name: "Cooking Oil",
      moq: "50 liters",
      stock: "0 liters",
      status: "Out of Stock",
      category: "Oils",
      size: "1 LITERS",
      code: "#287",
      closing: "2025-01-09",
    },
    {
      name: "Wheat Flour",
      moq: "75 kg",
      stock: "2 kg",
      status: "Critical",
      category: "Grains",
      size: "1 KG",
      code: "#154",
      closing: "2025-01-10",
    },
  ];

  const getBadgeStyle = (status) => {
    const base = {
      padding: "4px 10px",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "500",
      display: "inline-block",
    };
    if (status.toLowerCase() === "critical") {
      return { ...base, background: "#FFF0D5", color: "#E78C27" };
    }
    if (status.toLowerCase() === "out of stock") {
      return { ...base, background: "#FFD6D9", color: "#E74C3C" };
    }
    return base;
  };

  const renderHorizontalCardList = (data) => (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#F9FAFB",
          padding: "0.8rem 1rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <span>Item</span>
        <span>MOQ</span>
        <span>Stock</span>
      </div>

      {/* Body */}
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          padding: "0.5rem 1rem",
          background: "#fff",
        }}
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#FDFDFD",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              marginBottom: "0.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* Left: Details */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", fontSize: "1rem" }}>
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <span>{item.category}</span>
                <span>•</span>
                <span>{item.size}</span>
                <span>•</span>
                <span>{item.code}</span>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#777",
                  marginTop: "2px",
                }}
              >
                Closing: {item.closing}
              </div>
            </div>

            {/* Right: MOQ & Stock */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <div>{item.moq}</div>
              <div>
                {item.stock}{" "}
                <span style={getBadgeStyle(item.status)}>{item.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#F9FAFB",
          padding: "0.8rem 1rem",
          fontWeight: "500",
          position: "sticky",
          bottom: 0,
          zIndex: 2,
        }}
      >
        Total Items: {data.length}
      </div>
    </div>
  );

  const cardBase = {
    // Adjusted flex basis to use vw units for desktop
    flex: "0 0 30vw",
    minWidth: "250px", // Keep a minimum width to prevent content from collapsing
    borderRadius: "12px",
    padding: "1rem",
    color: "#000",
  };

  const iconStyle = { fontSize: "2rem", marginBottom: "0.5rem" };

  return (
    <Card fluid className="m-2 p-2">
      <Row className="p-3 align-items-center">
        {/* Left section */}
        <Col xs="auto" className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column">
            <div style={{ color: "rgb(255,80,22)" }}>Out of Stock</div>
            <div>Monitor inventory levels and prevent stockouts</div>
          </div>
        </Col>

        {/* Right section */}
        <Col xs="auto" className="ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row>
      {/* Top Cards */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          padding: "1rem 0",
        }}
      >
        <Card
          className="top-card"
          style={{ ...cardBase, background: "#FFE5E7", color: "#C62828" }}
        >
          <Card.Body>
            <FaBoxOpen style={iconStyle} />
            <h5 style={{ fontWeight: "bold" }}>Out of Stock</h5>
            <h2 style={{ fontWeight: "bold" }}>3</h2>
            <p>Zero inventory remaining</p>
          </Card.Body>
        </Card>
        <Card
          className="top-card"
          style={{ ...cardBase, background: "#FFF0D5", color: "#E78C27" }}
        >
          <Card.Body>
            <FaExclamationTriangle style={iconStyle} />
            <h5 style={{ fontWeight: "bold" }}>Critical Items</h5>
            <h2 style={{ fontWeight: "bold" }}>5</h2>
            <p>Require immediate attention</p>
          </Card.Body>
        </Card>
        <Card
          className="top-card"
          style={{ ...cardBase, background: "#FFF5D6", color: "#6D4C41" }}
        >
          <Card.Body>
            <FaLayerGroup style={iconStyle} />
            <h5 style={{ fontWeight: "bold" }}>Total Items</h5>
            <h2 style={{ fontWeight: "bold" }}>12</h2>
            <p>Tracking inventory levels</p>
          </Card.Body>
        </Card>
      </div>

      {/* Horizontal Card Tables */}
      <Card className="p-3">
        <Row>
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Items</h5>
            {renderHorizontalCardList(items)}
          </Col>
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Base Items</h5>
            {renderHorizontalCardList(baseItems)}
          </Col>
        </Row>
      </Card>

      {/* Mobile Card Width */}
      <style>{`
        @media (max-width: 768px) {
          .top-card {
            flex: 0 0 90vw;
          }
        }
      `}</style>
    </Card>
  );
};

export default InventoryDashboard;
