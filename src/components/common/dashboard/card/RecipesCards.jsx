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
      <p style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>{label}</p>
      <p style={{ margin: 0 }}>
        <strong style={{ color: '#232425', fontSize: "14px", fontWeight: "800" }}>{value}</strong>
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
  {/* Left column */}
  <div className="col d-flex align-items-center">
    <span
      style={{
        color: card.labelColor,
        fontSize: '14px',
        fontWeight: "700",
      }}
    >
      {card.label}
    </span>
  </div>

  {/* Right column */}
  <div className="col d-flex justify-content-end align-items-center">
    {card.icon}
  </div>
</div>



      <h5
        style={{
          marginTop: "-12px",
          color: '#232425',
          fontWeight: '800'
        }}
      >
        {card.title}
      </h5>
      <hr
        style={{
          border: 'none',         // remove default border
          height: '2px',          // desired height
          backgroundColor: '#f8dcdcff',// color'
          border: '0.1px solid gray',
          margin: 0,              // optional, remove default margins
        }}
      />

      {/* Data Rows (Products, Sales, Shares) */}
      {renderDataRow("Products", card.products)}
      {renderDataRow("Total Sales", card.sales)}
      {renderDataRow("Shares", card.share)}
    </CommonCard>
  );
}
