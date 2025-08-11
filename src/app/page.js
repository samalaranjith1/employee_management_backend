"use client"
import Image from "next/image";
import styles from "./page.module.css";
import DurationFilters from "@/features/dashboard/DurationFilters";
import ConsumptionSummarry from "@/features/dashboard/ConsumptionSummarry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
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

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {/* <main className={styles.main}> */}
      <div className="mt-4 pt-5"></div>
      <DurationFilters
        onChange={({ startDate, endDate }) => {
          console.log("Selected range:", startDate, endDate);
        }}
      />
      <ConsumptionSummarry />
      <ActionableInsights />
      <MonthSummary />
      <TrendAnalysis />
      <PeriodDataBreakDown />
      <HourlyForecast />
      <KitchenPurchaseByDepartment />
      <DepartmentPerformanceAnalysis />
      <DepartmentAndItemConsumption />
      <ItemConsumptionEffieciency />
      <WastageAnalysis />
      <CostReductionRecommendations />
      <PriceChanges />
      <PriceManagementRecommendations />
      <OutOfStock />
      <ImmediateActionsRequired />
      <Recipes />
      <MenuOptimizationRecommendations />
      <TopSellingProducts />
      <ProductPerformanceDetails />
      <RevenueContributionFromProducts />
      <SuppliersManagement />
      <SupplierDuesThisMonth />
      <SupplierDues />
    </QueryClientProvider>
  );
}
