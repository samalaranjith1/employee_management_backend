import React from "react";
import ItemsProductsMenuItemListConsumptionDistribution from "./ItemsProductsMenuItemListConsumptionDistribution";
import ItemsMenuItemConsumptionAnalysis from "../Home/ItemsMenuItemConsumptionAnalysis";

function LandingPage() {
  return (
    <div>
      <ItemsMenuItemConsumptionAnalysis />
      {/* we needs to adjust below component styling as above or do we needs to implement above 
implementation in below component */}
      {/* <ItemsProductsMenuItemListConsumptionDistribution /> */}
    </div>
  );
}

export default LandingPage;
