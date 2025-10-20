"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import RecommendationsCard from "@/components/common/dashboard/card/RecommendationsCard";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ComponentHeader from "@/components/common/ComponentHeader";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useStockManagementRecommendations } from "@/services/recommendation-service";
import { recommendationsDatFormmatter } from "@/utils/data_formatters/dashboardFormatter";
import { IconBoltFilled } from "@tabler/icons-react";

export default function ImmediateActionsRequired() {
  const [isMobile, setIsMobile] = useState(false);
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDashboardContext();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
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
    <Card
      className="p-3"
      style={{ background: "#eafef4", borderRadius: "20px" }}
    >
      {/* ✅ Header */}
      <ComponentHeader
        title={"Immediate Actions Required"}
        description={
          "Urgent procurement recommendations to prevent service disruption"
        }
        titleColor={'#232425'}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={
          <div style={{
      background: '#06aa5f', // vivid green gradient for Figma match
      borderRadius: '12px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconBoltFilled color="#fff" size={24} />
    </div>
        }
      />

      {/* ✅ ServiceRenderer */}
      <ServiceRenderer
        queryHook={useStockManagementRecommendations}
        queryKey={[
          "stockRecommendations",
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useStockManagementRecommendations({
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
    </Card>
  );
}

// "use client";
// import RecommendationsCard from "@/components/common/card/RecommendationsCard";
// import React, { useState, useEffect } from "react";
// import { Card } from "react-bootstrap";
// import { FaExclamationTriangle, FaExpand, FaExpandAlt } from "react-icons/fa";

// export default function ImmediateActionsRequired() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile(); // Initial check
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const recommendations = [
//     {
//       title: "Critical Orders",
//       desc: "Place emergency orders for 5 critical items today",
//     },
//     {
//       title: "Supplier Contact",
//       desc: "Contact preferred suppliers for expedited delivery options",
//     },
//     {
//       title: "Menu Updates",
//       desc: "Temporarily adjust menu to accommodate stock shortages",
//     },
//     {
//       title: "Stock Monitoring",
//       desc: "Set up automated alerts for low inventory thresholds",
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
//               style={{ fontWeight: "600", color: "#0e87eb", fontSize: "16px" }}
//             >
//               Immediate Actions Required
//             </div>
//             <div style={{ fontSize: "13px", color: "#666" }}>
//               Urgent procurement recommendations to prevent service disruption
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
