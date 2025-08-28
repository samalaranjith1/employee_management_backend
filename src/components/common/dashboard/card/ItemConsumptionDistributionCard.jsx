"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function ItemConsumptionDistributionCard({
  summary,
  scrollRef,
}) {
  return (
    <div
      ref={scrollRef}
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {summary.map((item, idx) => (
        <CommonCard
          key={idx}
          bgColor={item.color}
          minWidth="280px"
          style={{ flex: "0 0 auto" }}
        >
          <div style={{ fontSize: "14px", color: "#555" }}>{item.label}</div>
          <h4 className="fw-bold mb-0">{item.value}</h4>
          <div style={{ fontSize: "14px", color: "#555" }}>{item.amount}</div>
        </CommonCard>
      ))}
    </div>
  );
}
