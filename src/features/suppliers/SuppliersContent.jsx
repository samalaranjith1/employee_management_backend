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
        {activeTab === "Items" && <ItemsTab />}
      </div>
    </div>
  );
}

export default SuppliersContent;
