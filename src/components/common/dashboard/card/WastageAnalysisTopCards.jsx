"use client";

import { useDashboardContext } from "@/contexts/DashboardContext";
import React from "react";
import { Row, Col } from "react-bootstrap";

export default function WastageAnalysisTopCards({
  cardsData = [],
  scrollRef,
  statCard,
}) {
  const { isMobile } = useDashboardContext();

  return (
    <div
      ref={scrollRef}
      className={`hide-scrollbar`}
      style={{
        overflowX: isMobile ? "auto" : "visible",
        display: "flex",
        flexWrap: isMobile ? "nowrap" : "wrap",
        gap: 15,
        padding: "10px 0",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        ...statCard,
      }}
    >
      {cardsData.map((card, idx) => (
        <div
          key={idx}
          className={isMobile ? "flex-shrink-0" : "col-md-3"}
          style={{
            flex: isMobile ? "0 0 85%" : "0 0 23%", // Mobile: swipeable, desktop: 4 per row
            background: card.bgLight,
            borderRadius: 16,
            padding: "16px 20px",
            height: 110,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            minWidth: isMobile ? "280px" : "auto",
          }}
        >
          {/* Left: Text Section */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#6d6d6d",
                marginBottom: 4,
              }}
            >
              {card.title}
            </div>
            <div style={{ fontWeight: 800, fontSize: 24, color: "#232425" }}>
              ₹{card.value.toLocaleString()}
            </div>
            {card.sub && (
              <div
                style={{
                  fontSize: 12,
                  color: "#232425",
                  fontWeight:'400',
                  marginTop: 2,
                }}
              >
                {card.sub}
              </div>
            )}
          </div>

          {/* Right: Icon Box */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: card.bgSolid,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
// "use client";

// import { useDashboardContext } from "@/contexts/DashboardContext";
// import React from "react";

// export default function WastageAnalysisTopCards({
//   cardsData = [],
//   scrollRef,
//   statCard,
// }) {
//   const {isMobile}=useDashboardContext()
//   return (
//     <div
//       ref={scrollRef}
//       style={{
//         display: "flex",
//         gap: 15,
//         overflowX: "auto",
//         padding: "10px 0",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//         ...statCard,
//       }}
//       className="hide-scrollbar"
//     >
//       {cardsData.map((card, idx) => (
//         <div
//           key={idx}
//           style={{
//             flex: "0 0 auto",
//             background: card.bgLight,
//             borderRadius: 16,
//             padding: "16px 20px",
//             width: 300,
//             height: 110,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           }}
//         >
//           {/* Left: Text Section */}
//           <div style={{ flex: 1 }}>
//             <div
//               style={{
//                 fontSize: 14,
//                 fontWeight: 500,
//                 color: "#555",
//                 marginBottom: 4,
//               }}
//             >
//               {card.title}
//             </div>
//             <div style={{ fontWeight: 700, fontSize: 20, color: "#000" }}>
//               ₹{card.value.toLocaleString()}
//             </div>
//             {card.sub && (
//               <div
//                 style={{
//                   fontSize: 12,
//                   color: "#777",
//                   marginTop: 2,
//                 }}
//               >
//                 {card.sub}
//               </div>
//             )}
//           </div>

//           {/* Right: Icon Box */}
//           <div
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 12,
//               background: card.bgSolid,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "#fff",
//               fontSize: 20,
//               flexShrink: 0,
//             }}
//           >
//             {card.icon}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// "use client";
// import React from "react";

// export default function WastageAnalysisTopCards({ cardsData, scrollRef }) {
//   return (
//     <div
//       ref={scrollRef}
//       style={{
//         display: "flex",
//         gap: "15px",
//         overflowX: "auto",
//         padding: "10px 0",
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE/Edge
//       }}
//       className="hide-scrollbar"
//     >
//       {cardsData?.map((card, idx) => (
//         <div
//           key={idx}
//           style={{
//             flex: "0 0 auto",
//             background: card.bgLight,
//             borderRadius: "16px",
//             padding: "16px 20px",
//             width: "280px", // ✅ fixed width
//             height: "110px", // ✅ fixed height
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           }}
//         >
//           {/* Left: Text Section */}
//           <div style={{ flex: "1" }}>
//             <div
//               style={{
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: "#555",
//                 marginBottom: "4px",
//               }}
//             >
//               {card.title}
//             </div>
//             <div
//               style={{
//                 fontSize: "20px",
//                 fontWeight: "700",
//                 color: "#000",
//               }}
//             >
//               ₹{card.value.toLocaleString()}
//             </div>
//             {card.sub && (
//               <div
//                 style={{
//                   fontSize: "12px",
//                   color: "#777",
//                   marginTop: "2px",
//                 }}
//               >
//                 {card.sub}
//               </div>
//             )}
//           </div>

//           {/* Right: Icon Box */}
//           <div
//             style={{
//               width: "44px",
//               height: "44px",
//               borderRadius: "12px",
//               background: card.bgSolid,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "#fff",
//               fontSize: "20px",
//               flexShrink: 0,
//             }}
//           >
//             {card.icon}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// // "use client";
// // import React from "react";

// // export default function WastageAnalysisTopCards({
// //   statCard,
// //   scrollRef,
// //   cardsData,
// // }) {
// //   return (
// //     <div
// //       ref={scrollRef}
// //       style={{
// //         display: "flex",
// //         gap: "15px",
// //         overflowX: "auto",
// //         scrollbarWidth: "none",
// //         msOverflowStyle: "none",
// //         minWidth: "280px",
// //       }}
// //     >
// //       {cardsData?.map((card, idx) =>
// //         statCard(card.bg, card.icon, card.title, card.value, card.sub)
// //       )}
// //     </div>
// //   );
// // }

// // // "use client";
// // // import React from "react";
// // // import {
// // //   FaBox,
// // //   FaCalendarAlt,
// // //   FaExclamationTriangle,
// // //   FaShoppingBag,
// // // } from "react-icons/fa";
// // // import CommonCard from "./CommonCard";

// // // export default function WastageAnalysisTopCards({ statCard, myScrollRef }) {
// // //   return (
// // //     <div
// // //       ref={myScrollRef}
// // //       style={{
// // //         display: "flex",
// // //         gap: "15px",
// // //         overflowX: "auto",
// // //         scrollbarWidth: "none",
// // //         msOverflowStyle: "none",
// // //         minWidth: "280px",
// // //       }}
// // //     >
// // //       {statCard(
// // //         "linear-gradient(135deg,#9de8d4,#7cd1b8)",
// // //         <FaExclamationTriangle />,
// // //         "Total Wastage",
// // //         "₹13,487"
// // //       )}
// // //       {statCard(
// // //         "linear-gradient(135deg,#99dff5,#64c7e4)",
// // //         <FaBox />,
// // //         "Raw Material",
// // //         "₹9,095",
// // //         "8 items"
// // //       )}
// // //       {statCard(
// // //         "linear-gradient(135deg,#a9b8ff,#7b8efc)",
// // //         <FaCalendarAlt />,
// // //         "Expired Items",
// // //         "₹3,017",
// // //         "6 items"
// // //       )}
// // //       {statCard(
// // //         "linear-gradient(135deg,#b79cff,#9a7cf5)",
// // //         <FaShoppingBag />,
// // //         "Expired Products",
// // //         "₹1,375",
// // //         "5 products"
// // //       )}
// // //     </div>
// // //   );
// // // }
