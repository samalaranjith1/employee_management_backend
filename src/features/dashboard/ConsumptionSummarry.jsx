// components/UserList.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useOutletServiceQuery } from "@/services/outlet-service";
import { Card, Container } from "react-bootstrap";
import {
  FaBolt,
  FaExpand,
  FaUtensils,
  FaChartLine,
  FaCoffee,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

function ConsumptionCarousel({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen (you can adjust breakpoint)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? cards.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === cards.length - 1 ? 0 : i + 1));
  };

  if (!isMobile) {
    // Desktop: show all cards side-by-side (or customize layout)
    return (
      <div style={{ display: "flex", gap: "16px" }}>
        {cards.map((card, idx) => (
          <ConsumptionCard key={idx} {...card} />
        ))}
      </div>
    );
  }

  // Mobile: show one card with carousel buttons on top-right
  return (
    <div style={{ position: "relative", width: "90vw", margin: "0 auto" }}>
      <div
        style={{
          position: "absolute",
          top: -40,
          right: 10,
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <button
          onClick={prev}
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            padding: "6px",
            cursor: "pointer",
          }}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            padding: "6px",
            cursor: "pointer",
          }}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>

      <ConsumptionCard {...cards[currentIndex]} />
    </div>
  );
}
function ConsumptionCard({
  title,
  percentage,
  percentageChange,
  icon,
  rows,
  textColor = "black",
  bgColor = "white",
}) {
  const isPositive = percentageChange.startsWith("+");
  const isNegative = percentageChange.startsWith("-");

  const changeColor = isPositive ? "green" : isNegative ? "red" : textColor;
  const isLarge = typeof window !== "undefined" && window.innerWidth >= 992;
  return (
    <Card
      className="p-3 gap-2 w-lg-30vw"
      style={{
        width: isLarge ? "30vw" : "90%",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Header Row */}
      <Row className="p-3 align-items-center">
        <Col>
          <div>{title}</div>
          <div
            style={{
              color: changeColor,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {percentage}
            {isPositive && (
              <FaChartLine size={18} style={{ transform: "none" }} />
            )}
            {isNegative && (
              <FaChartLine size={18} style={{ transform: "rotate(90deg)" }} />
            )}
            {percentageChange}
          </div>
        </Col>
        <Col xs="auto">{icon}</Col>
      </Row>

      {/* Dynamic Rows */}
      {rows.map((row, index) => (
        <Row
          key={index}
          className={`px-3 ${index === rows.length - 1 ? "pb-3" : ""} py-1`}
          style={{ color: textColor }}
        >
          <Col>{row.label}</Col>
          <Col className="text-end">{row.value}</Col>
        </Row>
      ))}
    </Card>
  );
}

export default function ConsumptionSummarry() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useOutletServiceQuery(
    "/1/summary?outlet=1&userId=7&startdt=2025-08-04&enddt=2025-08-04",
    {
      staleTime: 60 * 1000, // cache for 1 min
      refetchOnWindowFocus: false,
    }
  );
  const cardsData = [
    {
      title: "CONSUMPTION %",
      percentage: "41%",
      percentageChange: "+2.1%",
      icon: <FaUtensils size={36} color="#bc4b00" />,
      textColor: "#bc4b00",
      bgColor: "rgb(255,247,237)",
      rows: [
        { label: "Sale", value: "₹75,000" },
        { label: "Consumption", value: "₹25,000" },
        {
          label: "Net Consumption",
          value: "₹20,000 (35%)",
          highlightBg: "#ffdcc0",
        },
      ],
    },
    {
      title: "CONSUMPTION",
      percentage: "₹25,000",
      percentageChange: "-1.5%",
      icon: <FaChartLine size={36} color="#1d40af" />,
      textColor: "#1d40af",
      bgColor: "rgb(238,245,255)",
      rows: [
        { label: "Opening Stock", value: "₹15,000" },
        { label: "Closing Stock", value: "₹5,000" },
        {
          label: "Net Consumption",
          value: "₹20,000",
          highlightBg: "#bbd0ff",
        },
      ],
    },
    {
      title: "NET SALES",
      percentage: "₹75,000",
      percentageChange: "+8.3%",
      icon: <FaCoffee size={36} color="#5b21b6" />,
      textColor: "#5b21b6",
      bgColor: "rgb(250,245,255)",
      rows: [
        { label: "Total Sales", value: "₹85,000" },
        { label: "Discount", value: "₹10,000" },
        { label: "Tax", value: "₹4,000" },
        { label: "Dine in", value: "₹65,000", highlightBg: "#e9d5ff" },
        { label: "Online", value: "₹10,000" },
      ],
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Container fluid className=" mt-2">
        <Container fluid className="border rounded">
          <Row className="p-3 align-items-center">
            {/* Left section */}
            <Col xs="auto" className="d-flex align-items-center">
              <div className="me-2">
                <FaBolt size={24} color="rgb(255,80,22)" />
              </div>
              <div className="d-flex flex-column">
                <div style={{ color: "rgb(255,80,22)" }}>
                  Consumption Summary
                </div>
                <div>
                  Real-time consumption metrics and performance indicators
                </div>
              </div>
            </Col>

            {/* Right section */}
            <Col xs="auto" className="ms-auto">
              <FaExpand size={24} color="rgb(255,80,22)" />
            </Col>
          </Row>
          <Container fluid className="bg-light mt-2 p-3 d-flex gap-2">
            <div className="d-flex">
              <ConsumptionCarousel cards={cardsData} />
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
