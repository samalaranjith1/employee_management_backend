import React from "react";
import ItemsConsumptionSummaryOverview from "./ItemsConsumptionSummaryOverview";
import ItemsConsumptionTrendAnalysis from "./ItemsConsumptionTrendAnalysis";
import ItemsConsumptionDepartmentAnalytics from "./ItemsConsumptionDepartmentAnalytics";
import ItemsConsumptionDepartmentDistributionChart from "./ItemsConsumptionDepartmentDistributionChart";
import MenuItemConsumptionAnalytics from "./MenuItemConsumptionAnalytics";
import ItemsDepartmentDistributionChart from "../Home/ItemsDepartmentDistributionChart";
import ItemsMenuItemConsumptionAnalysis from "../Home/ItemsMenuItemConsumptionAnalysis";
import ItemsTrendAnalysis from "../Home/ItemsTrendAnalysis";
import ItemsDepartmentAnalytics from "../Home/ItemsDepartmentAnalytics";
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#eee' }}>
      <MainComponentHoldingCard>
        <ItemsConsumptionSummaryOverview />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>

        <ItemsTrendAnalysis />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>

        <ItemsDepartmentAnalytics />
      </MainComponentHoldingCard>


      {/* <ItemsConsumptionTrendAnalysis /> */}
      {/* <ItemsConsumptionDepartmentAnalytics /> */}
      <MainComponentHoldingCard>

        <ItemsDepartmentDistributionChart />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>

        <ItemsMenuItemConsumptionAnalysis />
      </MainComponentHoldingCard>
      {/* <ItemsConsumptionDepartmentDistributionChart /> */}
      {/* api is not available for below component */}
      {/* <MenuItemConsumptionAnalytics /> */}
    </div>
  );
}

export default LandingPage;
