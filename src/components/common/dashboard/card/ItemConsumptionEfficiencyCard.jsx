"use client";
import React from "react";
import CommonCard from "./CommonCard";
import '@/app/globals.css';

export default function ItemConsumptionEfficiencyCard({
  summaryCards,
  scrollRef,
}) {
  return (
    <div
      ref={scrollRef}
      className="d-flex gap-3 mb-4 align-items-center"
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
          widthDesktop='23%'
          style={{ flex: "0 0 auto", padding: "20px" }}
        >
          <div className="d-flex align-items-center">
            
            <div>
               <div className="c_small_text_semi_bold_600 c_gray_3">
                {card.label}
              </div>
              <div className="c_small_text_extra_bold c_heading_5">
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
