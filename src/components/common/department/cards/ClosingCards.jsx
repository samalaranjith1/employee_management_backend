"use client";

import React from "react";
import CommonCard from "../../dashboard/card/CommonCard";

export default function ClosingCards({ title, value, icon, color }) {
  return (
    <CommonCard
      style={{
        minWidth: "46vw",
        flexShrink: 0,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid #e0e0e0",
        backgroundColor: "#fff",
        color: "#000",
        padding: "1rem",
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div style={{ fontSize: "24px", color }}>{icon}</div>
        <div className="ms-3">
          <div className="fw-semibold text-secondary">{title}</div>
          <div className="fs-5 fw-bold">{value}</div>
        </div>
      </div>
    </CommonCard>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import CommonCard from "../../card/CommonCard";

// export default function ClosingCards({ topCardsData }) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       className="d-flex"
//       style={{
//         gap: "16px",
//         paddingBottom: "0.5rem",
//         overflowX: "auto",
//         msOverflowStyle: "none",
//         scrollbarWidth: "none",
//         WebkitOverflowScrolling: "touch",
//       }}
//     >
//       {topCardsData.map((card, idx) => (
//         <CommonCard
//           key={idx}
//           style={{
//             minWidth: isMobile ? "90vw" : "23vw",
//             flexShrink: 0,
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             border: "2px solid #e0e0e0",
//             backgroundColor: "#fff",
//             color: "#000",
//             padding: "1rem",
//           }}
//         >
//           <div className="d-flex align-items-center justify-content-between">
//             <div style={{ fontSize: "24px", color: card.color }}>
//               {card.icon}
//             </div>
//             <div className="ms-3">
//               <div className="fw-semibold text-secondary">{card.title}</div>
//               <div className="fs-5 fw-bold">{card.value}</div>
//             </div>
//           </div>
//         </CommonCard>
//       ))}
//     </div>
//   );
// }
// "use client";

// import React from "react";
// import { Card } from "react-bootstrap";

// const ClosingCards = ({ title, value, icon }) => {
//   return (
//     <Card className="shadow-sm">
//       <Card.Body className="d-flex align-items-center justify-content-between">
//         <div>
//           <div className="text-muted">{title}</div>
//           <div className="fw-bold fs-5">{value}</div>
//         </div>
//         <div className="fs-3">{icon}</div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ClosingCards;
