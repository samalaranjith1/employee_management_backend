import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
import SuppliersHomePage from "./Home/LandingPage";
import ItemsTab from "./Items/LandingPage";

function SuppliersContent({ activeTab, dateFilter }) {
  return (
    <div
      style={{
        background: "#fff",
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
        {activeTab === "Home" && <SuppliersHomePage />}
        {activeTab === "Items" && 
         <div style={{marginTop:'-0.5rem'}}>
      <MainComponentHoldingCard>
        <ItemsTab />
      </MainComponentHoldingCard>
      </div>}
      </div>
    </div>
  );
}

export default SuppliersContent;
