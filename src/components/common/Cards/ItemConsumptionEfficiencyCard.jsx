"use client";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function ItemConsumptionEfficiencyCard({ summaryCards, scrollRef }) {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
     const updateMinWidth = () => {
       setIsMobile(window.innerWidth < 768);
     };
     updateMinWidth();
     window.addEventListener("resize", updateMinWidth);
     return () => window.removeEventListener("resize", updateMinWidth);
   }, []);
  return (
    <div
      ref={scrollRef}
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For IE/Edge
      }}
    >
      {summaryCards.map((card, idx) => (
        <div
          key={idx}
          className="card-item"
          style={{
            flex: "0 0 auto",
            width: isMobile ? "90vw" : "23vw",
          }}
        >
          <Card
            style={{
              backgroundColor: card.bg,
              borderRadius: "12px",
              padding: "10px",
            }}
            className="shadow-sm"
          >
            <Card.Body className="d-flex align-items-center">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  marginRight: "10px",
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "13px", color: "#555" }}>
                  {card.label}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ItemConsumptionEfficiencyCard;
