"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Button, Dropdown, Badge } from "react-bootstrap";
import { FaBolt, FaExpand, FaCaretUp, FaCaretDown } from "react-icons/fa"; // Added FaCaretUp, FaCaretDown for trend icons
import { format, startOfMonth, endOfMonth } from "date-fns";
import MTDCard from "@/components/common/Cards/MTDCard";

const MonthSummary = () => {
  const cardsData = [
    {
      title: "PROFIT",
      percentageChange: "+15.2%",
      value: "₹3,23,000",
      trend: "up",
      trendColor: "success",
      rows: [
        { label: "Sales", value: "₹20,00,000", variant: "success" },
        { label: "Expenses", value: "₹16,77,000", variant: "secondary" },
      ],
    },
    {
      title: "EXPENSES",
      percentageChange: "+5.8%",
      value: "₹16,77,000",
      trend: "up", // Assuming 'up' for expenses means increase, adjust logic if 'down' is desired
      trendColor: "danger", // Red for increasing expenses
      rows: [
        { label: "COGS", value: "₹12,23,000", variant: "danger" },
        { label: "Fixed Cost", value: "₹4,54,000", variant: "secondary" },
      ],
    },
    {
      title: "SALES",
      percentageChange: "+12.4%",
      value: "₹20,00,000",
      trend: "up",
      trendColor: "primary",
      rows: [
        { label: "Dine in", value: "₹18,00,000", variant: "success" },
        { label: "Online", value: "₹2,00,000", variant: "secondary" },
      ],
    },
    {
      title: "NET CONSUMPTION",
      percentageChange: "-3.2%",
      value: "₹13,00,000",
      trend: "down",
      trendColor: "primary",

      rows: [
        { label: "Opening", value: "₹20,00,000", variant: "success" },
        { label: "Consumption", value: "₹15,00,000", variant: "danger" },
        { label: "Closing", value: "₹7,00,000", variant: "secondary" },
      ],
    },
  ];

  const [startDate, setStartDate] = useState(
    format(startOfMonth(new Date()), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // Generate month list
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(new Date().getFullYear(), i, 1);
    return { label: format(date, "MMMM"), month: i };
  });

  // Handle month select
  const handleMonthSelect = (monthIndex) => {
    const now = new Date();
    const year = now.getFullYear();
    const firstDay = new Date(year, monthIndex, 1);
    let lastDay;

    if (monthIndex === now.getMonth()) {
      lastDay = now; // current date
    } else {
      lastDay = endOfMonth(firstDay);
    }

    setStartDate(format(firstDay, "yyyy-MM-dd"));
    setEndDate(format(lastDay, "yyyy-MM-dd"));
  };

  const scrollContainerRef = useRef();
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Define the gap value consistently
  const CARD_GAP_REM = 1; // 1rem
  const CARD_GAP_PX = 16; // Assuming 1rem = 16px, or calculate dynamically if needed

  // Determine scroll amount dynamically
  const getScrollAmount = () => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector(".card-item");
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        return cardWidth + CARD_GAP_PX;
      }
    }
    return 240; // Fallback
  };

  useEffect(() => {
    const checkScrollAndMobile = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed

        // Only show scroll buttons if content overflows
        setShowScrollButtons(el.scrollWidth > el.clientWidth);
      }
    };

    checkScrollAndMobile();
    window.addEventListener("resize", checkScrollAndMobile);
    return () => window.removeEventListener("resize", checkScrollAndMobile);
  }, [cardsData]); // Depend on cardsData if its length can change dynamically

  const slideLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    scrollContainerRef.current.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  };

  // Helper function to get background color based on variant
  const getVariantBgColor = (variant) => {
    switch (variant) {
      case "success":
        return "rgba(0, 255, 0, 0.05)"; // Light green
      case "danger":
        return "rgba(255, 0, 0, 0.05)"; // Light red
      case "secondary":
        return "rgba(108, 117, 125, 0.05)"; // Light gray
      default:
        return "transparent";
    }
  };

  return (
    <Card className="p-2 pt- shadow-sm">
      {cardsData && cardsData.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3 p-2">
          <Row className="align-items-center flex-grow-1">
            {/* Left section */}
            <Col xs="auto" className="d-flex align-items-center">
              <div className="me-2">
                <FaBolt size={24} color="rgb(255,80,22)" />
              </div>
              <div className="d-flex flex-column">
                <Dropdown
                  onSelect={(eventKey) => handleMonthSelect(Number(eventKey))}
                >
                  <Dropdown.Toggle variant="outline-none" id="month-dropdown">
                    {format(new Date(startDate), "MMMM yyyy")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((m) => (
                      <Dropdown.Item key={m.month} eventKey={m.month}>
                        {m.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div>Monthly financial breakdown</div>
              </div>
            </Col>
          </Row>
          <div className="d-flex gap-2 align-items-center ">
            <div className="d-none d-md-flex">
              {showScrollButtons && (
                <>
                  <Button
                    size="sm"
                    variant="light"
                    className="me-1"
                    onClick={slideLeft}
                  >
                    &lt;
                  </Button>
                  <Button size="sm" variant="light" onClick={slideRight}>
                    &gt;
                  </Button>
                </>
              )}
            </div>
            <Col xs="auto" className="ms-auto ms-3">
              <FaExpand size={24} color="rgb(255,80,22)" />
            </Col>
          </div>
        </div>
      )}

      {cardsData && cardsData.length > 0 && (
        <div
          style={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            ref={scrollContainerRef}
            className="d-flex mt-2"
            style={{
              gap: `${CARD_GAP_REM}rem`,
              paddingBottom: "0.5rem",
              overflowX: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Map directly over cardsData */}
            {cardsData.map((card, idx) => (
              <MTDCard
                key={idx}
                idx={idx}
                isMobile={isMobile}
                card={card}
                getVariantBgColor={getVariantBgColor}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default MonthSummary;
