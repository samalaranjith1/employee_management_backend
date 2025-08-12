import React from 'react'
import { Col, Card } from "react-bootstrap";

function TopSellingProductsCards({card}) {
  return (
    <Col key={card.id} xs="auto" className="top-card-col">
      <Card
        style={{
          background: card.bg,
          borderRadius: 12,
          border: "none",
          padding: "18px",
          height: "100%",
          boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
          minHeight: "140px",
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div
              style={{
                fontSize: 12,
                color: "#7B6CFA",
                fontWeight: 600,
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: card.color,
                marginTop: 6,
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#7b7b8a",
                marginTop: 6,
              }}
            >
              {card.subtitle}
            </div>
          </div>

          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: card.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {card.icon}
          </div>
        </div>
      </Card>
    </Col>
  );
}

export default TopSellingProductsCards