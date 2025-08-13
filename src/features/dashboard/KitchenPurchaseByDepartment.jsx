"use client";
import ComponentHeader from "@/components/common/ComponentHeader";
import KitchenPurchaseByDepartmentTable from "@/components/common/Table/KitchenPurchaseByDepartmentTable";
import React, { useRef } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { FaChartBar } from "react-icons/fa";

export default function DepartmentConsumption() {
  const data = [
    {
      name: "SOUTH INDIAN",
      consumptionPct: "22.98%",
      netConsumptionPct: "23.02%",
      sales: "₹7,872",
      opening: "₹1,457.26",
      consumption: "₹1,809.85",
      closing: "₹1,424.12",
      netConsumption: "₹1,812.99",
      budget: "₹2,583.16",
      bg: "#e8f9e8",
    },
    {
      name: "NORTH INDIAN",
      consumptionPct: "7.63%",
      netConsumptionPct: "11.44%",
      sales: "₹8,950",
      opening: "₹4,318.52",
      consumption: "₹518.6",
      closing: "₹3,781.21",
      netConsumption: "₹1,456.3",
      budget: "₹2,238.88",
      bg: "#e8f9e8",
    },
    {
      name: "TANDOOR",
      consumptionPct: "12.91%",
      netConsumptionPct: "3.59%",
      sales: "₹12,340",
      opening: "₹1,551.26",
      consumption: "₹565",
      closing: "₹2,349.52",
      netConsumption: "₹59.74",
      budget: "₹1,314.77",
      bg: "#e8f9e8",
    },
    {
      name: "BIRYANI",
      consumptionPct: "28.16%",
      netConsumptionPct: "28.53%",
      sales: "₹13,100",
      opening: "₹2,605.4",
      consumption: "₹3,689.8",
      closing: "₹2,756.96",
      netConsumption: "₹3,738.25",
      budget: "₹3,539.27",
      bg: "#fff6da",
    },
    {
      name: "BREAKFAST",
      consumptionPct: "0%",
      netConsumptionPct: "-29.89%",
      sales: "₹2,450",
      opening: "₹0",
      consumption: "₹0",
      closing: "₹241.37",
      netConsumption: "₹-241.37",
      budget: "₹486",
      bg: "#e8f9e8",
    },
    {
      name: "CHINESE",
      consumptionPct: "14.29%",
      netConsumptionPct: "13.14%",
      sales: "₹9,680",
      opening: "₹3,773.11",
      consumption: "₹1,274",
      closing: "₹2,830.71",
      netConsumption: "₹2,216.4",
      budget: "₹2,724.24",
      bg: "#e8f9e8",
    },
    {
      name: "EXOTIC SHAKES",
      consumptionPct: "45.59%",
      netConsumptionPct: "43.58%",
      sales: "₹4,170",
      opening: "₹8,360.59",
      consumption: "₹926.7",
      closing: "₹5,116.23",
      netConsumption: "₹4,171.56",
      budget: "₹883.16",
      bg: "#ffe8e8",
    },
    {
      name: "BEVERAGES",
      consumptionPct: "19.7%",
      netConsumptionPct: "7.62%",
      sales: "₹6,850",
      opening: "₹3,384.3",
      consumption: "₹345",
      closing: "₹2,592.3",
      netConsumption: "₹137",
      budget: "₹1,406.88",
      bg: "#e8f9e8",
    },
    {
      name: "DISPATCH",
      consumptionPct: "0%",
      netConsumptionPct: "0%",
      sales: "₹5,200",
      opening: "₹2,576.7",
      consumption: "₹1,144",
      closing: "₹1,327.6",
      netConsumption: "₹3,393.2",
      budget: "₹3,500",
      bg: "#e8f9e8",
    },
    {
      name: "KITCHEN",
      consumptionPct: "0%",
      netConsumptionPct: "0%",
      sales: "₹8,100",
      opening: "₹0",
      consumption: "₹1,630",
      closing: "₹0",
      netConsumption: "₹1,630",
      budget: "₹4,300",
      bg: "#e8f9e8",
    },
  ];

  const badgeStyle = {
    backgroundColor: "#f0f0f0",
    color: "#555",
    fontWeight: "500",
    fontSize: "0.85rem",
    padding: "0.35rem 0.65rem",
    borderRadius: "0.65rem",
  };

  const myScrollRef = useRef(null)
  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      <ComponentHeader
        title={"Department Consumption"}
        description={"Track Department sales, consumption and performance"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={false}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaChartBar className="me-2" color='blue' size={24}/>}
      />
      {/* <Row className="mb-3">
        <Col>
          <h4 className="fw-bold text-primary">
            <FaChartBar className="me-2" />
            Department Consumption
          </h4>
          <small className="text-muted">
            Track Department sales, consumption and performance
          </small>
        </Col>
      </Row> */}

      {/* Table Wrapper with scroll */}
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <KitchenPurchaseByDepartmentTable data={data} badgeStyle={badgeStyle} />
      </div>
    </Container>
  );
}
