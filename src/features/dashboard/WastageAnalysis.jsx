
"use client";
import WastageAnalysisTopCards from "@/components/common/Cards/WastageAnalysisTopCards";
import WastageAnalysisTable from "@/components/common/Table/WastageAnalysisTable";
import React from "react";
import { useState, useEffect } from "react";
import {  Card } from "react-bootstrap";
import {
  FaTrashAlt,
  FaDrumstickBite,
  FaLeaf,
  FaFish,
  FaAppleAlt,
} from "react-icons/fa";

export default function WastageAnalysis() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkScreen = () => setIsMobile(window.innerWidth < 768); // Bootstrap "md" breakpoint
      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);
  const rawMaterialWastage = [
    {
      name: "Chicken Breast",
      category: "Poultry",
      qty: "12kg",
      price: 220,
      total: 2640,
      icon: <FaDrumstickBite />,
    },
    {
      name: "Basmati Rice",
      category: "Grains",
      qty: "8kg",
      price: 85,
      total: 680,
      icon: <FaLeaf />,
    },
    {
      name: "Fresh Salmon",
      category: "Seafood",
      qty: "5kg",
      price: 450,
      total: 2250,
      icon: <FaFish />,
    },
    {
      name: "Onions",
      category: "Vegetables",
      qty: "15kg",
      price: 35,
      total: 525,
      icon: <FaAppleAlt />,
    },
  ];

  const expiredItems = [
    {
      name: "Fresh Milk",
      category: "Dairy",
      qty: "10liters",
      price: 45,
      total: 450,
      date: "2025-01-05",
    },
    {
      name: "Yogurt Cups",
      category: "Dairy",
      qty: "24pieces",
      price: 8,
      total: 192,
      date: "2025-01-04",
    },
    {
      name: "Bread Loaves",
      category: "Bakery",
      qty: "6pieces",
      price: 25,
      total: 150,
      date: "2025-01-03",
    },
    {
      name: "Fresh Cheese",
      category: "Dairy",
      qty: "4kg",
      price: 95,
      total: 380,
      date: "2025-01-02",
    },
  ];

  const expiredProducts = [
    {
      name: "Chicken Biryani",
      category: "South Indian",
      price: 35,
      total: 280,
      qty: "8 portions",
      date: "2025-01-07",
    },
    {
      name: "Marinated Chicken",
      category: "Tandoor",
      price: 80,
      total: 240,
      qty: "3 kg",
      date: "2025-01-06",
    },
    {
      name: "Paneer Curry",
      category: "North Indian",
      price: 45,
      total: 225,
      qty: "5 portions",
      date: "2025-01-07",
    },
    {
      name: "Fried Rice",
      category: "Indo-Chinese",
      price: 60,
      total: 300,
      qty: "5 portions",
      date: "2025-01-07",
    },
  ];

  const cardStyle = {
    borderRadius: "20px",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    minWidth: "23vw",
    flex: "0 0 auto",
  };

  const statCard = (bg, icon, title, value, sub) => (
    <Card style={{ ...cardStyle, background: bg, color: "#fff" ,width:isMobile?'90vw':'23vw'}} >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
          <h4 style={{ margin: "5px 0" }}>{value}</h4>
          {sub && <div style={{ fontSize: "13px", opacity: 0.8 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: "26px" }}>{icon}</div>
      </Card.Body>
    </Card>
  );

  const tableCardStyle = {
    ...cardStyle,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    height: "300px",
  };

  const scrollBodyStyle = {
    flex: 1,
    overflowY: "auto",
  };

  return (
    <Card style={{ background: "#fff" }} className="p-2">
      <div className="mt-2">
        <h5 style={{ fontWeight: "600", color: "#0aa4b3" }}>
          <FaTrashAlt className="me-2" /> Wastage Analysis
        </h5>
        <p style={{ fontSize: "13px", color: "#666" }}>
          Track and minimize food waste across all categories
        </p>
      </div>

      {/* Stat Cards */}
      <WastageAnalysisTopCards statCard={statCard} />

      {/* Hide scrollbar for Webkit */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Tables */}
      <WastageAnalysisTable
        expiredItems={expiredItems}
        expiredProducts={expiredProducts}
        rawMaterialWastage={rawMaterialWastage}
        tableCardStyle={tableCardStyle}
        scrollBodyStyle={scrollBodyStyle}
      />
    </Card>
  );
}
