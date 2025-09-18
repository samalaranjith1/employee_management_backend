import React from "react";
import ItemsConsumptionSummaryOverview from "./ItemsConsumptionSummaryOverview";
import ItemsConsumptionTrendAnalysis from "./ItemsConsumptionTrendAnalysis";
import ItemsConsumptionDepartmentAnalytics from "./ItemsConsumptionDepartmentAnalytics";
import ItemsConsumptionDepartmentDistributionChart from "./ItemsConsumptionDepartmentDistributionChart";
import MenuItemConsumptionAnalytics from "./MenuItemConsumptionAnalytics";
import ItemsDepartmentDistributionChart from "../Home/ItemsDepartmentDistributionChart";
import ItemsMenuItemConsumptionAnalysis from "../Home/ItemsMenuItemConsumptionAnalysis";

function LandingPage() {
  return (
    <div>
      <ItemsConsumptionSummaryOverview />
      <ItemsConsumptionTrendAnalysis />
      <ItemsConsumptionDepartmentAnalytics />
      <ItemsDepartmentDistributionChart />
      <ItemsMenuItemConsumptionAnalysis />
      {/* <ItemsConsumptionDepartmentDistributionChart /> */}
      {/* api is not available for below component */}
      {/* <MenuItemConsumptionAnalytics /> */}
    </div>
  );
}

export default LandingPage;
