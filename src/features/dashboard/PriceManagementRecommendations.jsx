"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import RecommendationsCard from "@/components/common/dashboard/card/RecommendationsCard";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ComponentHeader from "@/components/common/ComponentHeader";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { usePriceManagementRecommendations } from "@/services/recommendation-service";
import { recommendationsDatFormmatter } from "@/utils/data_formatters/dashboardFormatter";
import { IconCoinRupee } from "@tabler/icons-react";

export default function PriceManagementRecommendations() {
  const [isMobile, setIsMobile] = useState(false);
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDashboardContext();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textColor = "#0e87eb";
  const cardStyle = {
    background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    flexShrink: 0,
  };

  return (
    <div
      className="p-3"
      style={{ background: "#f5efff" }}
    >
      {/* ✅ Header */}
      <ComponentHeader
        title={"Price Management Recommendations"}
        description={
          "Strategic actions to mitigate price impact and optimize costs"
        }
        titleColor={"#232425"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={
          <div style={{
      background: '#883cdf', // purple gradient for Figma match
      borderRadius: '12px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconCoinRupee stroke={2} color="#fff" size={20} />
    </div>
        }
      />

      {/* ✅ ServiceRenderer */}
      <ServiceRenderer
        queryHook={usePriceManagementRecommendations}
        queryKey={[
          "priceRecommendations",
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          usePriceManagementRecommendations({
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate }]}
        formatter={recommendationsDatFormmatter}
        shimmerCount={3}
      >
        {(recommendations, refetch) => (
          <div
            ref={myScrollRef}
            className="recommendations-scroll d-flex"
            style={{
              gap: "15px",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {recommendations?.map((rec, idx) => (
              <RecommendationsCard
                idx={idx}
                rec={rec}
                key={idx}
                cardStyle={cardStyle}
                isMobile={isMobile}
                textColor={textColor}
              />
            ))}
          </div>
        )}
      </ServiceRenderer>

      {/* ✅ Hide scrollbar (webkit) */}
      <style>{`
        .recommendations-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// "use client";
// import RecommendationsCard from "@/components/common/card/RecommendationsCard";
// import React, { useState, useEffect } from "react";
// import { Card } from "react-bootstrap";
// import { FaExclamationTriangle, FaExpand } from "react-icons/fa";

// export default function PriceManagementRecommendations() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize(); // set initial
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const recommendations = [
//     {
//       title: "Bulk Purchasing",
//       desc: "Lock in current prices for high-impact items before increases",
//     },
//     {
//       title: "Menu Pricing",
//       desc: "Adjust menu prices strategically based on ingredient costs",
//     },
//     {
//       title: "Substitutions",
//       desc: "Find alternative ingredients with stable pricing",
//     },
//     {
//       title: "Contracts",
//       desc: "Negotiate fixed-price contracts with key suppliers",
//     },
//     {
//       title: "Supplier Review",
//       desc: "Negotiate with suppliers for smaller delivery batches",
//     },
//     {
//       title: "Waste Reduction",
//       desc: "Composting food scraps can reduce waste disposal costs by 15%",
//     },
//     {
//       title: "Energy Efficiency",
//       desc: "Switching to LED lighting saves 20% on electricity bills",
//     },
//   ];

//   const textColor = "#0e87eb";
//   const cardStyle = {
//     background: "#fff",
//     borderRadius: "15px",
//     padding: "20px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     flexShrink: 0, // Prevent cards from shrinking
//   };

//   const containerStyle = {
//     background: "rgba(53, 8, 236, 0.05)", // light purple background
//     borderRadius: "20px",
//     padding: "20px",
//   };

//   return (
//     <Card className="m-2">
//       <div style={containerStyle}>
//         {/* Header */}
//         <div className="d-flex align-items-center mb-3">
//           <FaExclamationTriangle
//             style={{
//               color: "#0e87eb",
//               fontSize: "20px",
//               marginRight: "10px",
//             }}
//           />
//           <div>
//             <div
//               style={{
//                 fontWeight: "600",
//                 color: "#0e87eb",
//                 fontSize: "16px",
//               }}
//             >
//               Price Management Recommendations
//             </div>
//             <div style={{ fontSize: "13px", color: "#666" }}>
//               Strategic actions to mitigate price impact and optimize costs
//             </div>
//           </div>
//           <div className="ms-auto">
//             <FaExpand color="#0e87eb" size={24} />
//           </div>
//         </div>

//         {/* Horizontal Scrollable Cards */}
//         <div
//           className="recommendations-scroll d-flex"
//           style={{
//             gap: "15px",
//             overflowX: "auto",
//             scrollbarWidth: "none", // For Firefox
//             msOverflowStyle: "none", // For IE/Edge
//             WebkitOverflowScrolling: "touch", // smooth iOS scrolling
//           }}
//         >
//           {recommendations.map((rec, idx) => (
//             <RecommendationsCard
//               idx={idx}
//               rec={rec}
//               key={idx}
//               cardStyle={cardStyle}
//               isMobile={isMobile}
//               textColor={textColor}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Hide scrollbar visually for Webkit browsers */}
//       <style>{`
//         .recommendations-scroll::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </Card>
//   );
// }
