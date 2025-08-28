"use client";

import { useEffect, useState } from "react";
import CommonCard from "../../dashboard/card/CommonCard";

export default function ConsumptionCards({ topCardsData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ gap: "16px" }}>
      {topCardsData.map((card, idx) => (
        <CommonCard
          key={idx}
          style={{
            minWidth: isMobile ? "90vw" : "23vw",
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
            <div style={{ fontSize: "24px", color: card.color }}>
              {card.icon}
            </div>
            <div className="ms-3">
              <div className="fw-semibold text-secondary">{card.title}</div>
              <div className="fs-5 fw-bold">{card.value}</div>
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
}

// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function ConsumptionCards({ topCardsData }) {
//   return (
//     <Row className="mb-4">
//       {topCardsData.map((card, idx) => (
//         <Col key={idx} md={3}>
//           <Card className="p-3">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <div className="text-muted">{card.title}</div>
//                 <div className="h5 fw-bold">{card.value}</div>
//               </div>
//               <div style={{ fontSize: "24px", color: card.color }}>
//                 {card.icon}
//               </div>
//             </div>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
