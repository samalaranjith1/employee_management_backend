"use client";
import ProductPerformanceSummaryCards from "@/components/common/Cards/ProductPerformanceSummaryCards";
import ComponentHeader from "@/components/common/ComponentHeader";
import ProductPerformanceTable from "@/components/common/Table/ProductPerformanceTable";
import React, { useEffect, useRef, useState } from "react";
import { Container, Card, Badge, Table, Button } from "react-bootstrap";
import {
  FaClock,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ProductPerformanceByPercentile() {
  const summary = [
    {
      label: "Total Products",
      value: 277,
      amount: "₹283,082",
      bgColor: "#dbe9ff",
      textColor: "#2a4cfa",
    },
    {
      label: "Top Performers",
      value: 34,
      amount: "₹140,494",
      bgColor: "#dbffea",
      textColor: "#23864b",
    },
    {
      label: "Moderate Performers",
      value: 120,
      amount: "₹112,681",
      bgColor: "#fff6d4",
      textColor: "#d08e00",
    },
    {
      label: "Low Performers",
      value: 123,
      amount: "₹29,907",
      bgColor: "#ffeaea",
      textColor: "#d93939",
    },
    {
      label: "Another Card 1",
      value: 10,
      amount: "₹10,000",
      bgColor: "#f0f0f0",
      textColor: "#000000",
    },
    {
      label: "Another Card 2",
      value: 20,
      amount: "₹20,000",
      bgColor: "#e0e0e0",
      textColor: "#000000",
    },
  ];

  const tableData = [
    {
      percentile: "90 Percentile",
      products: 1,
      sales: 21605,
      salesPercent: "7.63%",
      margin: 10802.5,
      marginPercent: "50.0%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "80 Percentile",
      products: 5,
      sales: 32872,
      salesPercent: "11.61%",
      margin: 27841,
      marginPercent: "84.7%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "70 Percentile",
      products: 6,
      sales: 26835,
      salesPercent: "9.48%",
      margin: 18848,
      marginPercent: "70.2%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "60 Percentile",
      products: 10,
      sales: 31600,
      salesPercent: "11.16%",
      margin: 23089,
      marginPercent: "73.1%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "50 Percentile",
      products: 12,
      sales: 27582,
      salesPercent: "9.74%",
      margin: 20077,
      marginPercent: "72.8%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "40 Percentile",
      products: 16,
      sales: 28469,
      salesPercent: "10.06%",
      margin: 19079,
      marginPercent: "67.0%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "70 Percentile",
      products: 6,
      sales: 26835,
      salesPercent: "9.48%",
      margin: 18848,
      marginPercent: "70.2%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "60 Percentile",
      products: 10,
      sales: 31600,
      salesPercent: "11.16%",
      margin: 23089,
      marginPercent: "73.1%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "50 Percentile",
      products: 12,
      sales: 27582,
      salesPercent: "9.74%",
      margin: 20077,
      marginPercent: "72.8%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "40 Percentile",
      products: 16,
      sales: 28469,
      salesPercent: "10.06%",
      margin: 19079,
      marginPercent: "67.0%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "70 Percentile",
      products: 6,
      sales: 26835,
      salesPercent: "9.48%",
      margin: 18848,
      marginPercent: "70.2%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "60 Percentile",
      products: 10,
      sales: 31600,
      salesPercent: "11.16%",
      margin: 23089,
      marginPercent: "73.1%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "50 Percentile",
      products: 12,
      sales: 27582,
      salesPercent: "9.74%",
      margin: 20077,
      marginPercent: "72.8%",
      classification: "Top Performers",
      barColor: "green",
    },
    {
      percentile: "40 Percentile",
      products: 16,
      sales: 28469,
      salesPercent: "10.06%",
      margin: 19079,
      marginPercent: "67.0%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "30 Percentile",
      products: 22,
      sales: 27980,
      salesPercent: "9.88%",
      margin: 19001,
      marginPercent: "67.9%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "20 Percentile",
      products: 32,
      sales: 28518,
      salesPercent: "10.07%",
      margin: 20512,
      marginPercent: "71.9%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "10 Percentile",
      products: 50,
      sales: 27714,
      salesPercent: "9.79%",
      margin: 21471,
      marginPercent: "77.5%",
      classification: "Moderate Performers",
      barColor: "orange",
    },
    {
      percentile: "Below 10 Percentile",
      products: 123,
      sales: 29907,
      salesPercent: "10.56%",
      margin: 22891,
      marginPercent: "76.5%",
      classification: "Low Performers",
      barColor: "red",
    },
  ];

  const myScrollRef = useRef(null);
  return (
    <Container
      fluid
      className="p-2"
      style={{ backgroundColor: "#fff9f2", borderRadius: 12 }}
    >
      <ComponentHeader
        title={"Product Performance by Percentile"}
        description={""}
        titleColor={"rgb(255,79,22)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={""}
      />

      <ProductPerformanceSummaryCards
        summary={summary}
        cardsContainerRef={myScrollRef}
      />

      {/* Table */}
      <ProductPerformanceTable data={tableData} />
    </Container>
  );
}
