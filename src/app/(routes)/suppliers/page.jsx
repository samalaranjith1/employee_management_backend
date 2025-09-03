"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsContext } from "@/contexts/ItemsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import SuppliersContent from "@/features/suppliers/SuppliersContent";
import { useSuppliersContext } from "@/contexts/SuppliersContext";

function DepartmentPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [durationFilter, setDurationFilter] = useState("Today");

  const { startDate, endDate, setStartDate, setEndDate } = useSuppliersContext();
  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();

  useEffect(() => {
    setStartDateDashboard(startDate);
    setEndDateDashboard(endDate);
  }, [startDate, endDate]);

  const navTabs = ["Home", "Items"];
  const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
      <ItemsSupplierProductsHeader
        title="SMart"
        subtitle="Madhapur. Hyderabad. Telangana"
        showBackButton
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        filters={filters}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />

      <Container fluid className="mt-4">
        <SuppliersContent
          activeTab={activeTab}
          durationFilter={durationFilter}
        />
      </Container>
    </div>
  );
}

export default DepartmentPage;
