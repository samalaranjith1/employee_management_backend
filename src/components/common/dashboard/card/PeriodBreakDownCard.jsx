"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function PeriodBreakDownCard({ idx, card, scrollRef }) {
  return (
    <CommonCard
      key={idx}
      scrollRef={scrollRef}
      bgColor="rgb(249, 222, 239)"
      minWidth="280px"
      style={{ padding: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5>{card.title}</h5>
          <h4>{card.value}</h4>
        </div>
        {/* <div className="text-end">
          <small className={`text-${card.color}`}>{card.change}</small>
        </div> */}
      </div>
    </CommonCard>
  );
}
