"use client";
import React from "react";
import { Card } from "react-bootstrap";

export default function ItemsConsumptionAnalyticsOverviewCards({ item }) {
  return (
    <Card
      className="card-item"
      style={{
        borderRadius: "12px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
        padding: "16px",
        transition: "all 0.2s ease-in-out",
        height: "100%",
        minWidth: "300px", // Matches swipeable card sizing
        flexShrink: 0,
      }}
    >
      {/* Title with Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            background: item.iconBg,
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          {item.icon}
        </span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          {item.title}
        </span>
      </div>

      {/* Consumption Box */}
      <Card
        style={{
          border: "0",
          borderRadius: "10px",
          background: "#F8F9FA",
          marginBottom: "12px",
          padding: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h6>Net Consumption</h6>

            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              {item.data?.netConsumptionQuantity || 0}
            </div>
            <small style={{ color: "#6c757d" }}>GM</small>
          </div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              ₹{item.data?.netConsumptionValue || 0}
            </div>
            <small style={{ color: "#6c757d" }}>Total</small>
          </div>
        </div>
      </Card>

      {/* Net Consumption Box */}
      <Card
        style={{
          border: "0",
          borderRadius: "10px",
          background: "#FFE6E6",
          marginBottom: "12px",
          padding: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h6>Sales</h6>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              {item.data?.saleQuantity || 0}
            </div>
            <small style={{ color: "#6c757d" }}>GM</small>
          </div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              ₹{item.data?.salePrice || 0}
            </div>
            <small style={{ color: "#6c757d" }}>Total</small>
          </div>
        </div>
      </Card>

      {/* Utilization */}
      <div
        style={{
          color: "#28a745",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        Utilization Rate {item.data?.saleToConsumptionMarginPercentage}%
      </div>
    </Card>
  );
}
