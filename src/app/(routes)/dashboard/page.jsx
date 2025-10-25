"use client";

import { act, useState } from "react";
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
import SalesAnalytics from "../sp/sales_analytics/page";
import ConsumptionHistoryAnalysis from "../sp/consumption_analytics/page";
import PurchaseAnalytics from "../sp/purchase_analytics/page";
import RecipeInsights from "../sp/reciepe_analytics/page";
import WarehouseStockAnalytics from "../sp/ware_house_analytics/page";
import ItemPriceChangeAnalytics from "../sp/item_price_change_analytics/page";
import ConsumptionClosingAnalysis from "../sp/consumption_closing_analytics/page";
import WastageAnalytics from "../sp/wastage_analytics/page";
import SecondNavBar from "./@Navbar/page";
import { useDashboardContext } from "@/contexts/DashboardContext";
import MobileDurationFilters from "@/features/dashboard/MobileDurationFilter";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const useAppContext = useDashboardContext()

  const tabs = [
    "Dashboard",
    "Sales",
    "Consumption",
    "Purchase",
    "Recipe",
    "Wastage",
    "Closing",
    "Item Price",
    "Stock",
  ];

  return (
    <div>
      {/* <div className="mt-4 pt-5"></div> */}
      {/* ✅ Duration filter stays outside tabs */}
      <div className="d-md-none d-sm-flex">
        {/* <DurationFilters useAppContext={useAppContext}/> */}
        {/* <MobileDurationFilters useAppContext={useAppContext} /> */}
      </div>
  
      <SecondNavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} useAppContext={useAppContext} />
 
      {/* ✅ Tab Content */ }
      <div className="mt-2">
        {activeTab === "Dashboard" && (
      <div className="d-none d-md-inline">
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
            {/* <MainComponentHoldingCard>
              <RevenueContributionFromProducts />
            </MainComponentHoldingCard> */}
            <MainComponentHoldingCard>
              <SuppliersManagement />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDuesThisMonth />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDues />
            </MainComponentHoldingCard>
          </div>
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
      <MobileBottomNav />
    </div >
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
