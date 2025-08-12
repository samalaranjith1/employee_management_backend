"use client";
import RecommendationsCard from "@/components/common/Cards/RecommendationsCard";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ImmediateActionsRequired() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const recommendations = [
    {
      title: "Critical Orders",
      desc: "Place emergency orders for 5 critical items today",
    },
    {
      title: "Supplier Contact",
      desc: "Contact preferred suppliers for expedited delivery options",
    },
    {
      title: "Menu Updates",
      desc: "Temporarily adjust menu to accommodate stock shortages",
    },
    {
      title: "Stock Monitoring",
      desc: "Set up automated alerts for low inventory thresholds",
    },
    {
      title: "Supplier Review",
      desc: "Negotiate with suppliers for smaller delivery batches",
    },
    {
      title: "Waste Reduction",
      desc: "Composting food scraps can reduce waste disposal costs by 15%",
    },
    {
      title: "Energy Efficiency",
      desc: "Switching to LED lighting saves 20% on electricity bills",
    },
  ];

  const textColor="#0e87eb";
  const cardStyle = {
    background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    flexShrink: 0,
  };

  const containerStyle = {
    background: "rgba(53, 8, 236, 0.05)",
    borderRadius: "20px",
    padding: "20px",
  };

  return (
    <Card className="m-2">
      <div style={containerStyle}>
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <FaExclamationTriangle
            style={{
              color: "#0e87eb",
              fontSize: "20px",
              marginRight: "10px",
            }}
          />
          <div>
            <div
              style={{ fontWeight: "600", color: "#0e87eb", fontSize: "16px" }}
            >
              Immediate Actions Required
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Urgent procurement recommendations to prevent service disruption
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div
          className="recommendations-scroll d-flex"
          style={{
            gap: "15px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {recommendations.map((rec, idx) => (
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
      </div>

      {/* Hide scrollbar visually for Webkit browsers */}
      <style>{`
        .recommendations-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Card>
  );
}

// "use client";
// import React from "react";
// import { Card, Container } from "react-bootstrap";
// import { FaExclamationTriangle } from "react-icons/fa";

// export default function ImmediateActionsRequired() {
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
//     <Card fluid className="m-2">
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
//               Immediate Actions Required
//             </div>
//             <div style={{ fontSize: "13px", color: "#666" }}>
//               Urgent procurement recommendations to prevent service disruption
//             </div>
//           </div>
//         </div>

//         {/* Horizontal Scrollable Cards */}
//         <div
//           className="recommendations-scroll d-flex"
//           style={{
//             gap: "15px",
//             overflowX: "auto",
//             scrollbarWidth: "none", // For Firefox
//             msOverflowStyle: "none", // For Internet Explorer/Edge
//             WebkitOverflowScrolling: "touch", // For smooth iOS scrolling
//           }}
//         >
//           {recommendations.map((rec, idx) => (
//             <div
//               key={idx}
//               style={{
//                 ...cardStyle,
//                 // Responsive width calculation:
//                 // For mobile (less than 768px), show 1 card (90% width of parent)
//                 // For desktop (768px and above), show 4 cards with gaps
//                 width:
//                   window.innerWidth < 768
//                     ? "90vw"
//                     : `calc(25% - (3 * 15px / 4))`, // Adjusted for 4 cards + gaps
//               }}
//               className="rec-card"
//             >
//               <div
//                 style={{
//                   fontWeight: "600",
//                   color: "#0e87eb",
//                   fontSize: "15px",
//                   marginBottom: "5px",
//                 }}
//               >
//                 {rec.title}
//               </div>
//               <div style={{ fontSize: "13px", color: "#333" }}>{rec.desc}</div>
//             </div>
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
