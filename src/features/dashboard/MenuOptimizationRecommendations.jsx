"use client";
import RecommendationsCard from "@/components/common/dashboard/card/RecommendationsCard";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useRecipeManagementRecommendations } from "@/services/recommendation-service";
import { recommendationsDatFormmatter } from "@/utils/data_formatters/dashboardFormatter";
import { IconTilde } from "@tabler/icons-react";

export default function MenuOptimizationRecommendations() {
  const [isMobile, setIsMobile] = useState(false);
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDashboardContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Initial run
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      style={{ background: "#eef3ff" }}
    >
      {/* ✅ Header */}
      <ComponentHeader
        title={"Menu Optimization Recommendations"}
        description={"Strategic actions to improve overall profitability"}
        titleColor={'#232425'}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={ <div style={{
      background: '#435ee9', // blue gradient for Figma look
      borderRadius: '16=2px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconTilde stroke={2} color="#fff" size={24} />
    </div>}
      />

      {/* ✅ ServiceRenderer */}
      <ServiceRenderer
        queryHook={useRecipeManagementRecommendations}
        queryKey={[
          "recipeRecommendations",
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useRecipeManagementRecommendations({
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

      {/* Hide scrollbar visually for Webkit browsers */}
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

// export default function MenuOptimizationRecommendations() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile(); // Initial run
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const recommendations = [
//     {
//       title: "Promote High Margin",
//       desc: "Feature high-margin items like Dal Makhani and Butter Chicken prominently",
//     },
//     {
//       title: "Cost Reduction",
//       desc: "Negotiate better rates for premium ingredients like mutton and pomfret",
//     },
//     {
//       title: "Recipe Optimization",
//       desc: "Modify recipes to reduce expensive spices and premium ingredients",
//     },
//     {
//       title: "Menu Strategy",
//       desc: "Consider combo meals to pair high-margin items with premium dishes",
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
//     flexShrink: 0,
//   };

//   const containerStyle = {
//     background: "rgba(53, 8, 236, 0.05)",
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
//               Menu Optimization Recommendations
//             </div>
//             <div style={{ fontSize: "13px", color: "#666" }}>
//               Strategic actions to improve overall profitability
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
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//             WebkitOverflowScrolling: "touch",
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
