"use client";

import React, { useRef } from "react";
import CommonCard from "@/components/common/dashboard/card/CommonCard";
import ComponentHeader from "@/components/common/ComponentHeader";

export default function ProductCostCards({ summaryCards = [] }) {
  const scrollRef = useRef(null);

  return (
    <>
      {/* Header with swipe arrows */}
      <ComponentHeader
        title="Product Cost"
        description="Overview of product cost distribution"
        titleColor="rgb(255,92,0)"
        cardBgColor="none"
        isShowArrows={true}
        scrollRef={scrollRef}
        isExpandable={false}
        titleIcon={""}
      />

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="d-flex"
        style={{
          gap: "16px",
          paddingBottom: "0.5rem",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {summaryCards.map((card) => (
          <CommonCard
            key={card.id}
            style={{
              minWidth: "30vw",
              flexShrink: 0,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: card.bgColor,
            }}
          >
            <div>
              <div className="d-flex align-items-center mb-2">
                {card.icon}
                <span
                  className="ms-2 fw-semibold"
                  style={{ color: "#333", fontSize: "14px" }}
                >
                  {card.label}
                </span>
              </div>
              <h4 className="fw-bold" style={{ color: card.textColor }}>
                {card.value}
              </h4>
            </div>
          </CommonCard>
        ))}
      </div>
    </>
  );
}
