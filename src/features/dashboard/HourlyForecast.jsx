"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { FaClock, FaArrowRight, FaChartLine } from "react-icons/fa";

import HourlyForecastGraph from "@/components/common/GraphWrapper/HourlyForecastGraph";
import HourlyForecastFilterCard from "@/components/common/FilterComponent/HourlyForecastFilterCard";
import ComponentHeader from "@/components/common/ComponentHeader";

// Mock data for products, metrics, and data points
const mockProductData = {
  "All Products": {
    Sales: {
      dailyForecast: "₹33,110",
      actualSoFar: "₹17,109",
      remainingTarget: "₹16,001",
      graphData: [
        { hour: "12 AM", forecast: 500, actual: 480 },
        { hour: "2 AM", forecast: 550, actual: 520 },
        { hour: "4 AM", forecast: 650, actual: 610 },
        { hour: "6 AM", forecast: 1000, actual: 950 },
        { hour: "8 AM", forecast: 1500, actual: 1450 },
        { hour: "10 AM", forecast: 2200, actual: 2100 },
        { hour: "12 PM", forecast: 2500, actual: 2400 },
        { hour: "2 PM", forecast: 2800, actual: 2700 },
        { hour: "4 PM", forecast: 2400, actual: 2350 },
        { hour: "6 PM", forecast: 1800, actual: 1750 },
        { hour: "8 PM", forecast: 2000, actual: 2100 },
        { hour: "10 PM", forecast: 2900, actual: 3200 },
        { hour: "11 PM", forecast: 2200, actual: 2600 },
      ],
    },
    Orders: {
      dailyForecast: "1,250",
      actualSoFar: "780",
      remainingTarget: "470",
      graphData: [
        { hour: "12 AM", forecast: 20, actual: 18 },
        { hour: "2 AM", forecast: 25, actual: 23 },
        { hour: "4 AM", forecast: 30, actual: 28 },
        { hour: "6 AM", forecast: 50, actual: 48 },
        { hour: "8 AM", forecast: 70, actual: 65 },
        { hour: "10 AM", forecast: 90, actual: 88 },
        { hour: "12 PM", forecast: 100, actual: 95 },
        { hour: "2 PM", forecast: 110, actual: 105 },
        { hour: "4 PM", forecast: 95, actual: 92 },
        { hour: "6 PM", forecast: 75, actual: 70 },
        { hour: "8 PM", forecast: 80, actual: 85 },
        { hour: "10 PM", forecast: 120, actual: 130 },
        { hour: "11 PM", forecast: 100, actual: 110 },
      ],
    },
  },
  "Product A": {
    Sales: {
      dailyForecast: "₹15,000",
      actualSoFar: "₹8,500",
      remainingTarget: "₹6,500",
      graphData: [
        { hour: "12 AM", forecast: 200, actual: 190 },
        { hour: "2 AM", forecast: 220, actual: 210 },
        { hour: "4 AM", forecast: 300, actual: 280 },
        { hour: "6 AM", forecast: 500, actual: 470 },
        { hour: "8 AM", forecast: 800, actual: 750 },
        { hour: "10 AM", forecast: 1100, actual: 1050 },
        { hour: "12 PM", forecast: 1250, actual: 1200 },
        { hour: "2 PM", forecast: 1400, actual: 1350 },
        { hour: "4 PM", forecast: 1100, actual: 1080 },
        { hour: "6 PM", forecast: 850, actual: 820 },
        { hour: "8 PM", forecast: 900, actual: 950 },
        { hour: "10 PM", forecast: 1300, actual: 1500 },
        { hour: "11 PM", forecast: 1100, actual: 1250 },
      ],
    },
  },
};

const products = Object.keys(mockProductData);
const metrics = ["Sales", "Orders"]; // Hardcoded for simplicity, could be dynamic

export default function HourlyForecast() {
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedMetric, setSelectedMetric] = useState("Sales");
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const newData = mockProductData[selectedProduct]?.[selectedMetric];
    setCurrentData(newData || {});
  }, [selectedProduct, selectedMetric]);

  const renderGraph = () => {
    if (!currentData.graphData || currentData.graphData.length === 0) {
      return (
        <div className="text-center p-5 text-secondary">
          No data available for this selection.
        </div>
      );
    }

    return (
      <HourlyForecastGraph
        currentData={currentData}
        selectedMetric={selectedMetric}
      />
    );
  };
const myScrollRef = useRef(null); 

  return (
    <Container fluid className="mt-3">
      {/* Header */}
      <ComponentHeader
        title={"Hourly Forecast"}
        description={"Real-time predictions for today's performance"}
        isShowArrows={false}
        scrollRef={myScrollRef}
        isExpandable={true}
        text={`Today's Forecast →`}
      />
      {/* Main Content */}
      <HourlyForecastFilterCard
        products={products}
        metrics={metrics}
        selectedProduct={selectedProduct}
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        setSelectedProduct={setSelectedProduct}
        currentData={currentData}
        renderGraph={renderGraph}
      />
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .dot {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </Container>
  );
}
