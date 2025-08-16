"use client";
import React from 'react'
import BaseSurface from "./BaseSurface";

function TopSellingProductsTable() {
  const cardStyle = { borderRadius: 10, border: "1px solid #F0E8FF", padding: 14 };
  return (
    <BaseSurface title="Revenue Summary" containerStyle={{ borderRadius: 12, padding: 18, height: "100%", boxShadow: "0 8px 20px rgba(20,30,60,0.04)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#7b7b8a" }}>Total Revenue</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#5B2EEA", marginTop: 6 }}>₹1,013,750</div>
          <div style={{ fontSize: 12, color: "#9aa0b0" }}>From top selling items</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#7b7b8a" }}>Total Margin</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#5B2EEA", marginTop: 6 }}>₹582,555</div>
          <div style={{ fontSize: 12, color: "#9aa0b0" }}>Net profit generated</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#7b7b8a", display: "flex", justifyContent: "space-between" }}>
            <span>Avg Margin %</span><span>%</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#5B2EEA", marginTop: 6 }}>57.5%</div>
          <div style={{ fontSize: 12, color: "#9aa0b0" }}>Overall profitability</div>
        </div>
      </div>
    </BaseSurface>
  );
}

export default TopSellingProductsTable
