"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function ItemConsumptionEfficiencyCard({
  summaryCards,
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
      {summaryCards.map((card, idx) => (
        <CommonCard
          key={idx}
          bgColor={card.bg}
          minWidth="280px"
          style={{ flex: "0 0 auto", padding: "20px" }}
        >
          <div className="d-flex align-items-center">
            
            <div>
               <div style={{ fontSize: "13px", color: "#555" }}>
                {card.label}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {card.value}
              </div>
             
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                marginLeft: "auto",
              }}
            >
              {card.icon}
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
}
