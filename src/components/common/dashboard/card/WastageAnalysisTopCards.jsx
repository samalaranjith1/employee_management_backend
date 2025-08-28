"use client";
import React from "react";

export default function WastageAnalysisTopCards({
  statCard,
  scrollRef,
  cardsData,
}) {
  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "15px",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        minWidth: "280px",
      }}
    >
      {cardsData?.map((card, idx) =>
        statCard(card.bg, card.icon, card.title, card.value, card.sub)
      )}
    </div>
  );
}

// "use client";
// import React from "react";
// import {
//   FaBox,
//   FaCalendarAlt,
//   FaExclamationTriangle,
//   FaShoppingBag,
// } from "react-icons/fa";
// import CommonCard from "./CommonCard";

// export default function WastageAnalysisTopCards({ statCard, myScrollRef }) {
//   return (
//     <div
//       ref={myScrollRef}
//       style={{
//         display: "flex",
//         gap: "15px",
//         overflowX: "auto",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//         minWidth: "280px",
//       }}
//     >
//       {statCard(
//         "linear-gradient(135deg,#9de8d4,#7cd1b8)",
//         <FaExclamationTriangle />,
//         "Total Wastage",
//         "₹13,487"
//       )}
//       {statCard(
//         "linear-gradient(135deg,#99dff5,#64c7e4)",
//         <FaBox />,
//         "Raw Material",
//         "₹9,095",
//         "8 items"
//       )}
//       {statCard(
//         "linear-gradient(135deg,#a9b8ff,#7b8efc)",
//         <FaCalendarAlt />,
//         "Expired Items",
//         "₹3,017",
//         "6 items"
//       )}
//       {statCard(
//         "linear-gradient(135deg,#b79cff,#9a7cf5)",
//         <FaShoppingBag />,
//         "Expired Products",
//         "₹1,375",
//         "5 products"
//       )}
//     </div>
//   );
// }
