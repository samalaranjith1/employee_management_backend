"use client";

import React, { useRef } from "react";
import CommonCard from "@/components/common/dashboard/card/CommonCard";
import ComponentHeader from "@/components/common/ComponentHeader";

export default function ProductCostCards({ summaryCards = [] }) {
  const scrollRef = useRef(null);

  return (
    <>
      {/* Header with swipe arrows */}
      {/* <ComponentHeader
        title="Product Cost"
        description="Overview of product cost distribution"
        titleColor="rgb(255,92,0)"
        cardBgColor="none"
        isShowArrows={true}
        scrollRef={scrollRef}
        isExpandable={false}
        titleIcon={""}
      /> */}

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
                <div style={{
                  padding:'10px',
                  borderRadius:'12px',
                  border:'1px solid #ddd',
                  backgroundColor:card.bgIcon,
                  marginRight:'10px'
                }}>{card.icon}</div>
                <span
                  className=""
                  style={{ color: "#0a0a0a", fontSize: "14px",fontWeight:600 }}
                >
                  {card.label}
                </span>
              </div>
              <h4 className="" style={{ color: card.textColor,fontWeight:700,fontSize:"24px" }}>
                {card.value}
              </h4>
            </div>
          </CommonCard>
        ))}
      </div>
    </>
  );
}
