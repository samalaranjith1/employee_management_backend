"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function ProductPerformanceSummaryCards({
  summary,
  cardsContainerRef,
}) {
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
        <CommonCard
          key={idx}
          bgColor={bgColor}
          textColor={textColor || "#000"}
          minWidth="280px"
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: 4 }}>
            {value}
          </div>
          <div style={{ fontSize: "14px", marginTop: 2 }}>{amount}</div>
        </CommonCard>
      ))}
    </div>
  );
}
