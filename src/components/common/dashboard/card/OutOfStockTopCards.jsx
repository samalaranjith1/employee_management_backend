"use client";
import React from "react";
import CommonCard from "./CommonCard";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function OutOfStockTopCards({ cardsData = [], cardBase, scrollRef }) {
  const {isMobile} = useDashboardContext()
  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        // padding: "1rem 0",
      }}
    >
      {cardsData.map((card, idx) => (
        <div
        style={{ minWidth: isMobile ?'95%':'32%',
          backgroundColor:card.bgColor,
          color:card.textColor,
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          flexShrink: 0,
         }}
          widthDesktop="30%"
          minWidth="30%"
          key={idx}
          bgColor={card.bgColor}
          textColor={card.textColor}
          // style={cardBase}
          maxHeight="130px"
        >
          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
            {/* Left column */}
            <div>
              <h6 style={{ fontWeight: "600", fontSize: '14px', color: '#6d6d6d' }}>{card.title}</h6>
              <h2 style={{ fontWeight: "800", fontSize: '24px', color: "#232425" }}>{card.count}</h2>
              <p style={{ color: card.textColor, fontSize: '12px', fontWeight: '500' }}>{card.sub}</p>
            </div>
            {/* Right column (icon) */}
            <div>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// "use client";
// import React from "react";
// import { FaBoxOpen, FaExclamationTriangle, FaLayerGroup } from "react-icons/fa";
// import CommonCard from "./CommonCard";

// export default function OutOfStockTopCards({ cardBase, iconStyle, scrollRef }) {
//   return (
//     <div
//       ref={scrollRef}
//       style={{
//         display: "flex",
//         gap: "1rem",
//         overflowX: "auto",
//         padding: "1rem 0",
//       }}
//     >
//       <CommonCard bgColor="#FFE5E7" textColor="#C62828" style={cardBase} maxHeight="130px">
//         <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
//           {/* Left column */}
//           <div>
//             <h6 style={{ fontWeight: "bold" }}>Out of Stock</h6>
//             <h2 style={{ fontWeight: "bold" }}>3</h2>
//             <p>Zero inventory remaining</p>
//           </div>
//           {/* Right column (icon) */}
//           <div>
//             <FaBoxOpen style={{ fontSize: "32px", color: "#555" }} />
//           </div>
//         </div>
//       </CommonCard>
//       <CommonCard bgColor="#FFF0D5" textColor="#E78C27" style={cardBase} maxHeight="130px">
//          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
//           {/* Left column */}
//           <div>
//             <h6 style={{ fontWeight: "bold" }}>Critical Items</h6>
//             <h2 style={{ fontWeight: "bold" }}>5</h2>
//             <p>Require immediate attention</p>
//           </div>
//           {/* Right column (icon) */}
//           <div>
//             <FaExclamationTriangle style={{ fontSize: "32px", color: "#555" }} />
//           </div>
//           </div>
//       </CommonCard>
//       <CommonCard bgColor="#d6cef3ff" textColor="#6D4C41" style={cardBase} maxHeight="130px">
//          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
//           {/* Left column */}
//           <div>
//             <h6 style={{ fontWeight: "bold" }}>Total Items</h6>
//             <h2 style={{ fontWeight: "bold" }}>5</h2>
//             <p>Tracking inventory levels</p>
//           </div>
//           {/* Right column (icon) */}
//           <div>
//             <FaExclamationTriangle style={{ fontSize: "32px", color: "#555" }} />
//           </div>
//           </div>
//       </CommonCard>
//     </div>
//   );
// }
