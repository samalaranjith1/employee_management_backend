"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import {
  FaTrashAlt,
  FaBoxOpen,
  FaExclamationTriangle,
  FaTimesCircle,
  FaShoppingBag,
} from "react-icons/fa";

import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useWasteSummary } from "@/services/waste-management-service";
import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";

import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
import WastageAnalysisTable from "@/components/common/dashboard/TablesSort/WastageAnalysisTable";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

export default function WastageAnalysis() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);
  const router =useRouter()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Card style={{ background: "#fff" }} className="p-3 rounded-4 shadow-sm">
      <ComponentHeader
        title="Wastage Analysis"
        description="Track and minimize food waste across all categories"
        titleColor="rgba(31, 28, 27, 1)"
        cardBgColor="none"
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaTrashAlt color="#0aa4b3" size={24} />}
      />

      <ServiceRenderer
        queryHook={useWasteSummary}
        queryKey={["wasteSummary", { startdt: startDate, enddt: endDate }]}
        queryFn={() =>
          useWasteSummary({ startdt: startDate, enddt: endDate }).queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate,outlet:1,userId:7 }]}
        formatter={wastageAnalysisDataFormatter}
        shimmerCount={3}
      >
        {(formattedData) => (
          <>
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleNavigation({
                  router,
                  url: "sp/wastage_analytics",
                  params: {startDate:startDate,endDate:endDate},
                })
              }
            >
              <WastageAnalysisTopCards
                statCard={{
                  // borderRadius: 20,
                  // padding: 20,
                  background: "#fff",
                  // boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  minWidth: "23vw",
                  flex: "0 0 auto",
                }}
                scrollRef={myScrollRef}
                cardsData={formattedData?.cardsData}
              />
            </div>

            <WastageAnalysisTable
              expiredItems={formattedData?.expiredItems}
              expiredProducts={formattedData?.expiredProducts}
              rawMaterialWastage={formattedData?.rawMaterialWastage}
              tableCardStyle={{
                borderRadius: 20,
                padding: 10,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                height: "300px",
              }}
              scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
            />
          </>
        )}
      </ServiceRenderer>
    </Card>
  );
}
// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import { Card } from "react-bootstrap";
// import { FaTrashAlt } from "react-icons/fa";

// import ComponentHeader from "@/components/common/ComponentHeader";
// import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
// import WastageAnalysisTable from "@/components/common/dashboard/TablesSort/WastageAnalysisTable";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useWasteSummary } from "@/services/waste-management-service";
// import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";

