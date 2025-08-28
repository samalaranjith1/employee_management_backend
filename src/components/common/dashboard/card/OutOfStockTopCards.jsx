"use client";
import React from "react";
import { FaBoxOpen, FaExclamationTriangle, FaLayerGroup } from "react-icons/fa";
import CommonCard from "./CommonCard";

export default function OutOfStockTopCards({ cardBase, iconStyle, scrollRef }) {
  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        padding: "1rem 0",
      }}
    >
      <CommonCard bgColor="#FFE5E7" textColor="#C62828" style={cardBase}>
        <FaBoxOpen style={iconStyle} />
        <h5 style={{ fontWeight: "bold" }}>Out of Stock</h5>
        <h2 style={{ fontWeight: "bold" }}>3</h2>
        <p>Zero inventory remaining</p>
      </CommonCard>
      <CommonCard bgColor="#FFF0D5" textColor="#E78C27" style={cardBase}>
        <FaExclamationTriangle style={iconStyle} />
        <h5 style={{ fontWeight: "bold" }}>Critical Items</h5>
        <h2 style={{ fontWeight: "bold" }}>5</h2>
        <p>Require immediate attention</p>
      </CommonCard>
      <CommonCard bgColor="#FFF5D6" textColor="#6D4C41" style={cardBase}>
        <FaLayerGroup style={iconStyle} />
        <h5 style={{ fontWeight: "bold" }}>Total Items</h5>
        <h2 style={{ fontWeight: "bold" }}>12</h2>
        <p>Tracking inventory levels</p>
      </CommonCard>
    </div>
  );
}
