"use client";
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  FaHome,
  FaBox,
  FaTags,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

// Dashboard Components
import ActionableInsights from "@/features/dashboard/ActionableInsights";
import MonthSummary from "@/features/dashboard/MonthSummary";
import TrendAnalysis from "@/features/dashboard/TrendAnalysis";
import PeriodDataBreakDown from "@/features/dashboard/PeriodDataBreakDown";
import HourlyForecast from "@/features/dashboard/HourlyForecast";
import KitchenPurchaseByDepartment from "@/features/dashboard/KitchenPurchaseByDepartment";
import DepartmentPerformanceAnalysis from "@/features/dashboard/DepartmentPerformanceAnalysis";
import DepartmentAndItemConsumption from "@/features/dashboard/DepartmentAndItemConsumption";
import ItemConsumptionEffieciency from "@/features/dashboard/ItemConsumptionEffieciency";
import WastageAnalysis from "@/features/dashboard/WastageAnalysis";
import CostReductionRecommendations from "@/features/dashboard/CostReductionRecommendations";
import PriceChanges from "@/features/dashboard/PriceChanges";
import PriceManagementRecommendations from "@/features/dashboard/PriceManagementRecommendations";
import OutOfStock from "@/features/dashboard/OutOfStock";
import ImmediateActionsRequired from "@/features/dashboard/ImmediateActionsRequired";
import Recipes from "@/features/dashboard/Recipes";
import MenuOptimizationRecommendations from "@/features/dashboard/MenuOptimizationRecommendations";
import TopSellingProducts from "@/features/dashboard/TopSellingProducts";
import ProductPerformanceDetails from "@/features/dashboard/ProductPerformanceDetails";
import RevenueContributionFromProducts from "@/features/dashboard/RevenueContributionFromProducts";
import SuppliersManagement from "@/features/dashboard/SuppliersManagement";
import SupplierDuesThisMonth from "@/features/dashboard/SupplierDuesThisMonth";
import SupplierDues from "@/features/dashboard/SupplierDues";
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
import ConsumptionSummarry from "./ConsumptionSummarry";

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <MainComponentHoldingCard>
              <ConsumptionSummarry />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ActionableInsights />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <MonthSummary />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TrendAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PeriodDataBreakDown />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <HourlyForecast />
            </MainComponentHoldingCard>
          </>
        );
      case "items":
        return (
          <>
            <MainComponentHoldingCard>
              <ItemConsumptionEffieciency />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentAndItemConsumption />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PriceChanges />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PriceManagementRecommendations />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <OutOfStock />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SuppliersManagement />
            </MainComponentHoldingCard>
            {/* <ImmediateActionsRequired /> */}
          </>
        );
      case "products":
        return (
          <>
            <MainComponentHoldingCard>
              <TopSellingProducts />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <Recipes />
            </MainComponentHoldingCard>
            {/* <MenuOptimizationRecommendations />
            <ProductPerformanceDetails />
            <RevenueContributionFromProducts /> */}
          </>
        );
      case "departments":
        return (
          <>
            <MainComponentHoldingCard>
              <KitchenPurchaseByDepartment />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentPerformanceAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentAndItemConsumption />
            </MainComponentHoldingCard>
          </>
        );
      case "actionable":
        return (
          <>
            <MainComponentHoldingCard>
              <ActionableInsights />
            </MainComponentHoldingCard>
          </>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { key: "home", icon: <FaHome size={20} />, label: "HOME" },
    { key: "items", icon: <FaBox size={20} />, label: "ITEMS" },
    { key: "products", icon: <FaTags size={20} />, label: "PRODUCTS" },
    {
      key: "departments",
      icon: <FaBuilding size={20} />,
      label: "DEPARTMENTS",
    },
    {
      key: "actionable",
      icon: <FaClipboardList size={20} />,
      label: "ACTIONABLE",
    },
  ];

  return (
    <div
      className="d-md-none" // Hide in desktop
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fa",
      }}
    >
      {/* Scrollable Tab Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "60px", // space for bottom navbar
        }}
      >
        {renderTabContent()}
      </div>

      {/* Bottom Navbar */}
      <Navbar
        fixed="bottom"
        className="d-flex justify-content-around shadow-sm"
        style={{
          background: "#fff",
          borderTop: "1px solid #ddd",
          padding: "0.3rem 0",
          zIndex: 999999, // Max z-index
        }}
      >
        {navItems.map(({ key, icon, label }) => (
          <Nav.Link
            key={key}
            onClick={() => setActiveTab(key)}
            className="text-center"
            style={{
              flex: 1,
              color: activeTab === key ? "#ff5016" : "#555",
              fontSize: "0.8rem",
            }}
          >
            <div>{icon}</div>
            <div style={{ fontSize: "0.7rem", marginTop: "2px" }}>{label}</div>
          </Nav.Link>
        ))}
      </Navbar>
    </div>
  );
}
