"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaArrowUp,
  FaMinus,
  FaArrowDown,
  FaExpand,
  FaBolt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipesDashboard = () => {
  const topCards = [
    {
      title: "Profitable Products",
      products: 36,
      sales: "10,000",
      share: "11.8%",
      label: "High Margin",
      icon: <FaArrowUp />,
      bg: "#E6F8EE",
      labelColor: "#28A745",
      textColor: "#1E4620",
    },
    {
      title: "Moderate Products",
      products: 30,
      sales: "40,000",
      share: "47.1%",
      label: "Medium Margin",
      icon: <FaMinus />,
      bg: "#FFF8E1",
      labelColor: "#F4B400",
      textColor: "#4E3B00",
    },
    {
      title: "Loss Making Products",
      products: 12,
      sales: "35,000",
      share: "41.2%",
      label: "Low Margin",
      icon: <FaArrowDown />,
      bg: "#FFE6E6",
      labelColor: "#D32F2F",
      textColor: "#5C0000",
    },
  ];

  const lossProducts = [
    {
      product: "Mutton Rogan Josh",
      subtitle: "Non-Veg Curry • ₹750",
      items: 280,
      cost: "₹163,800",
      sales: "₹210,000",
      costPct: "78.0%",
      costPctColor: "#F87171",
    },
    {
      product: "Fish Curry (Pomfret)",
      subtitle: "Seafood • ₹680",
      items: 195,
      cost: "₹96,525",
      sales: "₹132,600",
      costPct: "72.8%",
      costPctColor: "#F87171",
    },
    {
      product: "Paneer Tikka Masala",
      subtitle: "Veg Curry • ₹520",
      items: 420,
      cost: "₹161,700",
      sales: "₹218,400",
      costPct: "74.0%",
      costPctColor: "#F87171",
    },
    {
      product: "Chicken Korma",
      subtitle: "Non-Veg Curry • ₹580",
      items: 350,
      cost: "₹145,250",
      sales: "₹203,000",
      costPct: "71.6%",
      costPctColor: "#F87171",
    },
    {
      product: "Lamb Biryani",
      subtitle: "Biryani • ₹850",
      items: 185,
      cost: "₹114,700",
      sales: "₹157,250",
      costPct: "72.9%",
      costPctColor: "#F87171",
    },
    {
      product: "Kesar Kulfi",
      subtitle: "Dessert • ₹180",
      items: 310,
      cost: "₹38,750",
      sales: "₹55,800",
      costPct: "69.4%",
      costPctColor: "#F87171",
    },
  ];

  const profitProducts = [
    {
      product: "Butter Chicken",
      subtitle: "Non-Veg Curry • ₹450",
      items: 2850,
      cost: "₹413,250",
      sales: "₹1,282,500",
      costPct: "32.2%",
      costPctColor: "#4ADE80",
    },
    {
      product: "Dal Makhani",
      subtitle: "Veg Curry • ₹320",
      items: 2420,
      cost: "₹229,900",
      sales: "₹774,400",
      costPct: "29.7%",
      costPctColor: "#4ADE80",
    },
    {
      product: "Paneer Butter Masala",
      subtitle: "Veg Curry • ₹380",
      items: 1890,
      cost: "₹292,950",
      sales: "₹718,200",
      costPct: "40.8%",
      costPctColor: "#FBBF24",
    },
    {
      product: "Chicken Biryani",
      subtitle: "Biryani • ₹420",
      items: 1980,
      cost: "₹326,700",
      sales: "₹831,600",
      costPct: "39.3%",
      costPctColor: "#FBBF24",
    },
    {
      product: "Aloo Gobi",
      subtitle: "Veg Curry • ₹280",
      items: 1640,
      cost: "₹139,400",
      sales: "₹459,200",
      costPct: "30.4%",
      costPctColor: "#4ADE80",
    },
    {
      product: "Masala Chai",
      subtitle: "Beverages • ₹60",
      items: 3760,
      cost: "₹67,680",
      sales: "₹225,600",
      costPct: "30.0%",
      costPctColor: "#4ADE80",
    },
  ];

  const renderCardRows = (title, data, bgColor) => (
    <Card
      style={{
        border: "none",
        background: bgColor,
        borderRadius: "12px",
        padding: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h5 style={{ fontWeight: "600", marginBottom: "1rem" }}>{title}</h5>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.1rem",
          overflowY: "auto",
          flexGrow: 1,
          paddingRight: "5px",
        }}
      >
        {data.map((item, idx) => (
          <Card
            key={idx}
            style={{
              padding: "1rem",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontWeight: "600" }}>{item.product}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                {item.subtitle}
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
            >
              <span style={{ minWidth: "40px", textAlign: "right" }}>
                {item.items}
              </span>
              <span style={{ minWidth: "70px", textAlign: "right" }}>
                {item.cost}
              </span>
              <span style={{ minWidth: "70px", textAlign: "right" }}>
                {item.sales}
              </span>
              <span
                style={{
                  background: `${item.costPctColor}20`,
                  color: item.costPctColor,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                {item.costPct}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );

  return (
    <Card className="m-2">
      {/* Header */}
      <Row className="p-3 align-items-center">
        <Col xs="auto" className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column">
            <div style={{ color: "rgb(255,80,22)" }}>Recipes</div>
            <div>Analyze product profitability and optimize menu offerings</div>
          </div>
        </Col>
        <Col xs="auto" className="ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row>

      {/* Body */}
      <Card
        className="m-0 p-3"
        style={{
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Top Cards - Scrollable on Mobile */}
        <div className="top-cards-container">
          {topCards.map((card, idx) => (
            <div className="top-card-wrapper" key={idx}>
              <Card
                style={{
                  background: card.bg,
                  color: card.textColor,
                  border: "none",
                  borderRadius: "12px",
                  padding: "1rem",
                  height: "100%",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: "1.5rem" }}>{card.icon}</div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      background: `${card.labelColor}20`,
                      color: card.labelColor,
                      fontWeight: "500",
                    }}
                  >
                    {card.label}
                  </span>
                </div>
                <h6 style={{ marginTop: "1rem", fontWeight: "600" }}>
                  {card.title}
                </h6>
                <p style={{ margin: 0 }}>Products: {card.products}</p>
                <p style={{ margin: 0 }}>Total Sales: {card.sales}</p>
                <p style={{ margin: 0 }}>Share: {card.share}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Product Tables */}
        <Row className="mt-4">
          <Col md={6} className="mb-4">
            {renderCardRows("Loss Making Products", lossProducts, "#FFF5F5")}
          </Col>
          <Col md={6} className="mb-4">
            {renderCardRows("Profitable Products", profitProducts, "#F0FFF4")}
          </Col>
        </Row>
      </Card>

      {/* Styles for swipe behavior */}
      <style>{`
        .top-cards-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
        }
        .top-card-wrapper {
          flex: 0 0 auto;
        }
        @media (max-width: 768px) {
          .top-card-wrapper {
            width: 90vw;
          }
        }
        @media (min-width: 769px) {
          .top-cards-container {
            flex-wrap: wrap;
            overflow-x: visible;
          }
          .top-card-wrapper {
            flex: 1 1 calc(33.333% - 1rem);
          }
        }
      `}</style>
    </Card>
  );
};

export default RecipesDashboard;
