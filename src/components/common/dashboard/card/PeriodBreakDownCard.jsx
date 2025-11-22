"use client";
import React from "react";
import { Card } from "react-bootstrap";
import '@/app/globals.css';

export default function PeriodBreakDownCard({ idx, card, scrollRef }) {
  return (
    <Card
      key={idx}
      ref={scrollRef}
      className="h-100 d-flex flex-column justify-content-center col-md-3"
      style={{
        backgroundColor: card.bg || "fff", // fallback if bg missing
        borderRadius: "12px",
        border: "0.2px solid gray",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
        minWidth: "240px", // keep horizontal scroll usability
      }}
    >
      <Card.Body className="d-flex align-items-center">
        {/* Icon container */}
        {card.icon && (
          <div
            className="p-2 d-flex align-items-center justify-content-center me-3"
            style={{
              backgroundColor: card.iconBg || "#ddd", // fallback if missing
              borderRadius: "12px",
              width: 40,
              height: 40,
            }}
          >
            {card.icon}
          </div>
        )}

        {/* Text content */}
        <div>
          <div
            className="c_gray_3 c_small_text_bold"
            style={{ fontSize: 13 }}
          >
            {card.title}
          </div>
          <div
            className="c_normal_text_extra_bold"
          >
            {card.value}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
// "use client";
// import React from "react";
// import CommonCard from "./CommonCard";

// export default function PeriodBreakDownCard({ idx, card, scrollRef }) {
//   return (
//     <CommonCard
//       key={idx}
//       scrollRef={scrollRef}
//       bgColor="rgb(249, 222, 239)"
//       minWidth="280px"
//       style={{ padding: "20px" }}
//     >
//       <div className="d-flex justify-content-between align-items-start">
//         <div>
//           <h5>{card.title}</h5>
//           <h4>{card.value}</h4>
//         </div>
//         {/* <div className="text-end">
//           <small className={`text-${card.color}`}>{card.change}</small>
//         </div> */}
//       </div>
//     </CommonCard>
//   );
// }
