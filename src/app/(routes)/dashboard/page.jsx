"use client";

import { useState } from "react";
import DurationFilters from "@/features/dashboard/DurationFilters";
import ConsumptionSummarry from "@/features/dashboard/ConsumptionSummarry";
import ActionableInsights from "@/features/dashboard/ActionableInsights";
import MonthSummary from "@/features/dashboard/MonthSummary";
import TrendAnalysis from "@/features/dashboard/TrendAnalysis";
import HourlyForecast from "@/features/dashboard/HourlyForecast";
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
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
import MobileBottomNav from "@/features/dashboard/MobileBottomNavBar";
import ItemConsumptionDistribution from "@/features/dashboard/ItemConsumptionDistribution";
import ProductPerformanceByPercentile from "@/features/dashboard/ProductPerformanceByPercentile";
import TopConsumedItems from "@/features/dashboard/TopConsumedItems";
import DepartmentConsumption from "@/features/dashboard/KitchenPurchaseByDepartment";
import DepartmentConsumptionChart from "@/features/dashboard/DepartmentConsumptionChart";
import PeriodDataBreakdown from "@/features/dashboard/PeriodDataBreakDown";
import SupplierDues from "@/features/dashboard/SupplierDues";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import SalesAnalytics from "../(smallPages)/sales_analytics/page";
import ConsumptionHistoryAnalysis from "../(smallPages)/consumption_analytics/page";
import PurchaseAnalytics from "../(smallPages)/purchase_analytics/page";
import RecipeInsights from "../(smallPages)/reciepe_analytics/page";
import WarehouseStockAnalytics from "../(smallPages)/ware_house_analytics/page";
import ItemPriceChangeAnalytics from "../(smallPages)/item_price_change_analytics/page";
import ConsumptionClosingAnalysis from "../(smallPages)/consumption_closing_analytics/page";
import WastageAnalytics from "../(smallPages)/wastage_analytics/page";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    "Dashboard",
    "Sales",
    "Consumption",
    "Closing",
    "Purchase",
    "Recipe",
    "Stock",
    "Item Price",
    "Wastage"
  ];

  return (
    <div>
      <div className="mt-4 pt-5"></div>
      {/* ✅ Duration filter stays outside tabs */}
      <MainComponentHoldingCard>
        <DurationFilters />
      </MainComponentHoldingCard>
      {/* ✅ Top Navigation Tabs */}
      <div
        style={{ width: "100%", overflowX: "auto" }}
        className="custom-scrollbar"
      >
        <ButtonGroup
          className="rounded-pill w-max d-flex"
          style={{
            backgroundColor: "#0000ff",
            minWidth: "100%",
            flexWrap: "nowrap",
            color: "white",
          }}
        >
          {tabs.map((label) => {
            const selected = activeTab === label;
            return (
              <ToggleButton
                key={label}
                id={`dashboard-tabs-${label}`}
                type="radio"
                variant="none"
                checked={selected}
                value={label}
                onChange={(e) => setActiveTab(e.currentTarget.value)}
                className="rounded-pill flex-grow-0"
                style={{
                  fontSize: "15px",
                  padding: "10px 20px",
                  fontWeight: 600,
                  backgroundColor: selected ? "#FF6600" : "transparent",
                  color: selected ? "#fff" : "#fff",
                  border: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "background 0.25s,color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </ToggleButton>
            );
          })}
          {/* DurationFilters displayed from md and up */}
          <div className="d-none d-md-flex ms-auto">
            <DurationFilters />
          </div>
        </ButtonGroup>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
          }
          .custom-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: thin; /* Firefox */
          }
        `}</style>
      </div>

      {/* ✅ Tab Content */}
      <div className="mt-2">
        {activeTab === "Dashboard" && (
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
              <PeriodDataBreakdown />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <HourlyForecast />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentConsumption />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentPerformanceAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentAndItemConsumption />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentConsumptionChart />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ItemConsumptionEffieciency />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TopConsumedItems />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ItemConsumptionDistribution />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <WastageAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <CostReductionRecommendations />
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
              <ImmediateActionsRequired />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <Recipes />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <MenuOptimizationRecommendations />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TopSellingProducts />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ProductPerformanceDetails />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ProductPerformanceByPercentile />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <RevenueContributionFromProducts />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SuppliersManagement />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDuesThisMonth />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDues />
            </MainComponentHoldingCard>
          </>
        )}
        {/* Other tabs placeholders */}
        {activeTab === "Sales" && (
          <MainComponentHoldingCard>
            <SalesAnalytics />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Consumption" && (
          <MainComponentHoldingCard>
            <ConsumptionHistoryAnalysis />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Purchase" && (
          <MainComponentHoldingCard>
            <PurchaseAnalytics />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Recipe" && (
          <MainComponentHoldingCard>
            <RecipeInsights />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Stock" && (
          <MainComponentHoldingCard>
            <WarehouseStockAnalytics />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Closing" && (
          <MainComponentHoldingCard>
            <ConsumptionClosingAnalysis />
          </MainComponentHoldingCard>
        )}
        {activeTab === "Item Price" && (
          <MainComponentHoldingCard>
            <ItemPriceChangeAnalytics />
          </MainComponentHoldingCard>
        )}{" "}
        {activeTab === "Wastage" && (
          <MainComponentHoldingCard>
            <WastageAnalytics />
          </MainComponentHoldingCard>
        )}
      </div>
      {/* <MobileBottomNav /> */}
    </div>
  );
}

// import DurationFilters from "@/features/dashboard/DurationFilters";
// import ConsumptionSummarry from "@/features/dashboard/ConsumptionSummarry";
// import ActionableInsights from "@/features/dashboard/ActionableInsights";
// import MonthSummary from "@/features/dashboard/MonthSummary";
// import TrendAnalysis from "@/features/dashboard/TrendAnalysis";
// import HourlyForecast from "@/features/dashboard/HourlyForecast";
// import DepartmentPerformanceAnalysis from "@/features/dashboard/DepartmentPerformanceAnalysis";
// import DepartmentAndItemConsumption from "@/features/dashboard/DepartmentAndItemConsumption";
// import ItemConsumptionEffieciency from "@/features/dashboard/ItemConsumptionEffieciency";
// import WastageAnalysis from "@/features/dashboard/WastageAnalysis";
// import CostReductionRecommendations from "@/features/dashboard/CostReductionRecommendations";
// import PriceChanges from "@/features/dashboard/PriceChanges";
// import PriceManagementRecommendations from "@/features/dashboard/PriceManagementRecommendations";
// import OutOfStock from "@/features/dashboard/OutOfStock";
// import ImmediateActionsRequired from "@/features/dashboard/ImmediateActionsRequired";
// import Recipes from "@/features/dashboard/Recipes";
// import MenuOptimizationRecommendations from "@/features/dashboard/MenuOptimizationRecommendations";
// import TopSellingProducts from "@/features/dashboard/TopSellingProducts";
// import ProductPerformanceDetails from "@/features/dashboard/ProductPerformanceDetails";
// import RevenueContributionFromProducts from "@/features/dashboard/RevenueContributionFromProducts";
// import SuppliersManagement from "@/features/dashboard/SuppliersManagement";
// import SupplierDuesThisMonth from "@/features/dashboard/SupplierDuesThisMonth";
// import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
// import MobileBottomNav from "@/features/dashboard/MobileBottomNavBar";
// import ItemConsumptionDistribution from "@/features/dashboard/ItemConsumptionDistribution";
// import ProductPerformanceByPercentile from "@/features/dashboard/ProductPerformanceByPercentile";
// import TopConsumedItems from "@/features/dashboard/TopConsumedItems";
// import DepartmentConsumption from "@/features/dashboard/KitchenPurchaseByDepartment";
// import DepartmentConsumptionChart from "@/features/dashboard/DepartmentConsumptionChart";
// import PeriodDataBreakdown from "@/features/dashboard/PeriodDataBreakDown";
// import SupplierDues from "@/features/dashboard/SupplierDues";

// export default async function Page({ params }) {
//   return (
//     <div>
//       <div className="mt-4 pt-5"></div>
//       <MainComponentHoldingCard>
//         <DurationFilters />
//       </MainComponentHoldingCard>
//       {/* <div className="d-none d-md-inline"> */}
//       <div>
//         <MainComponentHoldingCard>
//           <ConsumptionSummarry />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ActionableInsights />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <MonthSummary />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <TrendAnalysis />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <PeriodDataBreakdown />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <HourlyForecast />
//           {/* pending service call integration */}
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <DepartmentConsumption />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <DepartmentPerformanceAnalysis />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <DepartmentAndItemConsumption />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <DepartmentConsumptionChart />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ItemConsumptionEffieciency />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <TopConsumedItems />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ItemConsumptionDistribution />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <WastageAnalysis />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <CostReductionRecommendations />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <PriceChanges />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <PriceManagementRecommendations />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <OutOfStock />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ImmediateActionsRequired />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <Recipes />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <MenuOptimizationRecommendations />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <TopSellingProducts />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ProductPerformanceDetails />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <ProductPerformanceByPercentile />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <RevenueContributionFromProducts />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <SuppliersManagement />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <SupplierDuesThisMonth />
//         </MainComponentHoldingCard>
//         <MainComponentHoldingCard>
//           <SupplierDues />
//           {/* Pending service call not availbale integration */}
//         </MainComponentHoldingCard>
//       </div>
//       <MobileBottomNav />
//     </div>
//   );
// }
