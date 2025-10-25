import { act } from "react";
import CostTab from "./Cost/LandingPage";
import HomeTab from "./Home/LandingPage";
import IngredientsTab from "./Ingredients/LandingPage";
import SalesTab from "./Sales/LandingPage";
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";

function ProdcutsContent({ activeTab, dateFilter }) {
  return (
    <div
      style={{
        background: "#eee",
        borderRadius: "12px",
        // marginTop: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        // padding: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Scrollable content */}
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {activeTab === "Home" && <HomeTab />}
        {activeTab === "Sales" &&
          <div style={{ marginTop: '-0.5rem' }}>

            <MainComponentHoldingCard>
              <SalesTab />
            </MainComponentHoldingCard>
          </div>}
        {activeTab === "Ingredients" &&
          <div style={{ marginTop: '-0.5rem' }}>
            <MainComponentHoldingCard>
              <IngredientsTab />
            </MainComponentHoldingCard>
          </div>
        }
        {activeTab === "Cost" &&
          <div style={{ marginTop: '-0.5rem' }}>
            <MainComponentHoldingCard>
              <CostTab />
            </MainComponentHoldingCard>
          </div>
        }
      </div>
    </div>
  );
}

export default ProdcutsContent;
