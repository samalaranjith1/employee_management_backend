"use client";

import PeriodBreakDownCard from "@/components/common/Cards/PeriodBreakDownCard";
import PeriodDataBreakDownTable from "@/components/common/Table/PeriodDataBreakDownTable";
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Card,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import {
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";

// Mock data to simulate fetching different time periods
const mockData = {
  Daily: {
    cards: [
      { title: "COST RATIO", value: "61.3%", change: "-2.1%", color: "danger" },
      {
        title: "AVERAGE DAILY SALES",
        value: "₹46,285",
        change: "+8.3%",
        color: "success",
      },
      {
        title: "AVERAGE DAILY CONSUMPTION",
        value: "₹28,357",
        change: "+5.7%",
        color: "success",
      },
      {
        title: "AVERAGE DAILY WASTE",
        value: "₹1,245",
        change: "-12.4%",
        color: "danger",
      },
    ],
    table: [
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 8 (Today)",
        day: "Sunday",
        sales: "₹52,400",
        consumption: "₹31,200",
        waste: "₹890",
        ratio: "59.5%",
      },
      {
        date: "Dec 7",
        day: "Saturday",
        sales: "₹48,200",
        consumption: "₹29,100",
        waste: "₹1,150",
        ratio: "60.4%",
      },
      {
        date: "Dec 6",
        day: "Friday",
        sales: "₹45,800",
        consumption: "₹27,800",
        waste: "₹1,320",
        ratio: "60.7%",
      },
      {
        date: "Dec 5",
        day: "Thursday",
        sales: "₹44,100",
        consumption: "₹26,900",
        waste: "₹1,480",
        ratio: "61.0%",
      },
      {
        date: "Dec 4",
        day: "Wednesday",
        sales: "₹47,600",
        consumption: "₹28,400",
        waste: "₹1,200",
        ratio: "59.7%",
      },
      {
        date: "Dec 3",
        day: "Tuesday",
        sales: "₹46,900",
        consumption: "₹28,100",
        waste: "₹1,380",
        ratio: "59.9%",
      },
    ],
  },
  Weekly: {
    cards: [
      { title: "COST RATIO", value: "60.5%", change: "-1.5%", color: "danger" },
      {
        title: "AVERAGE WEEKLY SALES",
        value: "₹3,24,500",
        change: "+6.2%",
        color: "success",
      },
      {
        title: "AVERAGE WEEKLY CONSUMPTION",
        value: "₹1,98,700",
        change: "+4.1%",
        color: "success",
      },
      {
        title: "AVERAGE WEEKLY WASTE",
        value: "₹7,890",
        change: "-9.4%",
        color: "danger",
      },
    ],
    table: [
      {
        date: "Week 1",
        day: "",
        sales: "₹3,40,000",
        consumption: "₹2,10,000",
        waste: "₹7,800",
        ratio: "61.0%",
      },
      {
        date: "Week 2",
        day: "",
        sales: "₹3,20,000",
        consumption: "₹1,95,000",
        waste: "₹7,500",
        ratio: "60.3%",
      },
    ],
  },
  // Same Days and Monthly data would be added here
};

// Custom CSS to hide scrollbar
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function PeriodDataBreakdown() {
  const [activeTab, setActiveTab] = useState("Daily");
  const cardScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const data = mockData[activeTab] || { cards: [], table: [] }; // Handle cases where data is missing

  // Effect to check for mobile screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = (direction) => {
    if (cardScrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      cardScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container fluid className="bg-white p-2 card">
      <style>{hideScrollbarStyle}</style>
      <div className="d-flex justify-content-between align-items-center mb-3 p-2">
        <Row className="align-items-center">
          {/* Left section */}
          <Col xs="auto" className="d-flex align-items-center">
            <div className="me-2">
              <FaBolt size={24} color="rgb(255,80,22)" />
            </div>
            <div className="d-flex flex-column">
              <div style={{ color: "rgb(255,80,22)" }}>
                Period Data Breakdown
              </div>
              <div>Detailed metrics across different time periods</div>
            </div>
          </Col>
        </Row>
        <div className="d-flex gap-2 align-items-center">
          <Col xs="auto" className="ms-auto ms-3">
            <FaExpand size={24} color="rgb(255,80,22)" />
          </Col>
        </div>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-3">
        <ButtonGroup
          style={{ backgroundColor: "rgb(245, 199, 143)", width: "90vw" }}
        >
          {["Daily", "Same Days", "Weekly", "Monthly"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "rgb(254,69,37)" : ""}
              className="me-2"
              style={{
                width: "24vw",
                borderRadius: "10px",
                backgroundColor: activeTab === tab ? "rgb(254,69,37)" : "",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="d-block card p-1 mb-3 bg-warning text-primary">
        Last 7 Saturdays • Same-day-of-week patterns
      </div>

      {/* Card Slider Controls */}
      <div className="d-flex align-items-center mb-3">
        {/* Hide arrow buttons on mobile and when there are 4 or fewer cards */}
        {!isMobile && data.cards.length > 4 && (
          <Button variant="light" onClick={() => handleScroll("left")}>
            <FaChevronLeft />
          </Button>
        )}
        <div
          ref={cardScrollRef}
          className="d-flex overflow-auto px-2 hide-scrollbar"
          style={{ scrollBehavior: "smooth", gap: "1rem" }}
        >
          {data.cards.map((card, idx) => (
            <PeriodBreakDownCard
              key={idx}
              card={card}
              idx={idx}
              isMobile={isMobile}
            />
          ))}
        </div>
        {/* Hide arrow buttons on mobile and when there are 4 or fewer cards */}
        {!isMobile && data.cards.length > 4 && (
          <Button variant="light" onClick={() => handleScroll("right")}>
            <FaChevronRight />
          </Button>
        )}
      </div>

      {/* Table with Sticky Header */}
      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <PeriodDataBreakDownTable data={data} />
      </div>
    </Container>
  );
}
