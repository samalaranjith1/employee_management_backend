"use client";

import { useDepartmentContext } from "@/contexts/DepartmentContext";
import DepartmentClosing from "./Closing/DepartmentClosing";
import DepartmentConsumption from "./Consumption/DepartmentConsumption";
import DepartmentConsumptionForeCast from "./ConsumptionForecast/DepartmentConsumptionForeCast";
import DepartmentHome from "./Home/DepartmentHome";
import DepartmentProducts from "./Products/DepartmentProducts";
import DepartmentSales from "./Sales/DepartmentSales";
import DepartmentSalesForcecast from "./SalesForecast/DepartmentSalesForcecast";
import ActionableInsights from "../dashboard/ActionableInsights";

function DepartmentContent({ activeKey, dateFilter }) {
  const {startDate,endDate} = useDepartmentContext()
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        marginTop: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        // padding: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {console.log(activeKey,'ramarama')}
      {/* Scrollable content */}
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {activeKey.toLowerCase() === "home" && <DepartmentHome />}
        {activeKey.toLowerCase() === "actionable-insights" && (
          <ActionableInsights />)
        }
        {activeKey.toLowerCase() === "products" && <DepartmentProducts />}
        {activeKey.toLowerCase() === "sales" && <DepartmentSales />}
        {activeKey.toLowerCase() === "consumption" && <DepartmentConsumption />}
        {activeKey.toLowerCase() === "closing" && <DepartmentClosing />}
        {activeKey.toLowerCase() === "sales-forecast" && (
          <DepartmentSalesForcecast />
        )}
        {activeKey.toLowerCase() === "consumption-forecast" && (
          <DepartmentConsumptionForeCast />
        )}
      </div>
    </div>
  );
}

export default DepartmentContent;
