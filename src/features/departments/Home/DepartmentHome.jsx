import ConsumptionSummarry from '@/features/dashboard/ConsumptionSummarry';
import React from 'react'
import DepartmentHealth from './DepartmentHealth';
import TrendAnalysis from '@/features/dashboard/TrendAnalysis';
import PeriodDataBreakdown from '@/features/dashboard/PeriodDataBreakDown';
import HourlyForecast from '@/features/dashboard/HourlyForecast';
import ItemConsumptionEfficiency from '@/features/dashboard/ItemConsumptionEffieciency';
import TopConsumedItems from '@/features/dashboard/TopConsumedItems';
import WastageAnalysis from '@/features/dashboard/WastageAnalysis';
import CostReductionRecommendations from '@/features/dashboard/CostReductionRecommendations';
import RecipesDashboard from '@/features/dashboard/Recipes';
import MenuOptimizationRecommendations from '@/features/dashboard/MenuOptimizationRecommendations';
import TopSellingProducts from '@/features/dashboard/TopSellingProducts';
import ProductPerformanceDetails from '@/features/dashboard/ProductPerformanceDetails';
import DepartmentConsumptionSummary from './DepartmentConsumptionSummary';
import DepartmentTrendAnalysis from './DepartmentTrendAnlysis';
import DepartmentPeriodDropDown from './DepartmentPeriodDropDown';
import ItemConsumptionEfficiency1 from "./ItemConsumptionEfficiency";
import MainComponentHoldingCard from '@/components/common/MainComponentHoldingCard';

function DepartmentHome() {
  return <div>
    <MainComponentHoldingCard>
      <DepartmentConsumptionSummary />
    </MainComponentHoldingCard>
    {/* <ConsumptionSummarry /> */}
    <MainComponentHoldingCard>
      <DepartmentHealth />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <DepartmentTrendAnalysis />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <DepartmentPeriodDropDown />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <HourlyForecast />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <ItemConsumptionEfficiency1 />
    </MainComponentHoldingCard>

    {/* <TrendAnalysis /> */}
    {/* <PeriodDataBreakdown /> */}
    {/* <ItemConsumptionEfficiency /> */}
    <MainComponentHoldingCard>
      <TopConsumedItems />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <WastageAnalysis />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <CostReductionRecommendations />
    </MainComponentHoldingCard>
    <MainComponentHoldingCard>
      <RecipesDashboard />
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
  </div>;
}

export default DepartmentHome;