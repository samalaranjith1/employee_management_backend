"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import { FaBoxOpen, FaBullseye, FaCube, FaUserClock } from "react-icons/fa";
import ProdcutsContent from "@/features/products/ProductsContent";
import { useProductsContext } from "@/contexts/ProductsContext";

function DepartmentPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [durationFilter, setDurationFilter] = useState("Today");

  const { startDate, endDate, setStartDate, setEndDate } = useProductsContext();

  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();

  useEffect(() => {
    setStartDateDashboard(startDate);
    setEndDateDashboard(endDate);
  }, [startDate, endDate]);

  const navTabs = ["Home", "Sales", "Ingredients", "Cost"];
  const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

  // 🔹 RawData for cards (you can fetch these values dynamically later)
  const rawData = [
    {
      title: "Margin Cost",
      value: "₹106",
      icon: <FaBullseye />, // icon key
      color: "#2ecc71",
    },
    {
      title: "Margin",
      value: "67.72%",
      icon: <FaCube />,
      color: "#3498db",
    },
    {
      title: "Prep Time",
      value: "5 Mins",
      icon: <FaUserClock />,
      color: "#e67e22",
    },
    {
      title: "Pieces",
      value: "5 (15 GM Each)",
      icon: <FaBoxOpen />,
      color: "#9b59b6",
    },
  ];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
      <ItemsSupplierProductsHeader
        title="Butter Chicken (Half)"
        subtitle="North Indian • Butter Chicken • Half • ₹320"
        showBackButton
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        filters={filters}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        rawData={rawData} // ✅ pass rawData
        startDate={startDate}
        endDate={endDate}
      />

      <Container fluid className="mt-4">
        <ProdcutsContent
          activeTab={activeTab}
          durationFilter={durationFilter}
        />
      </Container>
    </div>
  );
}

export default DepartmentPage;
