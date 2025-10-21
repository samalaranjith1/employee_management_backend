"use client";

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function SuppliersSummaryOverViewCards({ summaryCards }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {summaryCards.map((card) => (
        <Card
          key={card.id}
          className="shadow-sm border-0 mb-3 card-item"
          style={{
            minWidth: isMobile ? "86vw" : "32%",
            flexShrink: 0,
            borderRadius: "12px",
            backgroundColor: card.bgColor,
          }}
        >
          <Card.Body>
            {/* Card Header */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: card.iconBg,
                  borderRadius: "6px",
                  width: "28px",
                  height: "28px",
                }}
              >
                {card.icon}
              </div>
              <span
                className="ms-2 fw-semibold"
                style={{ color: "#232425", fontSize: "14px" ,fontWeight:'600'}}
              >
                {card.title}
              </span>
            </div>

            {/* Card Fields */}
            {card.fields.map((field, idx) => (
              <div key={idx} className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: "12px", color: "#717182",fontWeight:'500' }}>
                  {field.label}
                </span>
                <span
                  className={field.bold ? "fw-bold" : ""}
                  style={{ fontSize: "14px", color: "#000000",fontWeight:'600' }}
                >
                  {field.value.slice(0,1)} {Number(field.value.slice(1))?.toLocaleString()}
                </span>
              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
