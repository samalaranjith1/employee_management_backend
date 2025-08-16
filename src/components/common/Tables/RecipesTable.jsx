"use client";
import React from 'react'
import BaseSurface from "./BaseSurface";

function RecipesTable({title, data, bgColor}) {
  return (
    <BaseSurface
      title={title}
      containerStyle={{
        border: "none",
        background: bgColor,
        borderRadius: "12px",
        padding: "1rem",
        height: "65vh",
        display: "flex",
        flexDirection: "column",
        width:'110%',
        marginLeft:'-20px'
      }}
      bodyStyle={{ flexGrow: 1, overflowY: "auto" }}
    >
      {/* Fixed header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          fontWeight: 600,
          padding: "0.5rem 1rem",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <div>Product</div>
        <div style={{ textAlign: "center" }}>Items / Status</div>
        <div style={{ textAlign: "right" }}>Cost</div>
        <div style={{ textAlign: "right" }}>Sales</div>
      </div>

      {/* Table body rows */}
      {data?.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            padding: "0.75rem 1rem",
            alignItems: "center",
            background: idx % 2 === 0 ? "#fafafa" : "#fff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div>
            <div style={{ fontWeight: 500 }}>{item.product}</div>
            <div style={{ fontSize: "0.85rem", color: "#666" }}>{item.subtitle}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div>{item.items}</div>
            <div style={{ fontSize: "0.8rem", color: "#999" }}>{item.stock}</div>
          </div>
          <div style={{ textAlign: "right" }}>{item.cost}</div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                background: `${item.costPctColor}20`,
                color: item.costPctColor,
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              {item.costPct}
            </span>
          </div>
        </div>
      ))}
    </BaseSurface>
  );
}

export default RecipesTable
