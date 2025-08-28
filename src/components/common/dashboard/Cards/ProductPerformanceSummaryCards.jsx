"use client";
import React from "react";
import { Card } from "react-bootstrap";

export default function ProductPerformanceSummaryCards({ summary, cardsContainerRef }) {
  return (
    <div
      ref={cardsContainerRef}
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        paddingBottom: "10px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {summary.map(({ label, value, amount, bgColor, textColor }, idx) => (
        <Card
          key={idx}
          style={{
            backgroundColor: bgColor,
            borderRadius: "12px",
            border: "none",
            flexShrink: 0,
            width:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "90vw"
                : "23vw",
            padding: "1rem",
            color: textColor || "#000",
          }}
          className="shadow-sm"
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: 4 }}>
            {value}
          </div>
          <div style={{ fontSize: "14px", marginTop: 2 }}>{amount}</div>
        </Card>
      ))}
    </div>
  );
}
