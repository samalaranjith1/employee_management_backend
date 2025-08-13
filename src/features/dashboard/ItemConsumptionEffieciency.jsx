"use client";

import React, { useRef } from "react";
import {  Row, Col, Badge } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaBoxOpen,
  FaRupeeSign,
  FaPercent,
  FaBolt,
  FaExpand,
} from "react-icons/fa";

import ItemConsumptionEfficiencyCard from "@/components/common/Cards/ItemConsumptionEfficiencyCard";
import ItemConsumptionEffieciencyTable from "@/components/common/Table/ItemConsumptionEffieciencyTable";
import ComponentHeader from "@/components/common/ComponentHeader";

const ItemConsumptionEfficiency = () => {
  const summaryCards = [
    {
      icon: <FaExclamationTriangle size={24} color="#ff4d4f" />,
      label: "Critical Items",
      value: 9,
      bg: "#ffe6e6",
    },
    {
      icon: <FaBoxOpen size={24} color="#ff9800" />,
      label: "Total Items",
      value: 15,
      bg: "#fff3e0",
    },
    {
      icon: <FaRupeeSign size={24} color="#f44336" />,
      label: "Total Waste",
      value: "₹3,681.4",
      bg: "#fff0f0",
    },
    {
      icon: <FaPercent size={24} color="#ff9800" />,
      label: "Avg Waste",
      value: "28.3%",
      bg: "#fff8e1",
    },
  ];

  const tableData = [
    {
      item: "Whole Chicken Bird (800 Grm)",
      dept: "Poultry & Meat",
      region: "SOUTH INDIAN",
      consumed: "25.5 kg",
      sales: "20 kg",
      diff: "+5.5",
      waste: "27.5%",
      cost: "₹245.50",
      status: "Monitor",
      wasteType: "Medium",
    },
    {
      item: "Ghee",
      dept: "Dairy & Oils",
      region: "NORTH INDIAN",
      consumed: "8.2 kg",
      sales: "7.5 kg",
      diff: "+0.7",
      waste: "8.3%",
      cost: "₹289.60",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Green Cardamom",
      dept: "Spices & Herbs",
      region: "BIHARI",
      consumed: "0.8 kg",
      sales: "0.6 kg",
      diff: "+0.2",
      waste: "33.3%",
      cost: "₹156.00",
      status: "Critical",
      wasteType: "Critical",
    },
    {
      item: "Milk",
      dept: "Beverages",
      region: "BEVERAGES",
      consumed: "45 ltr",
      sales: "38.5 ltr",
      diff: "+6.5",
      waste: "16.9%",
      cost: "₹178.50",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Whole Chicken Bird (800 Grm)",
      dept: "Poultry & Meat",
      region: "SOUTH INDIAN",
      consumed: "25.5 kg",
      sales: "20 kg",
      diff: "+5.5",
      waste: "27.5%",
      cost: "₹245.50",
      status: "Monitor",
      wasteType: "Medium",
    },
    {
      item: "Ghee",
      dept: "Dairy & Oils",
      region: "NORTH INDIAN",
      consumed: "8.2 kg",
      sales: "7.5 kg",
      diff: "+0.7",
      waste: "8.3%",
      cost: "₹289.60",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Green Cardamom",
      dept: "Spices & Herbs",
      region: "BIHARI",
      consumed: "0.8 kg",
      sales: "0.6 kg",
      diff: "+0.2",
      waste: "33.3%",
      cost: "₹156.00",
      status: "Critical",
      wasteType: "Critical",
    },
    {
      item: "Milk",
      dept: "Beverages",
      region: "BEVERAGES",
      consumed: "45 ltr",
      sales: "38.5 ltr",
      diff: "+6.5",
      waste: "16.9%",
      cost: "₹178.50",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Whole Chicken Bird (800 Grm)",
      dept: "Poultry & Meat",
      region: "SOUTH INDIAN",
      consumed: "25.5 kg",
      sales: "20 kg",
      diff: "+5.5",
      waste: "27.5%",
      cost: "₹245.50",
      status: "Monitor",
      wasteType: "Medium",
    },
    {
      item: "Ghee",
      dept: "Dairy & Oils",
      region: "NORTH INDIAN",
      consumed: "8.2 kg",
      sales: "7.5 kg",
      diff: "+0.7",
      waste: "8.3%",
      cost: "₹289.60",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Green Cardamom",
      dept: "Spices & Herbs",
      region: "BIHARI",
      consumed: "0.8 kg",
      sales: "0.6 kg",
      diff: "+0.2",
      waste: "33.3%",
      cost: "₹156.00",
      status: "Critical",
      wasteType: "Critical",
    },
    {
      item: "Milk",
      dept: "Beverages",
      region: "BEVERAGES",
      consumed: "45 ltr",
      sales: "38.5 ltr",
      diff: "+6.5",
      waste: "16.9%",
      cost: "₹178.50",
      status: "Monitor",
      wasteType: "Low",
    },
        {
      item: "Whole Chicken Bird (800 Grm)",
      dept: "Poultry & Meat",
      region: "SOUTH INDIAN",
      consumed: "25.5 kg",
      sales: "20 kg",
      diff: "+5.5",
      waste: "27.5%",
      cost: "₹245.50",
      status: "Monitor",
      wasteType: "Medium",
    },
    {
      item: "Ghee",
      dept: "Dairy & Oils",
      region: "NORTH INDIAN",
      consumed: "8.2 kg",
      sales: "7.5 kg",
      diff: "+0.7",
      waste: "8.3%",
      cost: "₹289.60",
      status: "Monitor",
      wasteType: "Low",
    },
    {
      item: "Green Cardamom",
      dept: "Spices & Herbs",
      region: "BIHARI",
      consumed: "0.8 kg",
      sales: "0.6 kg",
      diff: "+0.2",
      waste: "33.3%",
      cost: "₹156.00",
      status: "Critical",
      wasteType: "Critical",
    },
    {
      item: "Milk",
      dept: "Beverages",
      region: "BEVERAGES",
      consumed: "45 ltr",
      sales: "38.5 ltr",
      diff: "+6.5",
      waste: "16.9%",
      cost: "₹178.50",
      status: "Monitor",
      wasteType: "Low",
    },
  ];

  const wasteBadge = (wasteType) => {
    switch (wasteType) {
      case "Critical":
        return <Badge bg="danger">Critical</Badge>;
      case "Medium":
        return (
          <Badge bg="warning" text="dark">
            Medium
          </Badge>
        );
      case "Low":
        return <Badge bg="success">Low</Badge>;
      default:
        return null;
    }
  };
const myScrollRef = useRef(null);
  return (
    <div className="mt-2 p-2">
      {/* Header Row */}
      <ComponentHeader
        title={"Item Consumption Efficiency"}
        description={
          "Monitor wastage patterns and consumption inefficiencies across menu items"
        }
        titleColor={"rgb(255,79,22)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={""}
      />
      {/* <Row className="d-flex align-items-center justify-content-between mb-3">
        <Col className="d-flex align-items-center">
          <div className="me-2">
            <FaBolt size={24} color="rgb(255,80,22)" />
          </div>
          <div className="d-flex flex-column mt-2">
            <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
              Item Consumption Efficiency
            </div>
            <div>
              {" "}
              Monitor wastage patterns and consumption inefficiencies across
              menu items
            </div>
          </div>
        </Col>

        <Col xs="auto" className="d-flex align-items-center ms-auto">
          <FaExpand size={24} color="rgb(255,80,22)" />
        </Col>
      </Row> */}

      {/* Summary Cards - scrollable on mobile */}
      
      <ItemConsumptionEfficiencyCard
        summaryCards={summaryCards}
        scrollRef={myScrollRef}
      />
      {/* Table */}
      <ItemConsumptionEffieciencyTable
        tableData={tableData}
        wasteBadge={wasteBadge}
      />
    </div>
  );
};

export default ItemConsumptionEfficiency;
