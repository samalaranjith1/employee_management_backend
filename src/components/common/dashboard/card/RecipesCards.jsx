"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function RecipesCards({ card, idx, widthDesktop }) {
  return (
    <CommonCard
      key={idx}
      bgColor={card.bg}
      textColor={card.textColor}
      style={{ padding: "1rem", height: "100%" }}
      widthDesktop={widthDesktop}
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
    </CommonCard>
  );
}
