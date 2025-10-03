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
          <div
            className="d-flex items-center justify-between"
          >
            {/* Column 1: stacked text */}
            <div className="flex flex-col" style={{ gap: 4 }}>
              <div style={{ fontSize: "14px", color: "#555" }}>{item.label}</div>
              <h4 className="fw-bold mb-0">{item.value}</h4>
              <div style={{ fontSize: "14px", color: "#555" }}>{item.amount}</div>
            </div>

            {/* Column 2: icon (centered) with dark bg */}
            <div
              style={{
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                backgroundColor: "#333333", // dark background
                borderRadius: 12,
                width: 48,
                height: 48,
                flexShrink: 0,
                marginLeft: 'auto',// prevents icon box from shrinking
              }}
            >
              {/* ensure icon inherits white color */}
              <span style={{ color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </span>
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
}
