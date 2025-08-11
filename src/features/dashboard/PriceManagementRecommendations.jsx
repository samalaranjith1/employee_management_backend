"use client";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

export default function PriceManagementRecommendations() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const recommendations = [
    {
      title: "Bulk Purchasing",
      desc: "Lock in current prices for high-impact items before increases",
    },
    {
      title: "Menu Pricing",
      desc: "Adjust menu prices strategically based on ingredient costs",
    },
    {
      title: "Substitutions",
      desc: "Find alternative ingredients with stable pricing",
    },
    {
      title: "Contracts",
      desc: "Negotiate fixed-price contracts with key suppliers",
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

  const cardStyle = {
    background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    flexShrink: 0, // Prevent cards from shrinking
  };

  const containerStyle = {
    background: "rgba(53, 8, 236, 0.05)", // light purple background
    borderRadius: "20px",
    padding: "20px",
  };

  return (
    <Card fluid className="m-2">
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
              style={{
                fontWeight: "600",
                color: "#0e87eb",
                fontSize: "16px",
              }}
            >
              Price Management Recommendations
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Strategic actions to mitigate price impact and optimize costs
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div
          className="recommendations-scroll d-flex"
          style={{
            gap: "15px",
            overflowX: "auto",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE/Edge
            WebkitOverflowScrolling: "touch", // smooth iOS scrolling
          }}
        >
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                width: isMobile ? "90vw" : `calc(25% - (3 * 15px / 4))`, // 4 cards with gaps on desktop
              }}
              className="rec-card"
            >
              <div
                style={{
                  fontWeight: "600",
                  color: "#0e87eb",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                {rec.title}
              </div>
              <div style={{ fontSize: "13px", color: "#333" }}>{rec.desc}</div>
            </div>
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

// export default function PriceManagementRecommendations() {
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
//               Price Management Recommendations
//             </div>
//             <div style={{ fontSize: "13px", color: "#666" }}>
//               Strategic actions to mitigate price impact and optimize costs
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
