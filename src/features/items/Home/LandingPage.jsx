import React from 'react'
import ItemsSummaryOverview from './ItemsSummaryOverview'
import ItemsTrendAnalysis from './ItemsTrendAnalysis'
import ItemsDepartmentAnalyticsTable from './ItemsDepartmentAnalyticsTable';
import ItemsDepartmentAnalytics from './ItemsDepartmentAnalytics';
import ItemsDepartmentDistributionChart from './ItemsDepartmentDistributionChart';
import ItemsMenuItemCnnsumptionAnalysis from './ItemsMenuItemCnnsumptionAnalysis';
import ItemsConsumptionAnalyticsOverview from './ItemsConsumptionAnalyticsOverview';

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#eeeeee",
        padding: "10px", // optional padding so content doesn't stick to edges
        borderRadius: "8px", // optional rounded look
      }}
    >
      <ItemsSummaryOverview />
      <ItemsTrendAnalysis />
      <ItemsDepartmentAnalyticsTable />
      <ItemsDepartmentAnalytics />
      <ItemsDepartmentDistributionChart />
      <ItemsMenuItemCnnsumptionAnalysis />
      <ItemsConsumptionAnalyticsOverview />
    </div>
  );
}

export default LandingPage