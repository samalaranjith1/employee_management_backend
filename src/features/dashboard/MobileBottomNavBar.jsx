"use client";
import React, { useRef, useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  FaHome,
  FaBox,
  FaTags,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

// Dashboard Components
import ActionableInsights from "@/features/dashboard/ActionableInsights";
import MonthSummary from "@/features/dashboard/MonthSummary";
import TrendAnalysis from "@/features/dashboard/TrendAnalysis";
import PeriodDataBreakDown from "@/features/dashboard/PeriodDataBreakDown";
import HourlyForecast from "@/features/dashboard/HourlyForecast";
import KitchenPurchaseByDepartment from "@/features/dashboard/KitchenPurchaseByDepartment";
import DepartmentPerformanceAnalysis from "@/features/dashboard/DepartmentPerformanceAnalysis";
import DepartmentAndItemConsumption from "@/features/dashboard/DepartmentAndItemConsumption";
import ItemConsumptionEffieciency from "@/features/dashboard/ItemConsumptionEffieciency";
import WastageAnalysis from "@/features/dashboard/WastageAnalysis";
import CostReductionRecommendations from "@/features/dashboard/CostReductionRecommendations";
import PriceChanges from "@/features/dashboard/PriceChanges";
import PriceManagementRecommendations from "@/features/dashboard/PriceManagementRecommendations";
import OutOfStock from "@/features/dashboard/OutOfStock";
import ImmediateActionsRequired from "@/features/dashboard/ImmediateActionsRequired";
import Recipes from "@/features/dashboard/Recipes";
import MenuOptimizationRecommendations from "@/features/dashboard/MenuOptimizationRecommendations";
import TopSellingProducts from "@/features/dashboard/TopSellingProducts";
import ProductPerformanceDetails from "@/features/dashboard/ProductPerformanceDetails";
import RevenueContributionFromProducts from "@/features/dashboard/RevenueContributionFromProducts";
import SuppliersManagement from "@/features/dashboard/SuppliersManagement";
import SupplierDuesThisMonth from "@/features/dashboard/SupplierDuesThisMonth";
import SupplierDues from "@/features/dashboard/SupplierDues";
import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
import ConsumptionSummarry from "./ConsumptionSummarry";
import ProductPerformanceByPercentile from "./ProductPerformanceByPercentile";
import PeriodDataBreakdown from "@/features/dashboard/PeriodDataBreakDown";
import DepartmentConsumption from "@/features/dashboard/KitchenPurchaseByDepartment";
import DepartmentConsumptionChart from "./DepartmentConsumptionChart";
import TopConsumedItems from "./TopConsumedItems";
import ItemConsumptionDistribution from "./ItemConsumptionDistribution";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function MobileBottomNav() {
  // const [activeTab, setActiveTab] = useState("home");
  const {activeTab,setActiveTab}=useDashboardContext()

  const scrollRefs = {
    home: useRef(null),
    actionable: useRef(null),
  };

  const renderTabContent = () => {
    const tabs = [
      {
        key: "home",
        content: (
          <>
            <MainComponentHoldingCard>
              <ConsumptionSummarry />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ActionableInsights />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <MonthSummary />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TrendAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PeriodDataBreakdown />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <HourlyForecast />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentConsumption />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentPerformanceAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <DepartmentConsumptionChart />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ItemConsumptionEffieciency />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TopConsumedItems />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ItemConsumptionDistribution />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <WastageAnalysis />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <CostReductionRecommendations />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PriceChanges />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <PriceManagementRecommendations />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <OutOfStock />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ImmediateActionsRequired />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <Recipes />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <MenuOptimizationRecommendations />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <TopSellingProducts />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ProductPerformanceDetails />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <ProductPerformanceByPercentile />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SuppliersManagement />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDuesThisMonth />
            </MainComponentHoldingCard>
            <MainComponentHoldingCard>
              <SupplierDues />
            </MainComponentHoldingCard>
          </>
        ),
      },
      {
        key: "actionable",
        content: (
          <MainComponentHoldingCard>
            <ActionableInsights />
          </MainComponentHoldingCard>
        ),
      },
    ];

    return tabs.map(({ key, content }) => (
      <div
        key={key}
        ref={scrollRefs[key]}
        style={{
          display: activeTab === key ? "block" : "none",
          overflowY: "auto",
          flex: 1,
          paddingBottom: "60px",
          overflowX: "hidden", // ✅ Prevent horizontal scroll inside tab content
          width: "100%", // ✅ Ensures no extra width overflow
        }}
      >
        {content}
      </div>
    ));
  };

  const navItems = [
    { key: "home", icon: <FaHome size={20} />, label: "HOME" },
    {
      key: "actionable",
      icon: <FaClipboardList size={20} />,
      label: "ACTIONABLE",
    },
  ];

  return (
    <div
      className="d-md-none"
      style={{
        height: "100vh",
        width:'100vw',
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fa",
        overflowX: "hidden", // ✅ Prevent horizontal scroll globally
        width: "100%", // ✅ Prevent unintended expansion
        maxWidth: "100vw", // ✅ Clamp width to viewport
      }}
    >
      {renderTabContent()}

      {/* Bottom Navbar */}
      <Navbar
        fixed="bottom"
        className="d-flex justify-content-around shadow-sm"
        style={{
          background: "#fff",
          borderTop: "1px solid #ddd",
          padding: "0.3rem 0",
          zIndex: 999999,
          overflowX: "hidden", // ✅ keep navbar fixed, prevent lateral shift
        }}
      >
        {navItems.map(({ key, icon, label }) => (
          <Nav.Link
            key={key}
            onClick={() => setActiveTab(key)}
            className="text-center"
            style={{
              flex: 1,
              color: activeTab === key ? "#ff5016" : "#555",
              fontSize: "0.8rem",
              whiteSpace: "nowrap", // ✅ text stays inside
            }}
          >
            <div>{icon}</div>
            <div style={{ fontSize: "0.7rem", marginTop: "2px" }}>{label}</div>
          </Nav.Link>
        ))}
      </Navbar>
    </div>
  );
}
// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { Navbar, Nav } from "react-bootstrap";
// import {
//   FaHome,
//   FaBox,
//   FaTags,
//   FaBuilding,
//   FaClipboardList,
// } from "react-icons/fa";

// // Dashboard Components
// import ActionableInsights from "@/features/dashboard/ActionableInsights";
// import MonthSummary from "@/features/dashboard/MonthSummary";
// import TrendAnalysis from "@/features/dashboard/TrendAnalysis";
// import PeriodDataBreakDown from "@/features/dashboard/PeriodDataBreakDown";
// import HourlyForecast from "@/features/dashboard/HourlyForecast";
// import KitchenPurchaseByDepartment from "@/features/dashboard/KitchenPurchaseByDepartment";
// import DepartmentPerformanceAnalysis from "@/features/dashboard/DepartmentPerformanceAnalysis";
// import DepartmentAndItemConsumption from "@/features/dashboard/DepartmentAndItemConsumption";
// import ItemConsumptionEffieciency from "@/features/dashboard/ItemConsumptionEffieciency";
// import WastageAnalysis from "@/features/dashboard/WastageAnalysis";
// import CostReductionRecommendations from "@/features/dashboard/CostReductionRecommendations";
// import PriceChanges from "@/features/dashboard/PriceChanges";
// import PriceManagementRecommendations from "@/features/dashboard/PriceManagementRecommendations";
// import OutOfStock from "@/features/dashboard/OutOfStock";
// import ImmediateActionsRequired from "@/features/dashboard/ImmediateActionsRequired";
// import Recipes from "@/features/dashboard/Recipes";
// import MenuOptimizationRecommendations from "@/features/dashboard/MenuOptimizationRecommendations";
// import TopSellingProducts from "@/features/dashboard/TopSellingProducts";
// import ProductPerformanceDetails from "@/features/dashboard/ProductPerformanceDetails";
// import RevenueContributionFromProducts from "@/features/dashboard/RevenueContributionFromProducts";
// import SuppliersManagement from "@/features/dashboard/SuppliersManagement";
// import SupplierDuesThisMonth from "@/features/dashboard/SupplierDuesThisMonth";
// import SupplierDues from "@/features/dashboard/SupplierDues";
// import MainComponentHoldingCard from "@/components/common/MainComponentHoldingCard";
// import ConsumptionSummarry from "./ConsumptionSummarry";
// import ProductPerformanceByPercentile from "./ProductPerformanceByPercentile";
// import PeriodDataBreakdown from "@/features/dashboard/PeriodDataBreakDown";
// import DepartmentConsumption from "@/features/dashboard/KitchenPurchaseByDepartment";
// import DepartmentConsumptionChart from "./DepartmentConsumptionChart";
// import TopConsumedItems from "./TopConsumedItems";
// import ItemConsumptionDistribution from "./ItemConsumptionDistribution";

// export default function MobileBottomNav() {
//   const [activeTab, setActiveTab] = useState("home");

//   const scrollRefs = {
//     home: useRef(null),
//     // items: useRef(null),
//     // products: useRef(null),
//     // departments: useRef(null),
//     actionable: useRef(null),
//   };

//   const renderTabContent = () => {
//     const tabs = [
//       {
//         key: "home",
//         content: (
//           <>
//             <MainComponentHoldingCard>
//               <ConsumptionSummarry />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ActionableInsights />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <MonthSummary />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <TrendAnalysis />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <PeriodDataBreakdown />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <HourlyForecast />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <DepartmentConsumption />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <DepartmentPerformanceAnalysis />
//             </MainComponentHoldingCard>
//             {/* <MainComponentHoldingCard>
//                           <DepartmentAndItemConsumption />
//                         </MainComponentHoldingCard> */}
//             <MainComponentHoldingCard>
//               <DepartmentConsumptionChart />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ItemConsumptionEffieciency />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <TopConsumedItems />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ItemConsumptionDistribution />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <WastageAnalysis />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <CostReductionRecommendations />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <PriceChanges />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <PriceManagementRecommendations />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <OutOfStock />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ImmediateActionsRequired />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <Recipes />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <MenuOptimizationRecommendations />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <TopSellingProducts />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ProductPerformanceDetails />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <ProductPerformanceByPercentile/>
//             </MainComponentHoldingCard>
//             {/* <MainComponentHoldingCard>
//                           <RevenueContributionFromProducts />
//                         </MainComponentHoldingCard> */}
//             <MainComponentHoldingCard>
//               <SuppliersManagement />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <SupplierDuesThisMonth />
//             </MainComponentHoldingCard>
//             <MainComponentHoldingCard>
//               <SupplierDues />
//             </MainComponentHoldingCard>
//           </>
//         ),
//       },
//       // {
//       //   key: "items",
//       //   content: (
//       //     <>
//       //       <MainComponentHoldingCard>
//       //         <ItemConsumptionEffieciency />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <DepartmentAndItemConsumption />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <PriceChanges />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <PriceManagementRecommendations />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <OutOfStock />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <SuppliersManagement />
//       //       </MainComponentHoldingCard>
//       //     </>
//       //   ),
//       // },
//       // {
//       //   key: "products",
//       //   content: (
//       //     <>
//       //       <MainComponentHoldingCard>
//       //         <TopSellingProducts />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <Recipes />
//       //       </MainComponentHoldingCard>
//       //     </>
//       //   ),
//       // },
//       // {
//       //   key: "departments",
//       //   content: (
//       //     <>
//       //       <MainComponentHoldingCard>
//       //         <KitchenPurchaseByDepartment />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <DepartmentPerformanceAnalysis />
//       //       </MainComponentHoldingCard>
//       //       <MainComponentHoldingCard>
//       //         <DepartmentAndItemConsumption />
//       //       </MainComponentHoldingCard>
//       //     </>
//       //   ),
//       // },
//       {
//         key: "actionable",
//         content: (
//           <MainComponentHoldingCard>
//             <ActionableInsights />
//           </MainComponentHoldingCard>
//         ),
//       },
//     ];

//     return tabs.map(({ key, content }) => (
//       <div
//         key={key}
//         ref={scrollRefs[key]}
//         style={{
//           display: activeTab === key ? "block" : "none",
//           overflowY: "auto",
//           flex: 1,
//           paddingBottom: "60px",
//         }}
//       >
//         {content}
//       </div>
//     ));
//   };

//   const navItems = [
//     { key: "home", icon: <FaHome size={20} />, label: "HOME" },
//     // { key: "items", icon: <FaBox size={20} />, label: "ITEMS" },
//     // { key: "products", icon: <FaTags size={20} />, label: "PRODUCTS" },
//     // {
//     //   key: "departments",
//     //   icon: <FaBuilding size={20} />,
//     //   label: "DEPARTMENTS",
//     // },
//     {
//       key: "actionable",
//       icon: <FaClipboardList size={20} />,
//       label: "ACTIONABLE",
//     },
//   ];

//   return (
//     <div
//       className="d-md-none"
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "#f8f9fa",
//       }}
//     >
//       {renderTabContent()}

//       {/* Bottom Navbar */}
//       <Navbar
//         fixed="bottom"
//         className="d-flex justify-content-around shadow-sm"
//         style={{
//           background: "#fff",
//           borderTop: "1px solid #ddd",
//           padding: "0.3rem 0",
//           zIndex: 999999,
//         }}
//       >
//         {navItems.map(({ key, icon, label }) => (
//           <Nav.Link
//             key={key}
//             onClick={() => setActiveTab(key)}
//             className="text-center"
//             style={{
//               flex: 1,
//               color: activeTab === key ? "#ff5016" : "#555",
//               fontSize: "0.8rem",
//             }}
//           >
//             <div>{icon}</div>
//             <div style={{ fontSize: "0.7rem", marginTop: "2px" }}>{label}</div>
//           </Nav.Link>
//         ))}
//       </Navbar>
//     </div>
//   );
// }
