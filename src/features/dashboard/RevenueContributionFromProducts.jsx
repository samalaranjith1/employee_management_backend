"use client";

import RevenueContributionCards from "@/components/common/card/RevenueContributionCards";
import ComponentHeader from "@/components/common/ComponentHeader";
import RevenueContributionTable from "@/components/common/Tables/RevenueContributionTable";
import React, { useRef } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaBolt,
  FaChartLine,
  FaExclamationTriangle,
  FaExpand,
  FaTimesCircle,
} from "react-icons/fa";

const RevenueContribution = () => {
  // Inline styling object
  const styles = {
    container: {
      background: "#fff",
      borderRadius: "12px",
      padding: "1rem",
    },
    topCards: {
      display: "flex",
      overflowX: "auto",
      gap: "1rem",
      paddingBottom: "1rem",
      scrollSnapType: "x mandatory",
    },
    topCard: {
      flex: "0 0 30vw", // default desktop width
      borderRadius: "12px",
      padding: "1rem",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    icon: {
      fontSize: "1.5rem",
    },
    value: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    title: {
      fontWeight: "600",
    },
    desc: {
      fontSize: "0.9rem",
    },
    tableContainer: {
      maxHeight: "60vh",
      overflowY: "auto",
    },
    // The sticky styling is now applied via a CSS class to ensure it works reliably.
    // The previous inline style `tableHead` is no longer used for the `<thead>`.
    tag: {
      padding: "0.25rem 0.6rem",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  };

  // Top cards data
  const topCards = [
    {
      title: "Top Performers",
      value: 22,
      description: "Products driving 60%+ revenue",
      icon: <FaChartLine />,
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      title: "Review Needed",
      value: 90,
      description: "Products contributing 20-50%",
      icon: <FaExclamationTriangle />,
      bg: "#fffbeb",
      color: "#d97706",
    },
    {
      title: "Removal Candidates",
      value: 248,
      description: "Products contributing <20%",
      icon: <FaTimesCircle />,
      bg: "#fef2f2",
      color: "#dc2626",
    },
  ];

  // Table rows data
  const tableData = [
    {
      bucket: "90% Of Sale",
      products: 1,
      sales: "₹64,426",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "80% Of Sale",
      products: 4,
      sales: "₹57,672",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "70% Of Sale",
      products: 7,
      sales: "₹69,755",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "60% Of Sale",
      products: 10,
      sales: "₹69,897",
      totalSales: "₹663,371",
      tag: "Top Performers",
      tagColor: "#dcfce7",
      tagText: "#16a34a",
    },
    {
      bucket: "50% Of Sale",
      products: 13,
      sales: "₹66,972",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "40% Of Sale",
      products: 17,
      sales: "₹68,010",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "30% Of Sale",
      products: 24,
      sales: "₹65,876",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "20% Of Sale",
      products: 36,
      sales: "₹67,357",
      totalSales: "₹663,371",
      tag: "Review",
      tagColor: "#fef3c7",
      tagText: "#d97706",
    },
    {
      bucket: "10% Of Sale",
      products: 62,
      sales: "₹66,499",
      totalSales: "₹663,371",
      tag: "Consider Removal",
      tagColor: "#fee2e2",
      tagText: "#dc2626",
    },
    {
      bucket: "Below 10% of Sale",
      products: 186,
      sales: "₹66,907",
      totalSales: "₹663,371",
      tag: "Consider Removal",
      tagColor: "#fee2e2",
      tagText: "#dc2626",
    },
  ];
const myScrollRef=useRef(null)
  return (
    <Container fluid style={styles.container} className="p-2">
      <ComponentHeader
        title={"Revenue Contribution from Products"}
        description={"Revenue Contribution from Products description"}
        titleColor={"rgb(255,79,22)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={""}
      />

      {/* Top Cards */}
      <div
        style={styles.topCards}
        className="top-cards-container"
        ref={myScrollRef}
      >
        {topCards.map((card, idx) => (
          <RevenueContributionCards
            card={card}
            idx={idx}
            key={idx}
            styles={styles}
            myScrollRef={myScrollRef}
          />
        ))}
      </div>

      {/* Table */}
      <RevenueContributionTable styles={styles} tableData={tableData} />

      {/* CSS for mobile swipe + width override, and the sticky header fix */}

    </Container>
  );
};

export default RevenueContribution;
