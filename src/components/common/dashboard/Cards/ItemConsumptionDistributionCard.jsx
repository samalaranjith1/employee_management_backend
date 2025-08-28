"use client";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function ItemConsumptionDistributionCard({
  summary,
  scrollRef,
}) {
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
    // Attach the scrollRef to this div, as it is the one that is scrollable
    <div
      ref={scrollRef} // <--- FIX: Attach scrollRef here
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For IE/Edge
      }}
    >
      {summary.map((item, idx) => (
        <Card
          key={idx}
          className="card-item" // Add this class for ComponentHeader's getScrollAmount
          style={{
            backgroundColor: item.color,
            border: "none",
            borderRadius: "12px",
            flex: "0 0 auto",
            width: isMobile ? "90vw" : "23vw",
          }}
        >
          <Card.Body>
            <div style={{ fontSize: "14px", color: "#555" }}>{item.label}</div>
            <h4 className="fw-bold mb-0">{item.value}</h4>
            <div style={{ fontSize: "14px", color: "#555" }}>{item.amount}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
