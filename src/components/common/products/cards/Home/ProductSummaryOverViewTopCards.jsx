"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductSummaryCard from "./ProductSummaryCard";
import ComponentHeader from "@/components/common/ComponentHeader";

export default function ProductSummaryOverViewTopCards({ cardsData = [] }) {
  const scrollRef = useRef(null);

  // 🔹 Local hook defined inside the component
  const useWindowWidth = () => {
    const [width, setWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 1200
    );

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <ComponentHeader
      title="Product Summary"
      scrollRef={scrollRef} // ✅ arrows will target this container
    >
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "12px", // must match with scroll arrow step
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {cardsData.map((card, idx) => (
          <ProductSummaryCard
            key={idx}
            {...card}
            isMobile={isMobile} // ✅ pass mobile flag to card
          />
        ))}
      </div>
    </ComponentHeader>
  );
}
