"use client";
import React, { useEffect, useState } from "react";
import CommonCard from "@/components/common/dashboard/card/CommonCard";

export default function ItemsSummaryCard({
  title,
  percentage,
  percentageChange,
  icon,
  textColor,
  bgColor,
  rows = [],
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CommonCard
      bgColor={bgColor}
      textColor={textColor}
      style={{
        minWidth: isMobile ? "88vw" : "30vw",
        flexShrink: 0,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid gray",
        backgroundColor: bgColor || "#fff",
        color: textColor || "#000",
      }}
    >
      {/* Card Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6
            className="text-secondary fw-bold text-uppercase"
            style={{ fontSize: "0.8rem" }}
          >
            {title}
          </h6>
          <h4 className="fw-bold mb-0">{percentage}</h4>
          <span className="text-success fw-bold" style={{ fontSize: "0.9rem" }}>
            {percentageChange}
          </span>
        </div>
        <div>{icon}</div>
      </div>

      {/* Card Rows */}
      <ul className="list-unstyled mt-3">
        {rows.map((row, idx) => (
          <li
            key={idx}
            className="d-flex justify-content-between align-items-center mb-1 rounded p-1"
            style={{
              backgroundColor: row.highlightBg || "transparent",
              color: "black",
            }}
          >
            <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
              {row.label}
            </span>
            <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </CommonCard>
  );
}
