"use client";
import React from "react";
import CommonCard from "./CommonCard";
// Import necessary icons. Assuming FaArrowTrendUp and FaArrowTrendDown from fa6
// If you are using an older version of react-icons/fa, you might need FaChartLine, FaArrowUp, FaArrowDown
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function RecipesCards({ card, idx, widthDesktop }) {
  const { isMobile } = useDashboardContext()

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
    <div
      style={{
        minWidth: isMobile ? '95%' : '32%',
        backgroundColor: card.bg,
        // color:card.textColor,
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}
      key={idx}
      bgColor={card.bg}
      // style={{ padding: "1.5rem", height: "100%", borderRadius: "1rem" }}
      widthDesktop={widthDesktop}
    >
      {/* Header (Icon and Label) */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Left column */}
        <div className="col d-flex flex-column align-items-flex-start">
          <span
            style={{
              color: card.labelColor,
              fontSize: '14px',
              fontWeight: "700",
              paddingBottom: '4px',

            }}
          >
            {card.label}
          </span>
          <h5
            style={{
              // marginTop: "-12px",
              color: '#232425',
              fontWeight: '800'
            }}
          >
            {card.title}
          </h5>
        </div>

        {/* Right column */}
        <div className="col d-flex justify-content-end align-items-center">
          {card.icon}
        </div>
      </div>
      {/* <h5
        style={{
          marginTop: "-12px",
          color: '#232425',
          fontWeight: '800'
        }}
      >
        {card.title}
      </h5> */}
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
    </div>
  );
}
