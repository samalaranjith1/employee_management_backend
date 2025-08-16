"use client";
import React from "react";
import BaseSurface from "./BaseSurface";

function OutOfStockTable({ data, getBadgeStyle }) {
  return (
    <BaseSurface>
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#F9FAFB",
              fontWeight: "bold",
              display: "grid",
              gridTemplateColumns: "60% 15% 25%",
              padding: "0.8rem 1rem",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <span>Item</span>
            <span style={{ textAlign: "center" }}>MOQ</span>
            <span style={{ textAlign: "center" }}>Stock / Status</span>
          </div>

          {/* Body */}
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              background: "#fff",
            }}
          >
            {data.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60% 15% 25%",
                  alignItems: "center",
                  padding: "0.6rem 1rem",
                  background: "#FDFDFD",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* Item details */}
                <div>
                  <div style={{ fontWeight: "600", fontSize: "1rem" }}>
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.code}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#777", marginTop: "2px" }}>
                    Closing: {item.closing}
                  </div>
                </div>

                {/* MOQ */}
                <div style={{ textAlign: "center" }}>{item.moq}</div>

                {/* Stock + Status stacked */}
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div>{item.stock}</div>
                  <span style={getBadgeStyle(item.status)}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              background: "#F9FAFB",
              padding: "0.8rem 1rem",
              fontWeight: "500",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Total Items: {data.length}
          </div>
        </div>
      </div>
    </BaseSurface>
  );
}

export default OutOfStockTable;