// export default function WastageAnalysis() {
//   const { startDate, endDate } = useDashboardContext();
//   const myScrollRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768); // Bootstrap "md" breakpoint
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   const cardStyle = {
//     borderRadius: "20px",
//     padding: "20px",
//     background: "#fff",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     minWidth: "23vw",
//     flex: "0 0 auto",
//   };

//   const statCard = (bg, icon, title, value, sub) => (
//     <Card
//       style={{
//         ...cardStyle,
//         background: bg,
//         color: "#fff",
//         width: isMobile ? "90vw" : "23vw",
//       }}
//     >
//       <Card.Body className="d-flex align-items-center justify-content-between">
//         <div>
//           <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
//           <h4 style={{ margin: "5px 0" }}>{value}</h4>
//           {sub && <div style={{ fontSize: "13px", opacity: 0.8 }}>{sub}</div>}
//         </div>
//         <div style={{ fontSize: "26px" }}>{icon}</div>
//       </Card.Body>
//     </Card>
//   );

//   const tableCardStyle = {
//     ...cardStyle,
//     padding: "10px",
//     display: "flex",
//     flexDirection: "column",
//     height: "300px",
//   };

//   const scrollBodyStyle = {
//     flex: 1,
//     overflowY: "auto",
//   };

//   return (
//     <Card style={{ background: "#fff" }} className="p-2">
//       <ComponentHeader
//         title={"Wastage Analysis"}
//         description={"Track and minimize food waste across all categories"}
//         titleColor={"#0aa4b3 fs-4"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaTrashAlt color="#0aa4b3" size={24} />}
//         text={""}
//       />

//       <ServiceRenderer
//         queryHook={useWasteSummary}
//         queryKey={["wasteSummary", { startdt: startDate, enddt: endDate }]}
//         queryFn={() =>
//           useWasteSummary({ startdt: startDate, enddt: endDate }).queryFn
//         }
//         queryArgs={[{ startdt: startDate, enddt: endDate }]}
//         formatter={wastageAnalysisDataFormatter}
//         shimmerCount={3}
//       >
//         {(formattedData, refetch) => (
//           <>
//             {/* Stat Cards */}
//             <WastageAnalysisTopCards
//               statCard={statCard}
//               scrollRef={myScrollRef}
//               cardsData={formattedData?.cardsData}
//             />

//             {/* Hide scrollbar for Webkit */}
//             <style>
//               {`
//                 div::-webkit-scrollbar {
//                   display: none;
//                 }
//               `}
//             </style>

//             {/* Tables */}
//             <WastageAnalysisTable
//               expiredItems={formattedData?.expiredItems}
//               expiredProducts={formattedData?.expiredProducts}
//               rawMaterialWastage={formattedData?.rawMaterialWastage}
//               tableCardStyle={tableCardStyle}
//               scrollBodyStyle={scrollBodyStyle}
//             />
//           </>
//         )}
//       </ServiceRenderer>
//     </Card>
//   );
// }

// // "use client";
// // import WastageAnalysisTopCards from "@/components/common/card/WastageAnalysisTopCards";
// // import ComponentHeader from "@/components/common/ComponentHeader";
// // import WastageAnalysisTable from "@/components/common/TablesSort/WastageAnalysisTable";
// // import React, { useRef } from "react";
// // import { useState, useEffect } from "react";
// // import {  Card } from "react-bootstrap";
// // import {
// //   FaTrashAlt,
// //   FaDrumstickBite,
// //   FaLeaf,
// //   FaFish,
// //   FaAppleAlt,
// // } from "react-icons/fa";

// // export default function WastageAnalysis() {
// //     const [isMobile, setIsMobile] = useState(false);

// //     useEffect(() => {
// //       const checkScreen = () => setIsMobile(window.innerWidth < 768); // Bootstrap "md" breakpoint
// //       checkScreen();
// //       window.addEventListener("resize", checkScreen);
// //       return () => window.removeEventListener("resize", checkScreen);
// //     }, []);
// //   const rawMaterialWastage = [
// //     {
// //       name: "Chicken Breast",
// //       category: "Poultry",
// //       qty: "12kg",
// //       price: 220,
// //       total: 2640,
// //       icon: <FaDrumstickBite />,
// //     },
// //     {
// //       name: "Basmati Rice",
// //       category: "Grains",
// //       qty: "8kg",
// //       price: 85,
// //       total: 680,
// //       icon: <FaLeaf />,
// //     },
// //     {
// //       name: "Fresh Salmon",
// //       category: "Seafood",
// //       qty: "5kg",
// //       price: 450,
// //       total: 2250,
// //       icon: <FaFish />,
// //     },
// //     {
// //       name: "Onions",
// //       category: "Vegetables",
// //       qty: "15kg",
// //       price: 35,
// //       total: 525,
// //       icon: <FaAppleAlt />,
// //     },
// //   ];

// //   const expiredItems = [
// //     {
// //       name: "Fresh Milk",
// //       category: "Dairy",
// //       qty: "10liters",
// //       price: 45,
// //       total: 450,
// //       date: "2025-01-05",
// //     },
// //     {
// //       name: "Yogurt Cups",
// //       category: "Dairy",
// //       qty: "24pieces",
// //       price: 8,
// //       total: 192,
// //       date: "2025-01-04",
// //     },
// //     {
// //       name: "Bread Loaves",
// //       category: "Bakery",
// //       qty: "6pieces",
// //       price: 25,
// //       total: 150,
// //       date: "2025-01-03",
// //     },
// //     {
// //       name: "Fresh Cheese",
// //       category: "Dairy",
// //       qty: "4kg",
// //       price: 95,
// //       total: 380,
// //       date: "2025-01-02",
// //     },
// //   ];

// //   const expiredProducts = [
// //     {
// //       name: "Chicken Biryani",
// //       category: "South Indian",
// //       price: 35,
// //       total: 280,
// //       qty: "8 portions",
// //       date: "2025-01-07",
// //     },
// //     {
// //       name: "Marinated Chicken",
// //       category: "Tandoor",
// //       price: 80,
// //       total: 240,
// //       qty: "3 kg",
// //       date: "2025-01-06",
// //     },
// //     {
// //       name: "Paneer Curry",
// //       category: "North Indian",
// //       price: 45,
// //       total: 225,
// //       qty: "5 portions",
// //       date: "2025-01-07",
// //     },
// //     {
// //       name: "Fried Rice",
// //       category: "Indo-Chinese",
// //       price: 60,
// //       total: 300,
// //       qty: "5 portions",
// //       date: "2025-01-07",
// //     },
// //   ];

// //   const cardStyle = {
// //     borderRadius: "20px",
// //     padding: "20px",
// //     background: "#fff",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //     minWidth: "23vw",
// //     flex: "0 0 auto",
// //   };

// //   const statCard = (bg, icon, title, value, sub) => (
// //     <Card style={{ ...cardStyle, background: bg, color: "#fff" ,width:isMobile?'90vw':'23vw'}} >
// //       <Card.Body className="d-flex align-items-center justify-content-between">
// //         <div>
// //           <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
// //           <h4 style={{ margin: "5px 0" }}>{value}</h4>
// //           {sub && <div style={{ fontSize: "13px", opacity: 0.8 }}>{sub}</div>}
// //         </div>
// //         <div style={{ fontSize: "26px" }}>{icon}</div>
// //       </Card.Body>
// //     </Card>
// //   );

// //   const tableCardStyle = {
// //     ...cardStyle,
// //     padding: "10px",
// //     display: "flex",
// //     flexDirection: "column",
// //     height: "300px",
// //   };

// //   const scrollBodyStyle = {
// //     flex: 1,
// //     overflowY: "auto",
// //   };

// //   const myScrollRef = useRef(null);
// //   return (
// //     <Card style={{ background: "#fff" }} className="p-2">
// //       <ComponentHeader
// //         title={"Wastage Analysis"}
// //         description={"Track and minimize food waste across all categories"}
// //         titleColor={"#0aa4b3 fs-4"}
// //         cardBgColor={"none"}
// //         isShowArrows={true}
// //         scrollRef={myScrollRef}
// //         isExpandable={true}
// //         titleIcon={<FaTrashAlt color="#0aa4b3" size={24} />}
// //         text={""}
// //       />

// //       {/* Stat Cards */}
// //       <WastageAnalysisTopCards statCard={statCard}
// //       scrollRef={myScrollRef} />

// //       {/* Hide scrollbar for Webkit */}
// //       <style>
// //         {`
// //           div::-webkit-scrollbar {
// //             display: none;
// //           }
// //         `}
// //       </style>

// //       {/* Tables */}
// //       <WastageAnalysisTable
// //         expiredItems={expiredItems}
// //         expiredProducts={expiredProducts}
// //         rawMaterialWastage={rawMaterialWastage}
// //         tableCardStyle={tableCardStyle}
// //         scrollBodyStyle={scrollBodyStyle}
// //       />
// //     </Card>
// //   );
// // }
