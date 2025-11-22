import React from 'react'
import ItemsSummaryOverview from './ItemsSummaryOverview'
import ItemsTrendAnalysis from './ItemsTrendAnalysis'
import ItemsDepartmentAnalyticsTable from './ItemsDepartmentAnalyticsTable';
import ItemsDepartmentAnalytics from './ItemsDepartmentAnalytics';
import ItemsDepartmentDistributionChart from './ItemsDepartmentDistributionChart';
import ItemsConsumptionAnalyticsOverview from './ItemsConsumptionAnalyticsOverview';
import ItemsMenuItemConsumptionAnalysis from './ItemsMenuItemConsumptionAnalysis';
import MainComponentHoldingCard from '@/components/common/MainComponentHoldingCard';

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#eee",
        // padding: "10px", // optional padding so content doesn't stick to edges
        borderRadius: "8px", // optional rounded look
      }}
    >
      <ItemsSummaryOverview />
      <ItemsTrendAnalysis />
      {/* for below api is not avilable */}
      {/* <ItemsDepartmentAnalyticsTable /> */}
      <ItemsDepartmentAnalytics />
      <ItemsDepartmentDistributionChart />
      <ItemsMenuItemConsumptionAnalysis />
      <ItemsConsumptionAnalyticsOverview />
    </div>
  );
}

export default LandingPage