"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function RecommendationsCard({
  rec,
  idx,
  cardStyle,
  isMobile,
  textColor,
}) {
  return (
    <CommonCard
      key={idx}
      style={{
        ...cardStyle,
        width: isMobile ? "86vw" : `calc(25% - (3 * 15px / 4))`,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div
          style={{
            fontWeight: 600,
            color: textColor,
            fontSize: "15px",
            marginBottom: "5px",
          }}
        >
          {rec.title}
        </div>
        {/* <div
          style={{
            fontWeight: 600,
            color: textColor,
            fontSize: "15px",
            marginBottom: "5px",
          }}
        >
          {rec.title}
        </div> */}
      </div>
      <div style={{ fontSize: "13px", color: "#333" }}>{rec.desc}</div>
    </CommonCard>
  );
}
