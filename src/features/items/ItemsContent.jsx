
import StockTrends from "./StockTrends/LandingPage";
import Consumption from "./Consumption/LandingPage";
import Insights from "./Insights/LandingPage";
import Purchase from "./Purchase/LandingPage";
import PriceTrends from "./PriceTrends/LandingPage";
import Products from "./Products/LandingPage";
import ItemsHome from "./Home/LandingPage";

function ItemsContent({ activeTab, dateFilter }) {
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
        {activeTab === "Home" && <ItemsHome />}
        {activeTab === "Insights" && <Insights />}
        {activeTab === "Purchase" && <Purchase />}
        {activeTab === "Consumption" && <Consumption />}
        {activeTab === "Products" && <Products />}
        {activeTab === "Price Trends" && <PriceTrends />}
        {activeTab === "Stock Trends" && <StockTrends />}
      </div>
    </div>
  );
}

export default ItemsContent;
