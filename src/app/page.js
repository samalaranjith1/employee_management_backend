"use client";
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
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
import MobileBottomNav from "@/features/dashboard/MobileBottomNavBar";
import ItemConsumptionDistribution from "@/features/dashboard/ItemConsumptionDistribution";
import ProductPerformanceByPercentile from "@/features/dashboard/ProductPerformanceByPercentile";
import TopConsumedItems from "@/features/dashboard/TopConsumedItems";
import DepartmentConsumption from "@/features/dashboard/KitchenPurchaseByDepartment";
import DepartmentConsumptionChart from "@/features/dashboard/DepartmentConsumptionChart";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mt-4 pt-5"></div>
      <MainComponentHoldingCard>
        <DurationFilters />
      </MainComponentHoldingCard>
      <div className="d-none d-md-inline">
        {/* <div> */}
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
        <MainComponentHoldingCard>
          <KitchenPurchaseByDepartment />
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
      </div>
      <MobileBottomNav />
    </QueryClientProvider>
  );
}
