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

function DepartmentHome() {
  return <div>
    <DepartmentConsumptionSummary />
    <ConsumptionSummarry />
    <DepartmentHealth />
    <TrendAnalysis />
    <PeriodDataBreakdown />
    <HourlyForecast />
    <ItemConsumptionEfficiency />
    <TopConsumedItems />
    <WastageAnalysis />
    <CostReductionRecommendations />
    <RecipesDashboard />
    <MenuOptimizationRecommendations />
    <TopSellingProducts />
    <ProductPerformanceDetails />
  </div>;

}

export default DepartmentHome;