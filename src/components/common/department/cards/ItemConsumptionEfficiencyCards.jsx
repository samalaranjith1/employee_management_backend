"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function ItemConsumptionEfficiencyCards({ cards = [] }) {
  return (
    <Row className="mb-4 g-3">
      {cards.map((card, idx) => (
        <Col key={idx} md={3}>
          <Card
            className="h-100 shadow-sm"
            style={{
              borderRadius: "18px",
              backgroundColor: card.bgLight,
              border: "none",
            }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center p-3">
              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "#666",
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.45rem",
                    color: "#121212",
                  }}
                >
                  {card.value}
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-center rounded"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: card.bgSolid,
                  color: "#fff",
                  fontSize: "1.35rem",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {card.icon}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function ItemConsumptionEfficiencyCards({ cards = [] }) {
//   return (
//     <Row className="mb-4 g-3">
//       {cards.map((card, idx) => (
//         <Col key={idx} md={3}>
//           <Card
//             className="shadow-sm h-100"
//             style={{
//               borderRadius: "16px",
//               backgroundColor: card.bgLight, // 🔹 soft background
//               border: "none",
//             }}
//           >
//             <Card.Body className="d-flex justify-content-between align-items-center">
//               <div>
//                 <div
//                   style={{
//                     fontSize: "0.85rem",
//                     color: "#555",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   {card.label}
//                 </div>
//                 <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>
//                   {card.value}
//                 </div>
//               </div>

//               {/* Icon */}
//               <div
//                 className="d-flex align-items-center justify-content-center rounded"
//                 style={{
//                   width: 48,
//                   height: 48,
//                   backgroundColor: card.bgSolid, // 🔹 solid colored square
//                   color: "#fff",
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 {card.icon}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
