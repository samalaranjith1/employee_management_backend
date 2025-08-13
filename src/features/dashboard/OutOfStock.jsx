"use client";

import React, { useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  FaBolt,
  FaBoxOpen,
  FaExclamationTriangle,
  FaExpand,
  FaLayerGroup,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import OutOfStockTopCards from "@/components/common/Cards/OutOfStockTopCards";
import OutOfStockTable from "@/components/common/Table/OutOfStockTable";
import ComponentHeader from "@/components/common/ComponentHeader";

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
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#F9FAFB",
            fontWeight: "bold",
            display: "grid",
            gridTemplateColumns: "60% 15% 25%",
            padding: "0.8rem 1rem",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <span>Item</span>
          <span style={{ textAlign: "center" }}>MOQ</span>
          <span style={{ textAlign: "center" }}>Stock / Status</span>
        </div>

        {/* Body */}
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            background: "#fff",
          }}
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "60% 15% 25%",
                alignItems: "center",
                padding: "0.6rem 1rem",
                background: "#FDFDFD",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Item details */}
              <div>
                <div style={{ fontWeight: "600", fontSize: "1rem" }}>
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
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

              {/* MOQ */}
              <div style={{ textAlign: "center" }}>{item.moq}</div>

              {/* Stock + Status stacked */}
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div>{item.stock}</div>
                <span style={getBadgeStyle(item.status)}>{item.status}</span>
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
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Total Items: {data.length}
        </div>
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
const myScrollRef = useRef(null)
  return (
    <Container fluid className="p-2">
      <ComponentHeader
        title={"Out of Stock"}
        description={"Monitor inventory levels and prevent stockouts"}
        titleColor={"rgb(255,79,22)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={''}
      />
      {/* <Row className="d-flex align-items-center justify-content-between mb-3">
        <Col className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column mt-2">
            <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
              Out of Stock
            </div>
            <div>Monitor inventory levels and prevent stockouts</div>
          </div>
        </Col>

        <Col xs="auto" className="d-flex align-items-center ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row> */}
      {/* Top Cards */}
      <OutOfStockTopCards cardBase={cardBase} iconStyle={iconStyle}
      scrollRef={myScrollRef} />

      {/* Horizontal Card Tables */}
      <Card className="p-2">
        <Row className="p-0">
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Items</h5>
            <OutOfStockTable data={items} getBadgeStyle={getBadgeStyle} />
          </Col>
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Base Items</h5>
            <OutOfStockTable data={baseItems} getBadgeStyle={getBadgeStyle} />
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
    </Container>
  );
};

export default InventoryDashboard;
