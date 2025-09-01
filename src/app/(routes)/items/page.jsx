"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsContext } from "@/contexts/ItemsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import ItemsContent from "@/features/items/ItemsContent";

function DepartmentPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [durationFilter, setDurationFilter] = useState("Today");
  const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();

  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();
  useEffect(() => {
    setStartDateDashboard(startDate);
    setEndDateDashboard(endDate);
  }, [startDate, endDate]);

  const navTabs = [
    "Home",
    "Insights",
    "Purchase",
    "Consumption",
    "Products",
    "Price Trends",
    "Stock Trends",
  ];

  return (
    <div
      style={{ background: "#f9fafc", minHeight: "100vh" }}
      className="mt-5 pt-2"
    >
      <ItemsSupplierProductsHeader
        title="Gold Drop Oil"
        subtitle="Indian Grocery • 1000 GM"
        price="₹115.7"
        tabs={navTabs}
        onFilterChange={(filter) => console.log("Filter Changed:", filter)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setDurationFilter={setDurationFilter}
        durationFilter={durationFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <Container fluid className="mt-4">
        <ItemsContent activeTab={activeTab} durationFilter={durationFilter} />
      </Container>
    </div>
  );
}

export default DepartmentPage;
