"use client";
import React from "react";
import { Col } from "react-bootstrap";
import CommonCard from "./CommonCard";
import '@/app/globals.css';
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function TopSellingProductsCards({ card }) {
  const { isMobile } = useDashboardContext()
  return (
    <Col xs="auto">
      <div
        style={{
          backgroundColor: card.bg,
          borderRadius: '12px',
          padding: '1rem',
          marginRight: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0)',
          flexShrink: 0,
        }}
        bgColor={card.bg}
      // style={{
      //   borderRadius: 12,
      //   padding: "18px",
      //   height: "100%",
      //   boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
      //   minHeight: "140px",
      // }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#6d6d6d' }}>
              {card.title}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginTop: 6,
                color: "#232425"
              }}
            >
              {card.value}
            </div>
            <div style={{ fontSize: 12, color: card.color, marginTop: 6 }}>
              {card.subtitle}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              marginTop: 20,
            }}
          >
            {card.icon}
          </div>
        </div>
      </div>
    </Col>
  );
}
