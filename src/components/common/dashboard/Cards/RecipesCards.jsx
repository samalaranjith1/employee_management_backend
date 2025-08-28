"use client";

import React from "react";
import { Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function RecipesCards({ card, idx }) {
  return (
    <div className="top-card-wrapper" key={idx} >
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
        <h6 style={{ marginTop: "1rem", fontWeight: "600" }}>{card.title}</h6>
        <p style={{ margin: 0 }}>Products: {card.products}</p>
        <p style={{ margin: 0 }}>Total Sales: {card.sales}</p>
        <p style={{ margin: 0 }}>Share: {card.share}</p>
      </Card>
    </div>
  );
}

export default RecipesCards