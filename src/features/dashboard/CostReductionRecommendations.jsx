"use client";
import RecommendationsCard from "@/components/common/card/RecommendationsCard";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle, FaExpand } from "react-icons/fa";

export default function CostReductionRecommendations() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Run only on client
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const recommendations = [
    {
      title: "Inventory",
      desc: "Implement FIFO system to reduce expiry losses by 40%",
    },
    {
      title: "Scheduling",
      desc: "Daily expiry checks can save ₹500/week in spoiled items",
    },
    {
      title: "Forecasting",
      desc: "Better demand prediction reduces overordering by 25%",
    },
    {
      title: "Preparation",
      desc: "Smaller batch cooking reduces product wastage by 30%",
    },
    {
      title: "Supplier Review",
      desc: "Negotiate with suppliers for smaller delivery batches",
    },
    {
      title: "Waste Reduction",
      desc: "Composting food scraps can reduce waste disposal costs by 15%",
    },
    {
      title: "Energy Efficiency",
      desc: "Switching to LED lighting saves 20% on electricity bills",
    },
  ];

  const textColor="#9c27b0";
  const cardStyle = {
    background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    flexShrink: 0,
  };

  const containerStyle = {
    background: "rgba(156, 39, 176, 0.05)",
    borderRadius: "20px",
    padding: "20px",
  };

  return (
    <Card className="m-2">
      <div style={containerStyle}>
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <FaExclamationTriangle
            style={{ color: "#9c27b0", fontSize: "20px", marginRight: "10px" }}
          />
          <div>
            <div
              style={{ fontWeight: "600", color: "#9c27b0", fontSize: "16px" }}
            >
              Cost Reduction Recommendations
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Actions to minimize wastage and optimize costs
            </div>
          </div>
          <div className="ms-auto">
            <FaExpand color="#9c27b0" size={24} />
          </div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div
          className="recommendations-scroll d-flex"
          style={{
            gap: "15px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {recommendations.map((rec, idx) => (
            <RecommendationsCard
              idx={idx}
              rec={rec}
              key={idx}
              cardStyle={cardStyle}
              isMobile={isMobile}
              textColor={textColor}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar visually for Webkit browsers */}
      <style>{`
        .recommendations-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Card>
  );
}
