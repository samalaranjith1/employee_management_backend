import React from 'react'
import ItemsConsumptionSummaryOverview from './ItemsConsumptionSummaryOverview'
import ItemsConsumptionTrendAnalysis from './ItemsConsumptionTrendAnalysis'
import ItemsConsumptionDepartmentAnalytics from './ItemsConsumptionDepartmentAnalytics'
import ItemsConsumptionDepartmentDistributionChart from './ItemsConsumptionDepartmentDistributionChart'
import MenuItemConsumptionAnalytics from './MenuItemConsumptionAnalytics'

function LandingPage() {
  return (
    <div>
      <ItemsConsumptionSummaryOverview />
      <ItemsConsumptionTrendAnalysis />
      <ItemsConsumptionDepartmentAnalytics />
      <ItemsConsumptionDepartmentDistributionChart />
      {/* api is not available for below component */}
      <MenuItemConsumptionAnalytics />
    </div>
  )
}

export default LandingPage