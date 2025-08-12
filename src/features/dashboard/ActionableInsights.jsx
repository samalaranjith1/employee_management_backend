"use client";

import ActionableCard from "@/components/common/Cards/ActionableCard";
import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import {
  FaArrowUp,
  FaExclamationTriangle,
  FaBolt,
  FaExpand,
} from "react-icons/fa";

const ActionableInsights = () => {
  const cardsData = [
    {
      id: "20250804-20250804-2",
      typeId: 1,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Overall",
      message:
        "Closing stock is not updated for \u003Cb\u003E1\u003C/b\u003E out of 10 Departments",
      priority: "low",
      url: "https://flavourheaven.in/tools/manage_kitchen_closing_stock.html?startdt=2025-08-04&enddt=2025-08-04",
      seq: 2,
    },
    {
      id: "20250804-20250804-3",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Overconsumption of TANDOOR",
      message:
        "Overconsumption: \u003Cb\u003ERs. 1090\u003C/b\u003E; Purchase: \u003Cb\u003ERs. 2340\u003C/b\u003E; Budget Rs. \u003Cb\u003E1250\u003C/b\u003E; COST - 56.17%; NET COST - 45.87%",
      priority: "low",
      url: "https://flavourheaven.in/tools/kitchen_consumption_detail.html?startdt=2025-08-04&enddt=2025-08-04&departments=3",
      seq: 1,
    },
    {
      id: "20250804-20250804-4",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in TANDOOR",
      message:
        'Over consumption of \u003Ci\u003EWHOLE CHICKEN BIRD ( 800 GRM)\u003C/i\u003E: \u003Cb\u003E2000GM (Rs.418)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E2000GM\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0GM\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=24",
      seq: 2,
    },
    {
      id: "20250804-20250804-5",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in TANDOOR",
      message:
        'Over consumption of \u003Ci\u003ECASHEW NUTS 1/4\u003C/i\u003E: \u003Cb\u003E428GM (Rs.291)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E520GM\u003C/b\u003E; Sold Items worth of \u003Cb\u003E92GM\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=91",
      seq: 3,
    },
    {
      id: "20250804-20250804-6",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in TANDOOR",
      message:
        'Over consumption of \u003Ci\u003EALUMINUIM FOIL\u003C/i\u003E: \u003Cb\u003E1PKT (Rs.290)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E1PKT\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0PKT\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=144",
      seq: 4,
    },
    {
      id: "20250804-20250804-7",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Overconsumption of BEVERAGES",
      message:
        "Overconsumption: \u003Cb\u003ERs. 2576\u003C/b\u003E; Purchase: \u003Cb\u003ERs. 3561\u003C/b\u003E; Budget Rs. \u003Cb\u003E985\u003C/b\u003E; COST - 289.1%; NET COST - 299.34%",
      priority: "low",
      url: "https://flavourheaven.in/tools/kitchen_consumption_detail.html?startdt=2025-08-04&enddt=2025-08-04&departments=8",
      seq: 5,
    },
    {
      id: "20250804-20250804-8",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in BEVERAGES",
      message:
        'Over consumption of \u003Ci\u003EGAS\u003C/i\u003E: \u003Cb\u003E1CYLINDER (Rs.1820)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E1CYLINDER\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0CYLINDER\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=51",
      seq: 6,
    },
    {
      id: "20250804-20250804-9",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in BEVERAGES",
      message:
        'Over consumption of \u003Ci\u003ESPRITE 250 ML (1 UNIT)\u003C/i\u003E: \u003Cb\u003E30BOTTLE (Rs.537)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E30BOTTLE\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0BOTTLE\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=398",
      seq: 7,
    },
    {
      id: "20250804-20250804-10",
      typeId: 2,
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      title: "Items Overconsumed in BEVERAGES",
      message:
        'Over consumption of \u003Ci\u003ECOCACOLA 250ML (1 UNIT)\u003C/i\u003E: \u003Cb\u003E24BOTTLE (Rs.429)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E34BOTTLE\u003C/b\u003E; Sold Items worth of \u003Cb\u003E10BOTTLE\u003C/b\u003E',
      priority: "high",
      url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=407",
      seq: 8,
    },
  ];

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
  }, [cardsData]);

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

  const priorityColors = {
    high: "#FF3B30",
    medium: "#FFCC00",
    low: "#FF9F0A",
  };
  const bgColor = {
    high: "#fef2f2",
    medium: "#fffbeb",
    low: "#e6f1fe",
  };
  const textColor = "black";

  return (
    <Container fluid className="shadow-sm">
      {cardsData && cardsData.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3 p-2">
          <Row className="align-items-center">
            {/* Left section */}
            <Col xs="auto" className="d-flex align-items-center">
              <div className="me-2">
                <FaBolt size={24} color="rgb(255,80,22)" />
              </div>
              <div className="d-flex flex-column">
                <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
                  Actionable Insights
                </div>
                <div>Critical issues requiring immediate attention</div>
              </div>
            </Col>
          </Row>
          <div className="d-flex  gap-2 align-items-center">
            {showScrollButtons && (
              <>
                <div>5 Active</div>
                <div className="d-none d-md-flex">
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
                </div>
                <Col xs="auto" className="ms-auto ms-3">
                  <FaExpand size={24} color="rgb(255,80,22)" />
                </Col>
              </>
            )}
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
              gap: `${CARD_GAP_REM}rem`, // Use the defined gap
              paddingBottom: "0.5rem",
              overflowX: "auto",
              msOverflowStyle: "none", // IE, Edge
              scrollbarWidth: "none", // Firefox
              WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
            }}
          >
            {cardsData.map((data, index) => (
              <ActionableCard
                key={index}
                data={data}
                isMobile={isMobile}
                priorityColors={priorityColors}
                bgColor={bgColor}
                textColor={textColor}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ActionableInsights;
