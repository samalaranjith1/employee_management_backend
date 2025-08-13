"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import {
  FaBolt,
  FaExpand,
  FaUtensils,
  FaChartLine,
  FaCoffee,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import ConsumptionCard from "@/components/common/Cards/ConsumptionCard";
import ComponentHeader from "@/components/common/ComponentHeader";

function ConsumptionCarousel({ cards, scrollContainerRef }) {
  return (
    <>
      <div
        ref={scrollContainerRef}
        className="d-flex"
        style={{
          gap: `16px`,
          paddingBottom: "0.5rem",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards.map((card, idx) => (
          <ConsumptionCard key={idx} {...card} />
        ))}
      </div>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .d-flex::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .card-item {
            flex: 0 0 90vw;
          }
        }
      `}</style>
    </>
  );
}

export default function ConsumptionSummarry() {
  const scrollContainerRef = useRef();
  const CARD_GAP_PX = 16; // Assuming 1rem = 16px
  const [showScrollButtons, setShowScrollButtons] = useState(false);

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
    const checkScroll = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setShowScrollButtons(el.scrollWidth > el.clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

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

  const isLoading = false;
  const isError = false;
  const error = null;

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
          // highlightBg: "#ffdcc0",
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
          // highlightBg: "#bbd0ff",
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
        { label: "Dine in", value: "₹65,000", 
          // highlightBg: "#e9d5ff" 
        },
        { label: "Online", value: "₹10,000" },
      ],
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;
const myScrollRef = useRef(null);

  return (
    <Container fluid>
      <ComponentHeader
        title={"Consumption Summary"}
        description={"Real-time consumption metrics and performance indicators"}
        titleColor={"rgb(255,92,0)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
      />
      {/* <Row className="d-flex align-items-center justify-content-between mb-3">
        <Col className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column mt-2">
            <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
              Consumption Summary
            </div>
            <div>Real-time consumption metrics and performance indicators</div>
          </div>
        </Col>

        <Col xs="auto" className="d-flex align-items-center ms-auto">
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
                <Button
                  size="sm"
                  variant="light"
                  className="me-3"
                  onClick={slideRight}
                >
                  &gt;
                </Button>
              </>
            )}
          </div>
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row>  */}
      <ConsumptionCarousel cards={cardsData} scrollContainerRef={myScrollRef} />
    </Container>
  );
}
