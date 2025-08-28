"use client";
import { useEffect, useState } from "react";
import CommonCard from "../../dashboard/card/CommonCard";

export default function SalesCards({ label, value, icon }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CommonCard
      style={{
        minWidth: isMobile ? "88vw" : "30vw",
        flexShrink: 0,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid #e0e0e0",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="me-3 text-primary">{icon}</div>
        <div>
          <div className="fw-semibold text-secondary">{label}</div>
          <div className="fs-5 fw-bold">{value}</div>
        </div>
      </div>
    </CommonCard>
  );
}
