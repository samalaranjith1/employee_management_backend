"use client";
import React from "react";
import CommonCard from "./CommonCard";
// Import necessary icons. Assuming FaArrowTrendUp and FaArrowTrendDown from fa6
// If you are using an older version of react-icons/fa, you might need FaChartLine, FaArrowUp, FaArrowDown
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function RecipesCards({ card, idx, widthDesktop }) {
  // Function to render a single data row with label and right-aligned value
  const renderDataRow = (label, value) => (
    <div
      className="d-flex justify-content-between"
      style={{ margin: "0.25rem 0", color: card.textColor }}
    >
      <p style={{ margin: 0 }}>{label}</p>
      <p style={{ margin: 0 }}>
        <strong style={{ color: card.textColor }}>{value}</strong>
      </p>
    </div>
  );

  return (
    <CommonCard
      key={idx}
      bgColor={card.bg}
      style={{ padding: "1.5rem", height: "100%", borderRadius: "1rem" }}
      widthDesktop={widthDesktop}
    >
      {/* Header (Icon and Label) */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Icon Container with Rotation */}


        {/* Label */}
        <span
          style={{
            color: card.labelColor,
          }}
        >
          {card.label}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            borderRadius: "0.75rem",
            backgroundColor: card.iconBg,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transform: "rotate(-45deg)",
          }}
        >
          {/* Icon rotated back to be upright */}
          {card.icon}
        </span>
      </div>

      {/* Title */}
      <h6
        style={{
          marginTop: "10px",
          fontWeight: "600",
          color: card.textColor,
          fontWeight:'bold'
        }}
      >
        {card.title}
      </h6>
      {/* Data Rows (Products, Sales, Shares) */}
      {renderDataRow("Products", card.products)}
      {renderDataRow("Total Sales", card.sales)}
      {renderDataRow("Shares", card.share)}
    </CommonCard>
  );
}
