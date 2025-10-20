"use client";

import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import CommonCard from "@/components/common/dashboard/card/CommonCard";
import ComponentHeader from "@/components/common/ComponentHeader";

export default function ProductsIngredientsCards({ list }) {
  const scrollRef = useRef(null);

  const totalItems = list?.length || 0;
  const totalCost = list
    ?.reduce((acc, curr) => acc + curr.ingredientPrice, 0)
    .toFixed(2);

  return (
    <>
      {/* Header with swipe buttons */}
      {/* <ComponentHeader
        title={"Product Ingredients"}
        description={"Overview of product ingredients and cost"}
        titleColor={"rgb(255,92,0)"}
        cardBgColor={"none"}
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
        {/* Total Items */}
        <CommonCard
          style={{
            minWidth: "46vw",
            flexShrink: 0,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
          }}
        >
          <div className="text-left">
            <div className="" style={{fontWeight:600,fontSize:"14px",color:"#0a0a0a"}}>
              Total Items
            </div>
            <div className=""style={{fontWeight:700,fontSize:"24px",color:"#0a0a0a"}}>{totalItems}</div>
          </div>
        </CommonCard>

        {/* Total Cost */}
        <CommonCard
          style={{
            minWidth: "46vw",
            flexShrink: 0,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
          }}
        >
          <div className="text-left">
            <div className=""style={{fontWeight:600,fontSize:"14px",color:"#0a0a0a"}}>
              Total Cost
            </div>
            <div className=""style={{fontWeight:700,fontSize:"24px",color:"#0a0a0a"}}>₹{totalCost}</div>
          </div>
        </CommonCard>
      </div>
    </>
  );
}
