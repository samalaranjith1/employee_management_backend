"use client";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function CommonCard({
  children,
  bgColor = "#fff",
  textColor = "#000",
  widthDesktop = "23vw",
  widthMobile = "85vw",
  minWidth = "250px",
  borderRadius = "12px",
  padding = "1rem",
  boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
  border = "none",
  scrollRef,
  maxHeight,
  style = {},
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMinWidth = () => setIsMobile(window.innerWidth < 768);
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <Card
      ref={scrollRef}
      className="card-item"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        minWidth,
        width: isMobile ? widthMobile : widthDesktop,
        flexShrink: 0,
        borderRadius,
        padding,
        boxShadow,
        border,
        maxHeight,
        ...style,
      }}
    >
      {children}
    </Card>
  );
}
